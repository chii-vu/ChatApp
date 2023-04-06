import React, { useContext } from "react";
import ChannelsList from "./ChannelsList";
import CreateChannel from "./CreateChannel";

function HomePage() {
    return (
        <div>
            <ChannelsList />
            <CreateChannel />
        </div>
    );
}

export default HomePage;
