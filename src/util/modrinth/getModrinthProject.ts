import { modrinth } from "~/util/modrinth/modrinthClient";

export async function getModrinthProject(projectId: string) {
    return await modrinth.getProject(projectId);
}
