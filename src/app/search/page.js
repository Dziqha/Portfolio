"use client";
import React, { useState, useRef } from 'react';

const GithubSearch = () => {
  const [username, setUsername] = useState('');
  const [userExists, setUserExists] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchCompleted, setSearchCompleted] = useState(false);

  const inputRef = useRef(null);

  const githubApiKey = process.env.NEXT_PUBLIC_GH_TOKEN;

  const handleSearch = async () => {
    setLoading(true);
    setSearchCompleted(false);
    const searchQuery = username.trim();
    if (!searchQuery) {
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(`https://api.github.com/users/${searchQuery}`, {
        headers: {
          'Authorization': `token ${githubApiKey}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setUserExists(true);
      } else {
        setUserExists(false);
        setUserData(null);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setUserExists(false);
      setUserData(null);
    } finally {
      setLoading(false);
      setSearchCompleted(true);
      setUsername('');
    }
  };

  const handleInput = (e) => {
    setUsername(e.target.value);
    if (!e.target.value.trim()) {
      setUserExists(false);
      setUserData(null);
      setSearchCompleted(false);
    }
  };

  const navigateToGitHub = () => {
    if (userExists && userData) {
      window.open(`https://github.com/${userData.login}`, '_blank');
    }
  };

  return (
    <div className="sm:w-96 overflow-hidden">
      <div className="relative p-6 flex-auto">
        <label className="block text-white text-sm font-bold mb-1" htmlFor="username">
          GitHub username
        </label>
        <div className="flex justify-end items-center relative">
          <input
            placeholder="Search GitHub"
            type="text"
            className="border border-gray-400 rounded-lg p-4 w-full text-gruvbox-milk bg-gruvbox-dark"
            value={username}
            onChange={handleInput}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            ref={inputRef}
          />
          <span className="absolute mr-2 w-10 cursor-pointer" onClick={handleSearch}>
            {loading ? (
              <div className="spinner"></div>
            ) : (
              <svg className="icon" fill="#e7d7ad" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <path d="M21.71 20.29l-5.8-5.8a7.992 7.992 0 001.09-4.49C17 4.49 13.51 1 9 1S1 4.49 1 9s3.49 8 8 8c1.66 0 3.21-.53 4.49-1.41l5.8 5.8c.19.19.44.29.71.29s.51-.1.71-.29a1.003 1.003 0 000-1.42zM9 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
              </svg>
            )}
          </span>
        </div>
      </div>

      {!loading && (
        userExists && searchCompleted ? (
          <span 
            className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-transparent bg-clip-text px-6 cursor-pointer"
            onClick={navigateToGitHub}>
            <img src={userData.avatar_url} alt="User Avatar" className="w-8 h-8 mr-2 rounded-full inline-block" />
            Preview user: <span className="font-bold">{userData.login}</span>
          </span>
        ) : (
          <span className="px-6">
            {username && searchCompleted ? (
              <span className="text-red-500">User <strong>{username}</strong> not found.</span>
            ) : (
              <span className="inline-flex items-baseline text-zinc-500">
                <span className="pe-3">Click</span>
                <svg className="icon" fill="#e7d7ad" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                  <path d="M21.71 20.29l-5.8-5.8a7.992 7.992 0 001.09-4.49C17 4.49 13.51 1 9 1S1 4.49 1 9s3.49 8 8 8c1.66 0 3.21-.53 4.49-1.41l5.8 5.8c.19.19.44.29.71.29s.51-.1.71-.29a1.003 1.003 0 000-1.42zM9 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
                </svg>
                <span className="ps-4">or press <kbd>Enter</kbd> to search GitHub.</span>
              </span>
            )}
          </span>
        )
      )}
    </div>
  );
};

export default GithubSearch;
