import GitHubUser from "@/components/GitHubUser";

export default function UserPage({ params }) {
  const { slug } = params;
  return <GitHubUser username={slug} />;
}
