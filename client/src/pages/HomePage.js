import React from "react";
import ChannelsList from "./ChannelsList";
import CreateChannel from "./CreateChannel";

/**
 * HomePage component
 * @returns {JSX.Element} HomePage component
 */
function HomePage() {
    return (
        <div>
            <ChannelsList />
            <CreateChannel />
        </div>
    );
}

export default HomePage;
