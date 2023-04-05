import React, { useContext } from "react";
import ChannelsList from "./ChannelsList";
import CreateChannel from "./CreateChannel";
import UsersList from "./UsersList";
// /Users/minh / ChatApp / client / src / components / SearchBar.js
import SearchBar from "../components/SearchBar";
import { AuthContext } from "../helpers/AuthContext";

function HomePage() {
    const { authState } = useContext(AuthContext);

    return (
        <div>
            <SearchBar /> {/* include the SearchBar component */}
            <ChannelsList />
            <CreateChannel />
            {authState.username === "admin" && <UsersList />}
        </div>
    );
}

export default HomePage;
