import React, { useContext } from "react";
import ChannelsList from "./ChannelsList";
import UsersList from "./UsersList";
import { AuthContext } from "../helpers/AuthContext";

function LandingPage() {
    const { authState } = useContext(AuthContext);

    return (
        <div>
            <ChannelsList />
            {authState.username === "admin" && <UsersList />}
        </div>
    );
}

export default LandingPage;
