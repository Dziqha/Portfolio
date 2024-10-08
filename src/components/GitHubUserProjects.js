"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";

const GitHubUserProjects = ({ username }) => {
  const [repos, setRepos] = useState([]);
  const githubApiKey = process.env.NEXT_PUBLIC_GH_TOKEN;

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos`,
          {
            headers: {
              Authorization: `Bearer ${githubApiKey}`,
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch repositories");
        const data = await response.json();

        // Filter repositories to include only public ones
        const filteredRepos = data
          .filter((repo) => !repo.private)
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
          .slice(0, 6); // Limit to 4 most recent repositories

        setRepos(filteredRepos);
      } catch (error) {
        console.error("Error fetching repositories:", error);
        setRepos([]);
      }
    };

    fetchRepos();
  }, [githubApiKey]);

  let navItems;

  if (username == process.env.NEXT_PUBLIC_GITHUB_USERNAME) {
    navItems = [
      { href: "/", title: "Home" },
      { href: "/projects", title: "Projects" },
      { href: "/contact", title: "Contact" },
    ];
  } else {
    navItems = [
      { href: `/user/${username}`, title: "Home" },
      { href: `/user/${username}/projects`, title: "Projects" },
    ];
  }

  return (
    <>
      <div className="mb-10">
        <Navbar navItems={navItems} />
      </div>
      <div className="mb-10">
        <div className="font-black text-2xl mb-4">Projects</div>
        <div className="grid md:grid-cols-2 gap-4">
          {repos.length === 0 ? (
            <div>Projects could not be retrieved.</div>
          ) : (
            repos.map((repo) => (
              <div
                key={repo.id}
                className="flex flex-col justify-between px-5 py-3 bg-gray-800 bg-opacity-30 border-gray-600 border rounded-lg text-sm"
              >
                <div className="flex items-center gap-2 text-gray-400">
                  <Image
                    src={repo.owner.avatar_url}
                    alt={repo.owner.login}
                    width={32}
                    height={32}
                    className="rounded-full"
                    unoptimized
                  />
                  <span>{repo.owner.login}</span>
                </div>
                <div className="font-bold text-lg">
                  <Link
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-blue-500 hover:underline ${
                      repo.archived ? "line-through" : ""
                    }`}
                  >
                    {repo.name}
                  </Link>
                </div>
                <div>{repo.description}</div>
                <div className="flex mt-2 gap-4 text-gray-400">
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faStar} className="mr-1" />
                    {repo.stargazers_count}
                  </div>
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faCodeBranch} className="mr-1" />
                    {repo.forks_count}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default GitHubUserProjects;
