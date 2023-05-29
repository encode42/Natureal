import { mkdir, access } from "node:fs/promises";
import { join, resolve, format } from "node:path";
import { homedir } from "node:os";
import { getPackInfo } from "~/util/packwiz/getPackInfo";

interface Directories {
    "build": string,
    "pack": string,
    "cache": string
}

interface Files {
    "build": {
        "client": {
            "modrinth": string,
            "curseForge": string,
            "zip": string
        },
        "server": {
            "curseForge": string,
            "zip": string
        }
    }
    "packwiz": {
        "pack": string,
        "index": string
    }
}

export const directories: Directories = {
    "build": resolve("build"),
    "pack": resolve("src/pack"),
    "cache": join(homedir(), ".cache", "natureal")
};

export const files: Files = {
    "packwiz": {
        "pack": join(directories.pack, "pack.toml"),
        "index": join(directories.pack, "index.toml")
    },
    "build": {
        "client": {
            "modrinth": "mrpack",
            "curseForge": "cf.zip",
            "zip": "zip",
        },
        "server": {
            "curseForge": "SERVER.cf.zip",
            "zip": "SERVER.zip",
        }
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
    for (const key of Object.keys(files.build)) {
        // todo: types
        for (const [type, extension] of Object.entries(files.build[key])) {
            files.build[key][type] = format({
                "dir": directories.build,
                "name": `${packInfo.name}-${packInfo.version}`,
                "ext": extension
            });
        }
    }
}
