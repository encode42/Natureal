import { curseForge } from "~/util/curseForge/curseForgeClient";

export async function getCurseForgeProject(projectId: string) {
    return await curseForge.getMod(projectId);
}
