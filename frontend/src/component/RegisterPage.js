import React, { useState } from "react";
import Slider from "react-slick"; // Import the React Slick component
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

// Slick Carousel Settings
const settings = {
  dots: true,  // Shows navigation dots
  infinite: true, // Infinite looping
  speed: 500, // Transition speed
  slidesToShow: 1, // Show 1 slide at a time
  slidesToScroll: 1, // Scroll 1 slide at a time
  arrows: true, // Shows next/prev arrows
};

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [favoriteGenres, setFavoriteGenres] = useState([]);
  const [roles, setRoles] = useState(["ROLE_USER"]);
  const [genreInput, setGenreInput] = useState("");
  const navigate = useNavigate();

  const handleGenreAdd = () => {
    if (genreInput && !favoriteGenres.includes(genreInput)) {
      setFavoriteGenres([...favoriteGenres, genreInput]);
      setGenreInput("");
    }
  };

  const handleGenreRemove = (genreToRemove) => {
    setFavoriteGenres(favoriteGenres.filter((genre) => genre !== genreToRemove));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8089/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, favoriteGenres, roles }),
      });

      if (response.ok) {
        const message = await response.text();
        alert(`Success: ${message}`);
        navigate("/login");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };

  const styles = {
    container: {
      display: "flex",
      height: "100vh",
      width: "100vw",
      overflow: "hidden",
      fontFamily: "'Lato', sans-serif",
      fontWeight: 700,
      backgroundColor: "#f4f7fa",
    },
    leftPane: {
      width: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#02c8c8",
      padding: "20px",
      position: "relative",
    },
    rightPane: {
      width: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    registerDiv: {
      width: "430px",
      padding: "60px 35px 35px 35px",
      borderRadius: "40px",
      backgroundColor: "#ffffff",
      boxShadow: "13px 13px 20px #cbced1, -13px -13px 20px #fff",
      zIndex: 2,
    },
    title: {
      textAlign: "center",
      fontSize: "28px",
      paddingTop: "24px",
      letterSpacing: "0.5",
    },
    fields: {
      width: "100%",
      padding: "20px 5px 5px 5px",
    },
    inputField: {
      marginBottom: "20px",
      borderRadius: "25px",
      boxShadow: "inset 8px 8px 8px #cbced1, inset -8px -8px 8px #fff",
      paddingLeft: "10px",
    },
    input: {
      border: "none",
      outline: "none",
      background: "none",
      fontSize: "18px",
      color: "#555",
      padding: "20px 10px 20px 5px",
      width: "90%",
    },
    registerButton: {
      outline: "none",
      border: "none",
      cursor: "pointer",
      width: "100%",
      height: "60px",
      borderRadius: "30px",
      fontSize: "20px",
      fontWeight: 700,
      fontFamily: "'Lato', sans-serif",
      color: "#fff",
      textAlign: "center",
      backgroundColor: "#02c8c8",
      boxShadow: "3px 3px 8px #b1b1b1, -3px -3px 8px #b1b1b1",
      transition: "all 0.3s",
    },
    genreContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: "10px",
      marginBottom: "20px",
    },
    genreButton: {
      padding: "6px 12px",
      borderRadius: "20px",
      backgroundColor: "#02c8c8",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      fontSize: "14px",
      transition: "all 0.3s",
    },
    genreInput: {
      width: "90%",
      padding: "8px 10px",
      borderRadius: "25px",
      boxShadow: "inset 8px 8px 8px #cbced1, inset -8px -8px 8px #fff",
      marginRight: "10px",
    },
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        {/* Left Pane with React Slick Carousel */}
        <div style={styles.leftPane}>
          <Slider {...settings}>
            <div>
              <img
                src="https://images-na.ssl-images-amazon.com/images/I/511vJPN7p5L._SX331_BO1,204,203,200_.jpg"
                alt="Book 1"
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />
            </div>
            <div>
              <img
                src="https://images-na.ssl-images-amazon.com/images/I/41rUxcHPy6L._SX324_BO1,204,203,200_.jpg"
                alt="Book 2"
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />
            </div>
            <div>
              <img
                src="https://rukminim1.flixcart.com/image/416/416/jp8ngcw0-1/book/5/8/1/dark-matter-original-imafbj3whzg2yghz.jpeg?q=70"
                alt="Book 3"
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />
            </div>
            <div>
              <img
                src="https://images-na.ssl-images-amazon.com/images/I/51AB1ghNNFL._SX326_BO1,204,203,200_.jpg"
                alt="Book 4"
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />
            </div>
          </Slider>
        </div>

        {/* Right Pane */}
        <div style={styles.rightPane}>
          <div style={styles.registerDiv}>
            <div style={styles.title}>Register</div>
            <form onSubmit={handleRegister}>
              <div style={styles.fields}>
                <div style={styles.inputField}>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={styles.input}
                    required
                  />
                </div>
                <div style={styles.inputField}>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                    required
                  />
                </div>
                <div style={styles.inputField}>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    required
                  />
                </div>

                {/* Genre Input Section */}
                <div style={styles.inputField}>
                  <div style={styles.genreContainer}>
                    <input
                      type="text"
                      value={genreInput}
                      onChange={(e) => setGenreInput(e.target.value)}
                      style={styles.genreInput}
                      placeholder="Add Genre"
                    />
                    <button
                      type="button"
                      onClick={handleGenreAdd}
                      style={styles.genreButton}
                    >
                      Add
                    </button>
                  </div>
                  <div style={styles.genreContainer}>
                    {favoriteGenres.map((genre) => (
                      <button
                        key={genre}
                        onClick={() => handleGenreRemove(genre)}
                        style={styles.genreButton}
                      >
                        {genre} ❌
                      </button>
                    ))}
                  </div>
                </div>

                <button type="submit" style={styles.registerButton}>
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
