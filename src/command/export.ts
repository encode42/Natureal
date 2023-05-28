import type { Command } from "~/type/Command";
import type { ExportFunction, ExportSide } from "~/type/Export";
import { exportModrinth } from "~/export/modrinth";
import { exportCurseForge } from "~/export/curseforge";
import { exportZip } from "~/export/zip";
import { chalk } from "zx";

async function exportWrapper(name: string, func: ExportFunction, side: ExportSide) {
    console.log(chalk.bold(`Exporting ${name} pack...`));
    await func(side);
    console.log(chalk.black.bgGreen("Done!"));
}

export const exportCommand: Command = {
    "name": "export",
    "description": "Export the mod pack for hosting platforms.",
    "arguments": "<platform>",
    "options": [{
        "name": "--side",
        "description": "Whether to export the mod pack for clients or servers.",
        "arguments": "<side>",
        "default": "client"
    }],
    "action": async (platform, options) => {
        switch (platform) {
            case "modrinth": {
                await exportWrapper("Modrinth", exportModrinth, options.side);
                break;
            }

            case "curseForge": {
                await exportWrapper("CurseForge", exportCurseForge, options.side);
                break;
            }

            case "zip": {
                await exportWrapper("zip", exportZip, options.side);
                break;
            }

            default: {
                console.error(chalk.red("Unknown platform!"));
                throw `Unknown input "${platform}" for argument "platform"`;
            }
        }
    }
};
