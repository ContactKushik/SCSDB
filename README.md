
# SCSDB (Simple Cinema Search and Display)

SCSDB is a React-based application built to demonstrate practical expertise in React and related technologies. It fetches movie and TV show data from The Movie Database (TMDB) API and provides a user-friendly interface for browsing trending content, searching for movies, and viewing detailed media information.

---

## Features

- Displays trending movies and TV shows.
- Search functionality for movies and TV shows.
- Interactive media details page with IMDb ratings (if available).
- Fully responsive UI optimized for mobile and desktop.

---

## Prerequisites

Before setting up the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [React](https://reactjs.org/)

---

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/jattu8602/SCSDB.git
   cd SCSDB
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure the TMDB API**:
   - Create a `.env` file in the root of the project.
   - Add your TMDB API key to the `.env` file:
     ```
     REACT_APP_TMDB_API_KEY=your_tmdb_api_key
     ```
   - **Important**: If you're in India, TMDB API might be blocked. To access it:
     - Use a VPN or 
     - Set your DNS to Google Public DNS (8.8.8.8 and 8.8.4.4).

4. **Run the application**:
   ```bash
   npm start
   ```

5. **View the application**:
   Open your browser and navigate to `http://localhost:3000`.

---

## Deployment

The live version of this application is available at:  
[Deployed SCSDB](https://your-deployed-url.com)

**Note**: Ensure to configure environment variables on your deployment platform for the TMDB API.

---

## Project Structure

```
SCSDB/
├── public/
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page components
│   ├── redux/         # State management with Redux
│   ├── styles/        # CSS and Tailwind configurations
│   ├── App.js         # Main React component
│   └── index.js       # Entry point
├── .env               # Environment variables
├── package.json       # Project dependencies and scripts
└── README.md          # Project documentation
```

---

## Technologies Used

- **React.js**: Frontend framework
- **Redux**: State management
- **Tailwind CSS**: Styling
- **TMDB API**: Data provider for movies and TV shows

---

## Notes

- IMDb ratings may take a moment to load when viewing detailed media information.
- This project is designed as a portfolio project to showcase proficiency in React development.

---

## Author

Developed by [Your Name](https://your-portfolio-url.com).  
Feel free to reach out for suggestions, contributions, or collaborations.
