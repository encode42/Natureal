import type { ExportFunction } from "~/type/Export";
import { $, cd } from "zx";
import { directories, files } from "~/util/path";

export const exportCurseForge: ExportFunction = async side => {
    cd(directories.pack);
    await $`packwiz curseforge export --output ${files.build.curseForge} --side ${side}`;
};
