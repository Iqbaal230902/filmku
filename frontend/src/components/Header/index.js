import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/context";
import RMDBLogo from "../../images/react-movie-logo.png";

import { Content, LogoImg, Wrapper } from "./Header.styles";

const Header = () => {
  const [user, setUser] = useContext(Context);

  // Logout handler
  const handleLogout = () => {
    // Perform logout logic, e.g., clear user session, update context, etc.
    setUser({}); // Assuming setUser is a function to update the user context
  };

  return (
    <Wrapper>
      <Content>
        <Link to="/">
          <LogoImg src={RMDBLogo} alt="rmdb-logo" height={10} width={10} />
        </Link>

        {user?.sessionId ? (
          // Show username as a clickable link for logout
          <Link to="#" onClick={handleLogout}>
            {user.username}
          </Link>
        ) : (
          // Show signup and login links when the user is not logged in
          <>
            <Link to="/login">Login</Link>
          </>
        )}
      </Content>
    </Wrapper>
  );
};

export default Header;
