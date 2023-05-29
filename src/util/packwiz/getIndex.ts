import { readFile } from "node:fs/promises";
import { directories, files } from "~/util/path";
import { parse } from "toml";
import { join } from "node:path";

export interface PackwizFile {
    "name": string,
    "filename": string,
    "side": "client" | "server" | "both",
    "option"?: {
        "optional": boolean,
        "default"?: boolean,
        "description"?: string
    },
    "download": {
        "url": string,
        "hash": string,
        "hash-format": string
    },
    "update"?: {
        "modrinth"?: {
            "mod-id": string,
            "version": string
        },
        "curseforge"?: {
            "project-id": string,
            "file-id": string
        }
    }
}

interface BaseIndexFile {
    "file": string,
    "hash": string,
    "hash-format"?: string,
    "alias"?: string,
    "metafile"?: boolean,
    "preserve"?: boolean
}

type IndexFilePack = BaseIndexFile & {
    "pack": PackwizFile
}

type IndexFileContent = BaseIndexFile & {
    "content": Uint8Array
}

export type IndexFile = IndexFilePack | IndexFileContent;

export interface Index {
    "hash-format": string,
    "files": IndexFile[]
}

export async function getIndex(): Promise<Index> {
    const indexFile = await readFile(files.packwiz.index, {
        "encoding": "utf-8"
    });

    const index = parse(indexFile) as Index;

    for (let i = 0; i < index.files.length; i++) {
        const packwizFile= await readFile(join(directories.pack, index.files[i].file));

        if (index.files[i].file.endsWith(".pw.toml")) {
            (index.files[i] as IndexFilePack).pack = parse(packwizFile.toString()) as PackwizFile;
            continue;
        }

        (index.files[i] as IndexFileContent).content = packwizFile;
    }

    return index;
}
