import * as dotenv from "dotenv";
dotenv.config();

export const headers = {
    "User-Agent": process.env.USER_AGENT ?? "Encode42/Natureal (me@encode42.dev)"
};
