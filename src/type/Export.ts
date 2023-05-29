import type { files } from "~/util/path";

export type ExportSide = keyof typeof files["build"];

export type ExportFunction = (side: ExportSide) => Promise<void>;
