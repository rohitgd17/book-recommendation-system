import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${id}?apikey=AIzaSyBYpWTgMHSJNm0YGf8VuBwmn_ROV1jfpjM`
        );
        if (!response.ok) throw new Error("Failed to fetch book details");

        const data = await response.json();
        setBook(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!book) return <p>No book found.</p>;

  const { volumeInfo } = book;
  const {
    title,
    authors,
    description,
    imageLinks,
    publishedDate,
    publisher,
    pageCount,
    averageRating,
  } = volumeInfo;

  // Function to display stars for the average rating
  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          style={{
            color: i < rating ? "#FFD700" : "#ddd",
            fontSize: "18px",
          }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div style={styles.container}>
      <div style={styles.imageContainer}>
        <img
          src={imageLinks?.thumbnail || "placeholder.jpg"}
          alt={title}
          style={styles.bookImage}
        />
      </div>
      <div style={styles.details}>
        <h1 style={styles.title}>{title}</h1>
        <h3 style={styles.author}>{authors?.join(", ") || "Unknown Author"}</h3>
        <div style={styles.detailsRow}>
          <p>
            <strong>Publisher:</strong> {publisher || "Unknown"}
          </p>
          <p>
            <strong>Published Date:</strong> {publishedDate || "Unknown"}
          </p>
        </div>
        <div style={styles.detailsRow}>
          <p>
            <strong>Page Count:</strong> {pageCount || "N/A"}
          </p>
          <p>
            <strong>Average Rating:</strong> {averageRating
              ? renderRatingStars(Math.round(averageRating))
              : "No Rating"}
          </p>
        </div>
        <div style={styles.description}>
          <p>
            <strong>Description:</strong>
          </p>
          <p>{description || "No description available."}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1.5fr",
    gap: "40px",
    padding: "40px",
    fontFamily: "Arial, sans-serif",
    alignItems: "center",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
  },
  bookImage: {
    width: "100%",
    maxWidth: "300px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  details: {
    lineHeight: "1.8",
    color: "#333",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "700",
    marginBottom: "10px",
  },
  author: {
    fontSize: "1.5rem",
    fontStyle: "italic",
    color: "#555",
    marginBottom: "20px",
  },
  detailsRow: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  },
  description: {
    marginTop: "20px",
  },
};

export default BookDetails;
