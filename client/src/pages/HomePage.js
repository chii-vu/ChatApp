import React, { useContext } from "react";
import ChannelsList from "./ChannelsList";
import CreateChannel from "./CreateChannel";
import UsersList from "./UsersList";
import { AuthContext } from "../helpers/AuthContext";

function HomePage() {
    const { authState } = useContext(AuthContext);

    return (
        <div>
            <ChannelsList />
            <CreateChannel />
            {authState.username === "admin" && <UsersList />}
        </div>
    );
}

export default HomePage;
