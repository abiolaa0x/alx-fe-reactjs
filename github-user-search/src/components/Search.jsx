/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { fetchUserData, searchUsers } from '../services/githubServices';

const Search = () => {
  // State for basic search
  const [username, setUsername] = useState('');
  
  // State for advanced search
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [advancedSearch, setAdvancedSearch] = useState(false);
  
  // State for results and UI
  const [userData, setUserData] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchType, setSearchType] = useState('basic'); // 'basic' or 'advanced'
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  /**
   * Handle basic search form submission
   */
  const handleBasicSubmit = async (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      return;
    }
    
    setLoading(true);
    setError(false);
    setUserData(null);
    setSearchType('basic');
    
    try {
      const data = await fetchUserData(username);
      setUserData(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle advanced search form submission
   */
  const handleAdvancedSubmit = async (e) => {
    e.preventDefault();
    
    // At least one field should be filled
    if (!username.trim() && !location.trim() && !minRepos) {
      return;
    }
    
    setLoading(true);
    setError(false);
    setSearchResults([]);
    setSearchType('advanced');
    setCurrentPage(1);
    
    try {
      const data = await searchUsers({
        username: username.trim(),
        location: location.trim(),
        minRepos: minRepos ? parseInt(minRepos) : 0,
        page: 1,
        perPage: 10
      });
      
      setSearchResults(data.items || []);
      setTotalCount(data.total_count || 0);
      setHasMore(data.items && data.items.length === 10 && data.total_count > 10);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Load more results for pagination
   */
  const handleLoadMore = async () => {
    setLoading(true);
    const nextPage = currentPage + 1;
    
    try {
      const data = await searchUsers({
        username: username.trim(),
        location: location.trim(),
        minRepos: minRepos ? parseInt(minRepos) : 0,
        page: nextPage,
        perPage: 10
      });
      
      setSearchResults(prev => [...prev, ...(data.items || [])]);
      setCurrentPage(nextPage);
      setHasMore(data.items && data.items.length === 10 && searchResults.length + data.items.length < data.total_count);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            GitHub User Search
          </h1>
          <p className="text-gray-300">
            Search for GitHub users and discover their profiles
          </p>
        </div>

        {/* Toggle between basic and advanced search */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-800 rounded-lg p-1 inline-flex">
            <button
              onClick={() => setAdvancedSearch(false)}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                !advancedSearch
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Basic Search
            </button>
            <button
              onClick={() => setAdvancedSearch(true)}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                advancedSearch
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Advanced Search
            </button>
          </div>
        </div>

        {/* Search Forms */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
          {!advancedSearch ? (
            // Basic Search Form
            <form onSubmit={handleBasicSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter GitHub username"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </form>
          ) : (
            // Advanced Search Form
            <form onSubmit={handleAdvancedSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="adv-username" className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    id="adv-username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g., octocat"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., San Francisco"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="minRepos" className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Repositories
                </label>
                <input
                  type="number"
                  id="minRepos"
                  value={minRepos}
                  onChange={(e) => setMinRepos(e.target.value)}
                  placeholder="e.g., 10"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {loading ? 'Searching...' : 'Search Users'}
              </button>
            </form>
          )}
        </div>

        {/* Loading State */}
        {loading && searchType === 'basic' && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <p className="text-white mt-4 text-lg">Loading...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-900 border border-red-700 text-white px-6 py-4 rounded-lg text-center">
            <p className="font-semibold">Looks like we cant find the user</p>
          </div>
        )}

        {/* Basic Search Results */}
        {!loading && !error && searchType === 'basic' && userData && (
          <div className="bg-white rounded-lg shadow-xl p-6 animate-fade-in">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <img
                src={userData.avatar_url}
                alt={userData.login}
                className="w-32 h-32 rounded-full border-4 border-blue-500"
              />
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {userData.name || userData.login}
                </h2>
                <p className="text-gray-600 mb-1">@{userData.login}</p>
                {userData.bio && (
                  <p className="text-gray-700 mb-4">{userData.bio}</p>
                )}
                <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{userData.public_repos}</p>
                    <p className="text-sm text-gray-600">Repositories</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{userData.followers}</p>
                    <p className="text-sm text-gray-600">Followers</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{userData.following}</p>
                    <p className="text-sm text-gray-600">Following</p>
                  </div>
                </div>
                {userData.location && (
                  <p className="text-gray-600 mb-2">📍 {userData.location}</p>
                )}
                <a
                  href={userData.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gray-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
                >
                  View GitHub Profile
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Advanced Search Results */}
        {!loading && !error && searchType === 'advanced' && searchResults.length > 0 && (
          <div>
            <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
              <p className="text-gray-700 font-semibold">
                Found {totalCount} users
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {searchResults.map((user) => (
                <div
                  key={user.id}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={user.avatar_url}
                      alt={user.login}
                      className="w-16 h-16 rounded-full border-2 border-blue-500"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">
                        {user.login}
                      </h3>
                      <p className="text-sm text-gray-600">ID: {user.id}</p>
                    </div>
                  </div>
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    View Profile
                  </a>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center mt-6">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* No Results for Advanced Search */}
        {!loading && !error && searchType === 'advanced' && searchResults.length === 0 && username && (
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <p className="text-gray-600 text-lg">No users found matching your criteria. Try different search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;