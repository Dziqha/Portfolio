import GitHubUser from "@/components/GitHubUser";
export default function Home() {
  return <GitHubUser username={process.env.NEXT_PUBLIC_GITHUB_USERNAME} />;
}
