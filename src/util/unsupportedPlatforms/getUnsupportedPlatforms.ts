import type { PackwizFile } from "~/util/packwiz/getIndex";
import { getIndex } from "~/util/packwiz/getIndex";
import { getModrinthProject } from "~/util/modrinth/getModrinthProject";
import { getCurseForgeProject } from "~/util/curseForge/getCurseForgeProject";
import { modrinth } from "~/util/modrinth/modrinthClient";

// todo: extend this to general packwizfile
export interface PackwizFileCredit extends PackwizFile {
    "url": string,
    "author": string,
    "license": string
}

interface UnsupportedPlatforms {
    "modrinth": PackwizFileCredit[],
    "curseForge": PackwizFileCredit[]
}

export async function getUnsupportedPlatforms(): Promise<UnsupportedPlatforms> {
    const index = await getIndex();

    const unsupported: UnsupportedPlatforms = {
        "modrinth": [],
        "curseForge": []
    };

    for (const file of index.files) {
        if ("content" in file || !file.pack.update) {
            continue;
        }

        if (!("modrinth" in file.pack.update)) {
            let url = "unknown";
            let author = "unknown";
            let license = "unknown";
            if (file.pack.update.curseforge) {
                const project = await getCurseForgeProject(file.pack.update.curseforge["project-id"]);

                url = project.links.sourceUrl ?? project.links.websiteUrl;
                author = project.authors.map(author => author.name).join(", ");
            }

            unsupported.modrinth.push({
                ...file.pack,
                url,
                author,
                license
            });
        }

        if (!("curseforge" !in file.pack.update)) {
            let url = "unknown";
            let author = "unknown";
            let license = "unknown";
            if (file.pack.update.modrinth) {
                const project = await getModrinthProject(file.pack.update.modrinth["mod-id"]);
                const team = await modrinth.getProjectTeamMembers(file.pack.update.modrinth["mod-id"]);

                url = project.source_url ?? `https://modrinth.com/${project.project_type}/${project.slug}`;
                author = team.map(member => member.user.name).join(", ");
                license = project.license.id;
            }

            unsupported.curseForge.push({
                ...file.pack,
                url,
                author,
                license
            });
        }
    }

    return unsupported;
}
