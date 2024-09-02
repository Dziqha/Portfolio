import GitHubUserProjects from "@/components/GitHubUserProjects";

export default function UserProjectsPage({ params }) {
  const { slug } = params;
  return <GitHubUserProjects username={slug} />;
}
