import { ModrinthV2Client } from "@xmcl/modrinth";
import { headers } from "~/util/commonHeaders";

export const modrinth = new ModrinthV2Client({
    headers
});
