import type { SupportedSide } from "~/type/Supported";

export type ExportFunction = (side: SupportedSide) => Promise<void>;
