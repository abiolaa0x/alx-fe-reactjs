# GitHub User Search Application

A React-based web application that allows users to search for GitHub profiles using the GitHub API. Built with React, Vite, and Tailwind CSS.

## Features

### Basic Search
- Search GitHub users by username
- Display user profile information including:
  - Avatar
  - Name and username
  - Bio
  - Number of repositories, followers, and following
  - Location
  - Direct link to GitHub profile

### Advanced Search
- Search users with multiple filters:
  - Username
  - Location
  - Minimum number of repositories
- Display multiple user results
- Pagination with "Load More" functionality
- Shows total count of matching users

## Technologies Used

- **React 18** - JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **Axios** - HTTP client for API requests
- **Tailwind CSS** - Utility-first CSS framework
- **GitHub REST API** - For fetching user data

## Project Structure

```
github-user-search/
├── src/
│   ├── components/
│   │   └── Search.jsx          # Main search component with both basic and advanced search
│   ├── services/
│   │   └── githubService.js    # API service for GitHub API calls
│   ├── App.jsx                 # Root application component
│   ├── main.jsx                # Application entry point
│   └── index.css               # Global styles with Tailwind
├── public/                     # Static assets
├── index.html                  # HTML template
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── .env                        # Environment variables (optional)
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd github-user-search
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Set up GitHub API token:
   - Create a `.env` file in the root directory
   - Add your GitHub personal access token:
   ```
   VITE_APP_GITHUB_API_KEY=your_github_token_here
   ```
   - Note: The app works without a token, but rate limits are lower

## Running the Application

Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:5173` (or another available port).

## Building for Production

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## How It Works

### Basic Search
1. Enter a GitHub username in the search field
2. Click "Search" or press Enter
3. View the user's profile information
4. Click "View GitHub Profile" to visit their GitHub page

### Advanced Search
1. Switch to "Advanced Search" tab
2. Fill in one or more search criteria:
   - Username (partial match)
   - Location (e.g., "San Francisco", "London")
   - Minimum number of repositories
3. Click "Search Users"
4. Browse the results and click "Load More" for additional users

## API Endpoints Used

- **Basic Search**: `GET https://api.github.com/users/{username}`
- **Advanced Search**: `GET https://api.github.com/search/users?q={query}`

## Features Implemented

✅ React project setup with Vite  
✅ Axios for HTTP requests  
✅ Component-based architecture  
✅ API service layer for GitHub API integration  
✅ Environment variable configuration  
✅ Basic search functionality  
✅ Advanced search with multiple filters  
✅ Loading states with spinner  
✅ Error handling with user-friendly messages  
✅ Responsive design with Tailwind CSS  
✅ Pagination with "Load More" button  
✅ Clean and modern UI  

## Rate Limits

- **Without authentication**: 60 requests per hour
- **With authentication**: 5,000 requests per hour

To increase rate limits, add a GitHub personal access token to your `.env` file.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for educational purposes as part of the ALX Frontend React course.