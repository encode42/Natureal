import type { ExportFunction } from "~/type/Export";
import { $ } from "zx";
import { files } from "~/util/path";
import { platformWrapper } from "~/export/platform/platformWrapper";

export const exportCurseForge: ExportFunction = async side => {
    await platformWrapper({
        "platform": "curseForge",
        side,
        "runner": async side => {
            await $`packwiz curseforge export --output ${files.build[side].curseForge} --side ${side}`;
        }
    });
};
