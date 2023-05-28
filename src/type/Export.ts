export type ExportSide = "client" | "server";

export type ExportFunction = (side?: ExportSide) => Promise<void>;
