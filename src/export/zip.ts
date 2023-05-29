import type { ExportFunction } from "~/type/Export";
import { join, dirname } from "node:path";
import { writeFile } from "node:fs/promises";
import { chalk, fetch } from "zx";
import JSZip from "jszip";
import { files } from "~/util/path";
import { getIndex } from "~/util/getIndex";
import { getModrinthVersion } from "~/util/modrinth/getModrinthVersion";
import { getCurseForgeVersion } from "~/util/curseForge/getCurseForgeVersion";
import { headers } from "~/util/commonHeaders";

export const exportZip: ExportFunction = async side => {
    const index = await getIndex();

    const zip = new JSZip();
    for (const file of index.files) {
        if ("content" in file) {
            zip.file(file.file, file.content);
            continue;
        }

        if ((file.pack.side === "server" && side === "client") ||
            (file.pack.side === "client" && side === "server")) {
            continue;
        }

        let downloadURL: string;
        if (file.pack.update?.modrinth) {
            const version = await getModrinthVersion(file.pack.update.modrinth.version);

            // Find file that matches provide sha1, otherwise select the primary or first file
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

        const data = await request.arrayBuffer();
        zip.file(join(dirname(file.file), file.pack.filename), data);
    }

    await writeFile(files.build.zip, await zip.generateAsync({ "type": "nodebuffer" }));
};
