import type { ExportFunction } from "~/type/Export";
import { $, cd } from "zx";
import { directories, files } from "~/util/path";

import * as dotenv from "dotenv";
dotenv.config();

// todo: inject credits

export const exportCurseForge: ExportFunction = async side => {
    cd(directories.pack);
    await $`packwiz curseforge export --output ${files.build.curseForge} --side ${side}`;
};
