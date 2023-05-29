import type { Command } from "~/type/Command";
import type { PackwizFileCredit } from "~/util/unsupportedPlatforms/getUnsupportedPlatforms";
import { getUnsupportedPlatforms } from "~/util/unsupportedPlatforms/getUnsupportedPlatforms";
import { chalk } from "zx";
import { listUnsupportedPlatforms } from "~/util/unsupportedPlatforms/listUnsupportedPlatforms";

type ListFormat = (platform: string, mods: PackwizFileCredit[]) => void;

const basicList: ListFormat = (platform, mods) => {
    console.log(chalk.bold(`Mods incompatible with: ${platform}`));
    console.log(mods.map(mod => `${mod.name} (${mod.license})`).join(", "));
};

const markdownList: ListFormat = (platform, mods) => {
    console.log(chalk.bold(`Mods incompatible with: ${platform}`));

    for (const mod of mods) {
        console.log(`- [${mod.name}](${mod.url})`);
    }
};

export const checkCommand: Command = {
    "name": "check",
    "description": "Lists the mods that aren't supported on exported platforms.",
    "action": async () => {
        const unsupportedPlatforms = await listUnsupportedPlatforms();

        console.log(chalk.bold("Mods incompatible with Modrinth:"));
        console.log(unsupportedPlatforms.modrinth);

        console.log(chalk.bold("Mods incompatible with CurseForge:"));
        console.log(unsupportedPlatforms.curseForge);
    }
};
