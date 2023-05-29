import { readFile } from "node:fs/promises";
import { files } from "~/util/path";
import { parse } from "toml";

export async function getPackInfo() {
    const packFile = await readFile(files.packwiz.pack, {
        "encoding": "utf-8"
    });

    const pack = parse(packFile);

    return {
        "name": pack.name,
        "author": pack.author,
        "version": pack.version
    };
}
