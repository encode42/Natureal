import type { ExportFunction } from "~/type/Export";
import { join, dirname } from "node:path";
import { writeFile, readFile } from "node:fs/promises";
import { parse } from "toml";
import { ModrinthV2Client } from "@xmcl/modrinth";
// @ts-ignore
import { CurseforgeV1Client } from "@xmcl/curseforge";
import { chalk, fetch } from "zx";
import JSZip from "jszip";
import { directories, files } from "~/util/path";

const headers = {
    "User-Agent": process.env.USER_AGENT ?? "Encode42/Natureal (me@encode42.dev)"
};

export const exportZip: ExportFunction = async side => {
    const indexFile = await readFile(files.packwiz.index, {
        "encoding": "utf-8"
    });

    const index = parse(indexFile);

    const modrinth = new ModrinthV2Client({
        headers
    });
    const curseForge = new CurseforgeV1Client(process.env.CURSEFORGE_API_TOKEN, {
        headers
    });

    const zip = new JSZip();
    for (const indexFile of index.files) {
        const content = await readFile(join(directories.pack, indexFile.file), {
            "encoding": "utf-8"
        });

        if (!indexFile.file.endsWith(".pw.toml")) {
            zip.file(indexFile.file, content);
            continue;
        }

        const packwizFile = await parse(content);

        if ((packwizFile.side === "server" && side === "client") ||
            (packwizFile.side === "client" && side === "server")) {
            continue;
        }

        let downloadURL: string;
        if (packwizFile.update.modrinth) {
            const project = await modrinth.getProjectVersion(packwizFile.update.modrinth.version);

            // Find file that matches provide sha1, otherwise select the primary or first file
            let matchedFileURL: string | undefined;
            let primaryFileURL: string = project.files[0].url;
            for (const file of project.files) {
                if (matchedFileURL && primaryFileURL) {
                    break;
                }

                if (file.hashes.sha1 === packwizFile.sha1) {
                    matchedFileURL = file.url;
                }

                // @ts-ignore
                if (file.primary) {
                    primaryFileURL = file.url;
                }
            }

            downloadURL = matchedFileURL ?? primaryFileURL;
        } else if (packwizFile.update.curseforge) {
            const project = await curseForge.getModFile(packwizFile.update.curseforge["project-id"], packwizFile.update.curseforge["file-id"]);

            downloadURL = project.downloadUrl;
        } else {
            console.error(chalk.red(`Processing of ${packwizFile.name} failed!`));
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
        zip.file(join(dirname(indexFile.file), packwizFile.filename), data);
    }

    await writeFile(files.build.zip, await zip.generateAsync({ "type": "nodebuffer" }));
};
