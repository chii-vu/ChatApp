import React from "react";
import { Link } from "react-router-dom";

/**
 * PageNotFound component
 * @returns {JSX.Element} PageNotFound component
 */
function PageNotFound() {
  return (
    <div>
      <h1>Page Not Found :/</h1>
      <h3>
        Go to the Home Page: <Link to="/"> Home Page</Link>
      </h3>
    </div>
  );
}

export default PageNotFound;
