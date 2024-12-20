import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [userName, setUserName] = useState("");
  const [filterOption, setFilterOption] = useState(""); // For sorting
  const [hoveredCard, setHoveredCard] = useState(null);
  const [suggestedGenres, setSuggestedGenres] = useState([]); // New state for genre suggestions
  const [genreDropdownVisible, setGenreDropdownVisible] = useState(false); // State to toggle dropdown visibility
  const [selectedGenre, setSelectedGenre] = useState(""); // State for selected genre

  const navigate = useNavigate();
  
  /* Fetch favorite genres dynamically*/
  const fetchFavoriteGenres = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You need to login first!");
        navigate("/login");
        return;
      }
      const response = await fetch(
        "http://localhost:8089/api/books/fav_genere",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch favorite genres");
      }

      const favoriteGenres = await response.json();
      return favoriteGenres.slice(0, 3); // Limit to 3 genres
    } catch (err) {
      setError(err.message);
      return [];
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        const userNameFromStorage = localStorage.getItem("userName");
        setUserName(userNameFromStorage);

        if (!token) {
          alert("You need to login first!");
          navigate("/login");
          return;
        }

        const favoriteGenres = await fetchFavoriteGenres();
        const booksByGenre = [];
        for (const genre of favoriteGenres.slice(0, 3)) {
          const response = await fetch(
            `http://localhost:8089/api/books/fetch?genre=${genre}&apiKey=AIzaSyBYpWTgMHSJNm0YGf8VuBwmn_ROV1jfpjM&orderBy=relevance`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            booksByGenre.push(...(data.items || []).slice(0, 5));
          }
        }

        setBooks(booksByGenre);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBooks();
  }, [navigate]);

  const fetchGoogleBooks = async (query) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20&key=AIzaSyBYpWTgMHSJNm0YGf8VuBwmn_ROV1jfpjM`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }

      const data = await response.json();
      setBooks(data.items || []);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8089/api/genres/search?query=${query}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const genres = await response.json();
        setSuggestedGenres(genres); // Update suggestions dynamically
      }
    } else {
      setSuggestedGenres([]); // Clear suggestions if input is empty
    }
  };

  const handleGenreClick = async (genre) => {
    setSearchQuery(genre); // Update the search bar with the selected genre
    setSuggestedGenres([]); // Clear suggestions after selection
    await fetchGoogleBooks(genre); // Fetch books based on the genre
  };

  const handleCardClick = (bookId) => {
    const token = localStorage.getItem("token");
    console.log(sessionStorage);
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i); // Get each key
      const value = sessionStorage.getItem(key); // Get the value for the key
      console.log(`${key}: ${value}`);
    }
    navigate(`/book/${bookId}`);
  };

  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  };

  const sortBooks = (books) => {
    switch (filterOption) {
      case "title":
        return [...books].sort((a, b) =>
          a.volumeInfo.title.localeCompare(b.volumeInfo.title)
        );
      case "year":
        return [...books].sort(
          (a, b) =>
            new Date(a.volumeInfo.publishedDate).getFullYear() -
            new Date(b.volumeInfo.publishedDate).getFullYear()
        );
      case "rating":
        return [...books].sort(
          (a, b) =>
            (b.volumeInfo.averageRating || 0) - (a.volumeInfo.averageRating || 0)
        );
      default:
        return books;
    }
  };

  const filteredBooks = sortBooks(
    books.filter((book) => {
      const { title = "", authors = [] } = book.volumeInfo || {};
      return (
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        authors.some((author) =>
          author.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    })
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchGoogleBooks(searchQuery);
  };

  const handleSelectGenreClick = () => {
    setGenreDropdownVisible(!genreDropdownVisible);
  };

  const handleDropdownChange = (genre) => {
    setSelectedGenre(genre);
    setSearchQuery(genre); // Update the search bar with the selected genre
    setGenreDropdownVisible(false); // Hide the dropdown after selection
    fetchGoogleBooks(genre); // Fetch books based on the selected genre
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <aside style={styles.sidebar}>
          <h2>Welcome, {userName}</h2>
          <button onClick={handleSelectGenreClick} style={styles.selectGenreButton}>
            Select Genre
          </button>
          {genreDropdownVisible && (
            <div style={styles.genreDropdown}>
              <button onClick={() => handleDropdownChange("Science Fiction")}>Science Fiction</button>
              <button onClick={() => handleDropdownChange("Fantasy")}>Fantasy</button>
              <button onClick={() => handleDropdownChange("Mystery")}>Mystery</button>
              <button onClick={() => handleDropdownChange("Romance")}>Romance</button>
              <button onClick={() => handleDropdownChange("Non-Fiction")}>Non-Fiction</button>
            </div>
          )}
        </aside>
        <main style={styles.main}>
          <header style={styles.header}>
            <h1>Recommended Books</h1>
            <form onSubmit={handleSearchSubmit} style={styles.searchForm}>
              <input
                type="text"
                placeholder="Search books by title, author, or genre..."
                value={searchQuery}
                onChange={handleSearch}
                style={styles.searchBar}
              />
              <button type="submit" style={styles.searchButton}>
                Search
              </button>
              <select
                onChange={handleFilterChange}
                value={filterOption}
                style={styles.filterDropdown}
              >
                <option value="">Sort By</option>
                <option value="title">Title (A-Z)</option>
                <option value="year">Year</option>
                <option value="rating">Rating</option>
              </select>
            </form>
            <div style={styles.suggestions}>
              {searchQuery && suggestedGenres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => handleGenreClick(genre)}
                  style={styles.genreButton}
                >
                  {genre}
                </button>
              ))}
            </div>
          </header>
          <div style={styles.grid}>
            {filteredBooks.map((book) => {
              const { id, volumeInfo } = book;
              const { title, authors, publishedDate, imageLinks } =
                volumeInfo || {};

              return (
                <div
                  key={id}
                  style={{
                    ...styles.card,
                    ...(hoveredCard === id ? styles.cardHover : {}),
                  }}
                  onMouseEnter={() => setHoveredCard(id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => handleCardClick(id)}
                >
                  <img
                    src={imageLinks?.thumbnail || "https://via.placeholder.com/150"}
                    alt={title || "No Cover Available"}
                    style={styles.coverImage}
                  />
                  <h3 style={styles.title}>{title || "Untitled"}</h3>
                  <p style={styles.author}>
                    {authors?.join(", ") || "Unknown Author"}
                  </p>
                  <p style={styles.published}>
                    Published: {publishedDate || "Unknown Date"}
                  </p>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

const styles = {
  container: { display: "flex", fontFamily: "Arial, sans-serif" ,marginTop:"60px"},
  sidebar: { width: "20%", padding: "20px", backgroundColor: "#f4f4f4" },
  main: { width: "80%", padding: "20px" ,marginTop:"0px"},
  header: {
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchForm: { display: "flex", gap: "10px" },
  searchBar: { padding: "10px", fontSize: "16px", borderRadius: "5px" },
  filterDropdown: { padding: "10px", fontSize: "16px", borderRadius: "5px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
  card: {
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    backgroundColor: "#fff",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease", // Hover animation
  },
  cardHover: {
    transform: "scale(1.05)", // Slightly enlarge on hover
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)", // Enhance shadow on hover
  },
  coverImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px", // Rounded edges for the image
    marginBottom: "10px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
    margin: "10px 0",
  },
  author: {
    fontSize: "16px",
    fontStyle: "italic",
    color: "#555",
    margin: "5px 0",
  },
  published: {
    fontSize: "14px",
    color: "#777",
    marginBottom: "10px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)", // 5 cards per row
    gap: "20px",
  },
};


