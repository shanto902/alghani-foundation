export const formatStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    "on-going-projects": "Ongoing",
    "completed-projects": "Completed",
    "upcoming-projects": "Up Coming",
    "all-projects": "All Projects",
  };

  return statusMap[status] || "Unknown"; // Fallback for unexpected values
};
