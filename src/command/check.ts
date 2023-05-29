import type { Command } from "~/type/Command";
import { chalk } from "zx";
import { listUnsupportedPlatforms } from "~/util/unsupportedPlatforms/listUnsupportedPlatforms";

export const checkCommand: Command = {
    "name": "check",
    "description": "Lists the mods that aren't supported on exported platforms.",
    "action": async () => {
        const unsupportedPlatforms = await listUnsupportedPlatforms("markdown");

        console.log(chalk.bold("Projects incompatible with Modrinth:"));
        console.log(unsupportedPlatforms.modrinth);

        console.log(chalk.bold("Projects incompatible with CurseForge:"));
        console.log(unsupportedPlatforms.curseForge);
    }
};
