import type { ExportFunction } from "~/type/Export";
import { join, dirname } from "node:path";
import { access, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { chalk, fetch } from "zx";
import JSZip from "jszip";
import { directories, files } from "~/util/path";
import { getIndex } from "~/util/packwiz/getIndex";
import { getModrinthVersion } from "~/util/modrinth/getModrinthVersion";
import { getCurseForgeVersion } from "~/util/curseForge/getCurseForgeVersion";
import { headers } from "~/util/common/headers";
import { zipOptions } from "~/util/common/zipOptions";

export const exportZip: ExportFunction = async side => {
    const index = await getIndex();

    const zip = new JSZip();
    for (const file of index.files) {
        if ("content" in file) {
            zip.file(file.file, file.content);
            continue;
        }

        if (file.pack.side !== "both" && file.pack.side !== side) {
            continue;
        }

        const downloadedPath = join(directories.cache, file.pack.download.hash);

        let downloadedFile: Uint8Array | undefined;
        try {
            await access(downloadedPath);
            downloadedFile = await readFile(downloadedPath);
        } catch {
            let downloadURL: string;
            if (file.pack.update?.modrinth) {
                const version = await getModrinthVersion(file.pack.update.modrinth.version);

                let matchedFileURL: string | undefined;
                let primaryFileURL: string = version.files[0].url;
                for (const modrinthFile of version.files) {
                    if (matchedFileURL && primaryFileURL) {
                        break;
                    }

                    let hash = modrinthFile.hashes.sha1;
                    if (file.pack.download["hash-format"] in modrinthFile.hashes) {
                        hash = modrinthFile.hashes[file.pack.download["hash-format"]];
                    }

                    if (hash === file.pack.download.hash) {
                        matchedFileURL = modrinthFile.url;
                    }

                    // @ts-ignore
                    if (modrinthFile.primary) {
                        primaryFileURL = modrinthFile.url;
                    }
                }

                downloadURL = matchedFileURL ?? primaryFileURL;
            } else if (file.pack.update?.curseforge) {
                const project = await getCurseForgeVersion(file.pack.update.curseforge["project-id"], file.pack.update.curseforge["file-id"]);

                downloadURL = project.downloadUrl;
            } else {
                console.error(chalk.red(`Processing of ${file.pack.name} failed!`));
                throw "No update information from either Modrinth or CurseForge was found.";
            }

            const request = await fetch(downloadURL, {
                headers
            });

            if (!request.ok) {
                console.error(chalk.red(`Download of URL ${downloadURL} failed with status code ${request.status}!`));
                throw request.statusText;
            }

            downloadedFile = new Uint8Array(await request.arrayBuffer());
            await writeFile(downloadedPath, downloadedFile);
        }

        const downloadedFileHash = createHash("sha1")
            .update(downloadedFile)
            .digest("hex");

        if (downloadedFileHash !== file.pack.download.hash) {
            console.warn(chalk.yellow(`Hash for downloaded file ${file.pack.filename} does not match!`));
            console.warn(`${chalk.bold(file.pack.download.hash)} (expected) vs ${chalk.bold(downloadedFileHash)} (result)`);
        }

        zip.file(join(dirname(file.file), file.pack.filename), downloadedFile);
    }

    await writeFile(files.build[side].zip, await zip.generateAsync({
        "type": "nodebuffer",
        ...zipOptions
    }));
};
