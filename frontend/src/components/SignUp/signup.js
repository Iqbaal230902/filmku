import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../API/API";

// Components
import Button from "../Button";

// Styles
import { Wrapper } from "./signup.styles";

// Context
import { Context } from "../../context/context";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async () => {
        setError(false);

        try {
            const response = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                navigate("/login");
            } else {
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
            <Button callback={handleSignup}>Signup</Button>

            <a href="/login">Login Page</a>
        </Wrapper>
    );
}

export default Signup