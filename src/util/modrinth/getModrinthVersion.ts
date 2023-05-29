import { modrinth } from "~/util/modrinth/modrinthClient";

export async function getModrinthVersion(versionId: string) {
    return await modrinth.getProjectVersion(versionId);
}
