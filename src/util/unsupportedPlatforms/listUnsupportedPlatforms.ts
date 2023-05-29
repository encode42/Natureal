import type { PackwizFileCredit } from "~/util/unsupportedPlatforms/getUnsupportedPlatforms";
import type { SupportedPlatform } from "~/type/SupportedPlatform";
import { getUnsupportedPlatforms } from "~/util/unsupportedPlatforms/getUnsupportedPlatforms";

export type listUnsupportedPlatforms  = {
    [key in SupportedPlatform]: string
}

type ListFormat = (mods: PackwizFileCredit[]) => string;

const basicList: ListFormat = mods => {
    return mods.map(mod => `${mod.name} (${mod.license})`).join(", ");
};

const markdownList: ListFormat = mods => {
    return mods.map(mod => `- [${mod.name}](${mod.url})`).join("\n");
};

export async function listUnsupportedPlatforms(format?: "list" | "markdown"): Promise<listUnsupportedPlatforms> {
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
