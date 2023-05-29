import { curseForge } from "~/util/curseForge/curseForgeClient";

export async function getCurseForgeVersion(projectId: string, fileId: string) {
    return await curseForge.getModFile(projectId, fileId);
}
