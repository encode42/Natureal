import type { files } from "~/util/path";

export type SupportedPlatform = keyof typeof files.build["client" & "server"]
