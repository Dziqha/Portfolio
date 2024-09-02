import GitHubUserProjects from "@/components/GitHubUserProjects";

export default function ProjectsPage() {
  return (
    <GitHubUserProjects username={process.env.NEXT_PUBLIC_GITHUB_USERNAME} />
  );
}
