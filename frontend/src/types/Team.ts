type Team = {
    teamId: number;
    name: string;
    members: { _id: string; email: string; name: string }[];
    description?: string;
    assignedBugs: { bugId: number }[];
}

export type { Team };