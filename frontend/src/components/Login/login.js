// Import necessary modules
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/context";
import Button from "../Button";
import { Wrapper } from "./login.styles";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const [_user, setUser] = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError(false);

    try {
      // Call the login endpoint on your backend
      const response = await fetch('https://filmku-nine.vercel.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Login successful, you can now redirect or handle as needed
        const data = await response.json();
        setUser({ sessionId: data.session_id, username });
        navigate("/");
      } else {
        // Handle login error
        setError(true);
      }
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  const handleInput = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  return (
    <Wrapper>
      {error && <div className="error">There was an error!</div>}
      <label>Username:</label>
      <input
        type="text"
        value={username}
        name="username"
        onChange={handleInput}
      />
      <input
        type="password"
        value={password}
        name="password"
        onChange={handleInput}
      />
      <Button callback={handleSubmit}>Login</Button>

      <a href="/SignUp">Signup Page</a>
    </Wrapper>
  );
};

export default Login;
