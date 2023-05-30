import type { SupportedPlatform, SupportedSide } from "~/type/Supported";
import type { PackwizFileCredit } from "~/util/unsupportedPlatforms/getUnsupportedPlatforms";
import { getUnsupportedPlatforms } from "~/util/unsupportedPlatforms/getUnsupportedPlatforms";

export type listUnsupportedPlatforms  = {
    [key in SupportedPlatform]: string
}

type ListFormat = (mods: PackwizFileCredit[], side: SupportedSide) => string;

export interface listUnsupportedPlatformsOptions {
    "format": "list" | "markdown",
    "side"?: SupportedSide
}

function listWrapper(mods: PackwizFileCredit[], side: SupportedSide, formatter: (mod: PackwizFileCredit) => string) {
    const formattedMods: string[] = [];

    for (const mod of mods) {
        if (mod.side !== "both" && mod.side !== side) {
            continue;
        }

        formattedMods.push(formatter(mod));
    }

    return formattedMods;
}

const basicList: ListFormat = (mods, side) => {
    const formattedMods = listWrapper(mods, side, mod => `${mod.name} (${mod.license})`);
    return formattedMods.join(", ");
};

const markdownList: ListFormat = (mods, side) => {
    const formattedMods = listWrapper(mods, side, mod => `- [${mod.name}](${mod.url})`);
    return formattedMods.join("\n");
};

export async function listUnsupportedPlatforms({ format = "list", side = "both" }: listUnsupportedPlatformsOptions): Promise<listUnsupportedPlatforms> {
    const unsupportedPlatforms = await getUnsupportedPlatforms();

    let listFormat = basicList;
    if (format === "markdown") {
        listFormat = markdownList;
    }

    return {
        "modrinth": listFormat(unsupportedPlatforms.modrinth, side),
        "curseForge": listFormat(unsupportedPlatforms.curseForge, side)
    };
}
