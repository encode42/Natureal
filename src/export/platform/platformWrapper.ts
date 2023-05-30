import type { ExportFunction } from "~/type/Export";
import type { SupportedPlatform, SupportedSide } from "~/type/Supported";
import { listUnsupportedPlatforms } from "~/util/unsupportedPlatforms/listUnsupportedPlatforms";
import { cd } from "zx";
import { directories, files } from "~/util/path";
import { readFile, writeFile } from "node:fs/promises";
import { loadAsync } from "jszip";
import { zipOptions } from "~/util/common/zipOptions";


export interface PlatformWrapperOptions {
    "platform"?: SupportedPlatform
    "side": SupportedSide,
    "runner": ExportFunction
}

export async function platformWrapper({ runner, platform, side }: PlatformWrapperOptions) {
    if (side === "both") {
        side = "client";
    }

    cd(directories.pack);
    await runner(side);

    if (!platform) {
        return;
    }

    const unsupportedPlatforms = await listUnsupportedPlatforms({
        "format": "markdown",
        side
    });

    const packFile = readFile(files.build[side][platform]);
    const pack = await loadAsync(packFile);

    pack.file("external.md", unsupportedPlatforms[platform].toString());

    // todo: types
    await writeFile(files.build[side][platform], await pack.generateAsync({
        "type": "nodebuffer",
        ...zipOptions
    }));
}
