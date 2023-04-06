import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { Link, useNavigate } from "react-router-dom";

/**
 * Display all users in the database
 * @returns {JSX.Element} UsersList component
 */
function UsersList() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:8081/auth", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setListOfUsers(response.data);
        });
    }
  }, [navigate]);

  const deleteUser = (userId) => {
    axios
      .delete(`http://localhost:8081/users/${userId}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        const updatedUsers = listOfUsers.filter((user) => user.id !== userId);
        setListOfUsers(updatedUsers);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    // display all channels, and if the user is admin, display a delete button for each channel and a list of users
    <div className="channelsList">
      <h2> All Users</h2>
      {listOfUsers.map((value, key) => {
        return (
          <div key={key} className="channel">
            <Link to={`/profile/${value.id}`}> {value.username} </Link>
            {authState.username === "admin" && (
              // admin can delete users
              <button onClick={() => deleteUser(value.id)}>Delete User</button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default UsersList;
