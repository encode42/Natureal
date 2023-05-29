import type { PackwizFileCredit } from "~/util/unsupportedPlatforms/getUnsupportedPlatforms";
import { getUnsupportedPlatforms } from "~/util/unsupportedPlatforms/getUnsupportedPlatforms";
import { chalk } from "zx";

export interface listUnsupportedPlatforms {
    "modrinth": string,
    "curseForge": string
}

type ListFormat = (mods: PackwizFileCredit[]) => string;

const basicList: ListFormat = mods => {
    return mods.map(mod => `${mod.name} (${mod.license})`).join(", ");
};

const markdownList: ListFormat = mods => {
    return mods.map(mod => `- [${mod.name}](${mod.url})`).join("\n");
};

export async function listUnsupportedPlatforms(format?: string): Promise<listUnsupportedPlatforms> {
    const unsupportedPlatforms = await getUnsupportedPlatforms();

    let listFormat = basicList;
    if (format === "markdown") {
        listFormat = markdownList;
    }

    return {
        "modrinth": listFormat(unsupportedPlatforms.modrinth),
        "curseForge": listFormat(unsupportedPlatforms.curseForge)
    };
}
