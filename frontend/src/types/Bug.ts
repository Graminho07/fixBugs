type Bug = {
    bugId: number;
    title: string;
    description: string;
    status: "open" | "in-progress" | "resolved" | "closed";
    priority: "low" | "medium" | "high";
    assignedToUser?: { _id: string; email: string } | null;
    assignedToTeam: { _id: string; name: string } | null;
    createdAt: string;
    updatedAt: string;
}

export type { Bug };