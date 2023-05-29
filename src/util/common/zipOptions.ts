import type { JSZipGeneratorOptions } from "jszip";

export const zipOptions: JSZipGeneratorOptions<"nodebuffer"> = {
    "platform": process.platform === "win32" ? "DOS" : "UNIX",
    "compression": "DEFLATE",
    "compressionOptions": {
        "level": 9
    }
};
