import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8089/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName',data.userName)
        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.message || "Invalid credentials"}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  const styles = {
    body: {
      margin: 0,
      height: "100vh",
      width: "100vw",
      overflow: "hidden",
      fontFamily: "'Lato', sans-serif",
      fontWeight: 700,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#555",
      backgroundColor: "#ecf0f3",
    },
    loginDiv: {
      width: "430px",
      padding: "60px 35px 35px 35px",
      borderRadius: "40px",
      backgroundColor: "#ecf0f3",
      boxShadow: "13px 13px 20px #cbced1, -13px -13px 20px #fff",
    },
    logo: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    logoImg: {
      width: "100px",
      borderRadius: "50%",
    },
    title: {
      textAlign: "center",
      fontSize: "28px",
      paddingTop: "24px",
      letterSpacing: "0.5",
    },
    subTitle: {
      textAlign: "center",
      fontSize: "15px",
      paddingTop: "7px",
      letterSpacing: "3px",
    },
    fields: {
      width: "100%",
      padding: "75px 5px 5px 5px",
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
    username: {
      marginBottom: "30px",
      borderRadius: "25px",
      boxShadow: "inset 8px 8px 8px #cbced1, inset -8px -8px 8px #fff",
      paddingLeft: "10px",
    },
    password: {
      marginBottom: "30px",
      borderRadius: "25px",
      boxShadow: "inset 8px 8px 8px #cbced1, inset -8px -8px 8px #fff",
      paddingLeft: "10px",
    },
    signinButton: {
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
    link: {
      paddingTop: "20px",
      textAlign: "center",
    },
    linkAnchor: {
      textDecoration: "none",
      color: "#aaa",
      fontSize: "15px",
    },
  };

  return (
    <div>
      <Navbar />
      <div style={styles.body}>
        <div style={styles.loginDiv}>
          {/* Logo */}
          <div style={styles.logo}>
            <img src="OIP.jpg" alt="Logo" style={styles.logoImg} />
          </div>

          {/* Title */}
          <div style={styles.title}>Selecting Books</div>
          <div style={styles.subTitle}>Made easy!</div>

          {/* Fields */}
          <form onSubmit={handleLogin}>
            <div style={styles.fields}>
              <div style={styles.username}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.password}>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>
              <button type="submit" style={styles.signinButton}>
                Login
              </button>
              <div style={styles.link}>
                <a href="#" style={styles.linkAnchor}>
                  Forgot password?
                </a>{" "}
                or{" "}
                <a href="#" style={styles.linkAnchor}>
                  Sign Up
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
	