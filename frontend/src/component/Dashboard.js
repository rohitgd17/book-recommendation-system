import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // For search functionality
  const [userName, setUserName] = useState(""); // For welcome message
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token
        const userNameFromStorage = sessionStorage.getItem("userName"); // Retrieve the user's name
        setUserName(userNameFromStorage || "User"); // Fallback if no name is found

        if (!token) {
          alert("You need to login first!");
          navigate("/login");
          return;
        }

        // Hardcoded favorite genres
        const favoriteGenres = ["fiction", "science", "history"]; 

        // Fetch books for each genre
        const booksByGenre = [];
        for (const genre of favoriteGenres.slice(0, 3)) { // Show only 3 genres max
          const response = await fetch(
            `http://localhost:8089/api/books/fetch?genre=${genre}&apiKey=AIzaSyBYpWTgMHSJNm0YGf8VuBwmn_ROV1jfpjM`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            booksByGenre.push(...(data.items || []).slice(0, 5)); // Limit to 5 books per genre
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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const fetchGoogleBooks = async (query) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=10&key=AIzaSyBYpWTgMHSJNm0YGf8VuBwmn_ROV1jfpjM`
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

  const filteredBooks = books.filter((book) => {
    const { title = "", authors = [] } = book.volumeInfo || {};
    return (
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      authors.some((author) =>
        author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchGoogleBooks(searchQuery);
  };

  if (loading) return <div style={styles.message}>Loading...</div>;
  if (error) return <div style={styles.message}>Error: {error}</div>;
  if (books.length === 0)
    return <div style={styles.message}>No books found for your favorite genres.</div>;

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <h2>Welcome, {userName}</h2>
      </aside>
      <main style={styles.main}>
        <header style={styles.header}>
          <h1>Recommended Books</h1>
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search books by title or author..."
              value={searchQuery}
              onChange={handleSearch}
              style={styles.searchBar}
            />
            <button type="submit" style={styles.searchButton}>Search</button>
          </form>
        </header>
        <div style={styles.grid}>
          {filteredBooks.map((book, index) => {
            const { title, description, authors, publisher } = book.volumeInfo || {};
            return (
              <div key={index} style={styles.card}>
                <h2 style={styles.title}>{title || "Untitled"}</h2>
                <p>{description || "No description available."}</p>
                {authors && (
                  <p>
                    <strong>Authors:</strong> {authors.join(", ")}
                  </p>
                )}
                {publisher && (
                  <p>
                    <strong>Publisher:</strong> {publisher}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    fontFamily: "Arial, sans-serif",
    lineHeight: "1.6",
  },
  sidebar: {
    width: "20%",
    padding: "20px",
    backgroundColor: "#f4f4f4",
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
  },
  main: {
    width: "80%",
    padding: "20px",
  },
  header: {
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchBar: {
    padding: "10px",
    fontSize: "16px",
    width: "300px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  searchButton: {
    padding: "10px 20px",
    fontSize: "16px",
    marginLeft: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  card: {
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
  },
  title: {
    margin: "0 0 10px",
    fontSize: "18px",
    fontWeight: "bold",
  },
  message: {
    textAlign: "center",
    fontSize: "18px",
    marginTop: "50px",
    color: "#333",
  },
};

export default Dashboard;
