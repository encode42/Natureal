// @ts-ignore
import { CurseforgeV1Client } from "@xmcl/curseforge";
import { headers } from "~/util/commonHeaders";

import * as dotenv from "dotenv";
dotenv.config();

export const curseForge = new CurseforgeV1Client(process.env.CURSEFORGE_API_TOKEN, {
    headers
});
