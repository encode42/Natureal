import type { ExportFunction } from "~/type/Export";
import { $ } from "zx";
import { files } from "~/util/path";
import { platformWrapper } from "~/export/platform/platformWrapper";

export const exportModrinth: ExportFunction = async () => {
    await platformWrapper({
        "platform": "modrinth",
        "side": "client",
        "runner": async () => {
            await $`packwiz modrinth export --output ${files.build.client.modrinth}`;
        }
    });
};
