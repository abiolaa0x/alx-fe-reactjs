/* eslint-disable no-useless-catch */
import axios from "axios";

const GITHUB_API_BASE_URL = "https://api.github.com";

// Get API key from environment variables (optional)
const API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY;

// Configure axios headers
const getHeaders = () => {
  const headers = {
    Accept: "application/vnd.github.v3+json",
  };

  // Add authorization header if API key is available
  if (API_KEY) {
    headers["Authorization"] = `token ${API_KEY}`;
  }

  return headers;
};

/**
 * Fetch user data by username
 * @param {string} username - GitHub username
 * @returns {Promise} - User data from GitHub API
 */
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(
      `${GITHUB_API_BASE_URL}/users/${username}`,
      { headers: getHeaders() },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Advanced search for GitHub users with filters
 * @param {Object} params - Search parameters
 * @param {string} params.username - Username to search (optional)
 * @param {string} params.location - User location (optional)
 * @param {number} params.minRepos - Minimum number of repositories (optional)
 * @param {number} params.page - Page number for pagination (default: 1)
 * @param {number} params.perPage - Results per page (default: 10)
 * @returns {Promise} - Search results from GitHub API
 */
export const searchUsers = async ({
  username = "",
  location = "",
  minRepos = 0,
  page = 1,
  perPage = 10,
}) => {
  try {
    // Build query string
    let queryParts = [];

    if (username) {
      queryParts.push(username);
    }

    if (location) {
      queryParts.push(`location:${location}`);
    }

    if (minRepos > 0) {
      queryParts.push(`repos:>=${minRepos}`);
    }

    // If no query parts, search for all users (not recommended, but handle it)
    const query = queryParts.length > 0 ? queryParts.join("+") : "type:user";

    const response = await axios.get(`${GITHUB_API_BASE_URL}/search/users`, {
      params: {
        q: query,
        page: page,
        per_page: perPage,
      },
      headers: getHeaders(),
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
