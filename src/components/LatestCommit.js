// components/LatestCommit.js
"use client";
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

const LatestCommit = () => {
  const [commit, setCommit] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestCommit = async () => {
      try {
        const reposResponse = await fetch('https://api.github.com/users/Dziqha/repos', {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GH_REPO}`, 
          },
        });

        if (!reposResponse.ok) {
          throw new Error(`Error fetching repos: ${reposResponse.status}`);
        }

        const reposData = await reposResponse.json();
        if (reposData.length === 0) {
          throw new Error('No repositories found');
        }

        const latestRepo = reposData.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))[0];

        const commitsResponse = await fetch(`https://api.github.com/repos/${latestRepo.owner.login}/${latestRepo.name}/commits`, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GH_REPO}`,
          },
        });

        if (!commitsResponse.ok) {
          throw new Error(`Error fetching commits: ${commitsResponse.status}`);
        }

        const commitsData = await commitsResponse.json();
        if (commitsData.length === 0) {
          throw new Error('No commits found');
        }

        setCommit(commitsData[0]);
      } catch (error) {
        console.error('Failed to fetch commit:', error);
        setError(error.message);
      }
    };

    fetchLatestCommit();
  }, []);

  return (
    <div className="flex justify-between mt-20 gap-5 text-sm text-gruvbox-gray">
      <div className="flex gap-2">
        <FontAwesomeIcon icon={faCodeBranch} className="mt-[3px]" />
        {commit ? (
          <div>
            {commit.sha.slice(0, 7)} — {commit.commit.message}
          </div>
        ) : (
          <div>
            {error ? `Failed to retrieve commit: ${error}` : 'Latest commit could not be retrieved.'}
          </div>
        )}
      </div>
      <a
        href="https://github.com/Dziqha"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 whitespace-nowrap underline hover:text-gruvbox-milk"
      >
        gimme a
        <Image src="/star.png" alt="star" width={16} height={16} unoptimized />
      </a>
    </div>
  );
};

export default LatestCommit;
