import { join, resolve, format } from "node:path";
import { mkdir, access } from "node:fs/promises";
import { getPackInfo } from "~/util/getPackInfo";

interface Directories {
    "build": string,
    "pack": string
}

interface Files {
    "build": {
        "modrinth": string,
        "curseForge": string,
        "zip": string
    },
    "packwiz": {
        "pack": string,
        "index": string
    }
}

export const directories: Directories = {
    "build": resolve("build"),
    "pack": resolve("src/pack")
};

export const files: Files = {
    "packwiz": {
        "pack": join(directories.pack, "pack.toml"),
        "index": join(directories.pack, "index.toml")
    },
    "build": {
        "modrinth": "mrpack",
        "curseForge": "cf.zip",
        "zip": "zip",
    }
};

export async function initPath() {
    for (const directory of Object.values(directories)) {
        try {
            await access(directory);
        } catch {
            await mkdir(directory);
        }
    }

    const packInfo = await getPackInfo();

    // The default values define the mod pack extensions, while this loop fills in the file name
    for (const [type, extension] of Object.entries(files.build)) {
        files.build[type as keyof typeof files["build"]] = format({
            "dir": directories.build,
            "name": `${packInfo.name}-${packInfo.version}`,
            "ext": extension
        });
    }
}
