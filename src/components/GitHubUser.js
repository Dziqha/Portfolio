// components/GitHubUser.js
"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faInstagram,
  faYoutube,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import Navbar from "./Navbar";
import { socialLinks } from "@/configs/socials";

const GitHubUser = ({ username }) => {
  const [status, setStatus] = useState("text-gruvbox-gray");
  const [githubData, setGitHubData] = useState({
    name: "",
    bio: "",
    twitter: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_GH_TOKEN}`,
            },
          }
        );
        if (!response.ok) throw new Error("GitHub API returned an error.");
        const data = await response.json();
        setGitHubData({
          name: data.name,
          bio: data.bio,
          twitter: data.twitter_username,
        });
      } catch (error) {
        console.error("Error fetching GitHub user data:", error);
        setGitHubData({ name: "GitHub data unavailable", bio: "" });
      }
    };

    fetchUserData();
  }, []);

  let navItems;
  let selectedSocialLinks;

  if (username == process.env.NEXT_PUBLIC_GITHUB_USERNAME) {
    selectedSocialLinks = socialLinks;
    navItems = [
      { href: "/", title: "Home" },
      { href: "/projects", title: "Projects" },
      { href: "/contact", title: "Contact" },
    ];
  } else {
    selectedSocialLinks = [
      {
        href: `https://github.com/${username}`,
        icon: (
          <FontAwesomeIcon icon={faGithub} className="w-6 h-6 text-gray-700" />
        ),
        label: "GitHub",
      },
      ...(githubData.twitter
        ? [
            {
              href: `https://twitter.com/${githubData.twitter}`,
              icon: (
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="w-6 h-6 text-gray-700"
                />
              ),
              label: "Twitter",
            },
          ]
        : []),
    ];

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
      <div className="mt-28">
        <div className="font-sans font-black text-5xl">
          Hi, I&apos;m{" "}
          <span className={`text-3xl ${status}`}>{githubData.name}</span>
        </div>
        <div className="mt-4">
          {githubData.name && githubData.bio ? (
            <div className="text-lg">
              {githubData.name} - {githubData.bio}
            </div>
          ) : (
            <div className="text-lg">Loading GitHub data...</div>
          )}
        </div>
        <div className="flex gap-6 mt-5 text-xl">
          {selectedSocialLinks.map((link, index) => (
            <Link key={index} href={link.href} passHref>
              <div
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center w-12 h-12 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                {link.icon}
                <span className="sr-only">{link.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default GitHubUser;
