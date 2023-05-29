import { ModrinthV2Client } from "@xmcl/modrinth";
import { headers } from "~/util/common/headers";

export const modrinth = new ModrinthV2Client({
    headers
});
