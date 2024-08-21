// components/GitHubUser.js
"use client";
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

const GitHubUser = () => {
  const [status, setStatus] = useState('text-gruvbox-gray');
  const [githubData, setGitHubData] = useState({ name: '', bio: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      const username = 'Dziqha';
      try {
        const response = await fetch(`https://api.github.com/users/${username}`, {
          headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_GH_TOKEN}` }
        });
        if (!response.ok) throw new Error('GitHub API returned an error.');
        const data = await response.json();
        setGitHubData({ name: data.name, bio: data.bio });
      } catch (error) {
        console.error('Error fetching GitHub user data:', error);
        setGitHubData({ name: 'GitHub data unavailable', bio: '' });
      }
    };

    fetchUserData();
  }, []);

  const socialLinks = [
    { href: "https://github.com/Dziqha", icon: faGithub, label: "GitHub" },
    { href: "https://linkedin.com/in/dziqha", icon: faLinkedin, label: "LinkedIn" },
    { href: "https://www.instagram.com/dziq_ha", icon: faInstagram, label: "Instagram" },
    { href: "https://www.youtube.com/channel/UC1iyfW0kdcSelRzL2FnuoiA", icon: faYoutube, label: "YouTube" },
  ];

  return (
    <div className="mt-28">
      <div className="font-sans font-black text-5xl">
        Hi, I&apos;m{" "} <span className={`text-3xl ${status}`}>{githubData.name}</span>
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
        {socialLinks.map((link, index) => (
          <Link key={index} href={link.href} passHref>
            <div
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center w-12 h-12 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <FontAwesomeIcon
                icon={link.icon}
                className={`w-6 h-6 text-gray-700 ${link.label.toLowerCase()}-icon`}
              />
              <span className="sr-only">{link.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GitHubUser;
