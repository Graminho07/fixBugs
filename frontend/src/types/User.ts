type User = {
  userId: number;
  username: string;
  email: string;
  role: "admin" | "developer" | "tester";
  teams: string[];
  assignedBugs: { bugId: number }[];
  createdAt: string;
  updatedAt: string;
}

export type { User };