import type { ExportFunction } from "~/type/Export";
import { $, cd } from "zx";
import { directories, files } from "~/util/path";

export const exportModrinth: ExportFunction = async () => {
    cd(directories.pack);
    await $`packwiz modrinth export --output ${files.build.modrinth}`;
};
