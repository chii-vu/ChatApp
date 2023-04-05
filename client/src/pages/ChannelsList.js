import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import UsersList from "./UsersList";

function ChannelsList() {
    const [listOfChannels, setListOfChannels] = useState([]);
    const { authState } = useContext(AuthContext);
    let navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate("/login");
        } else {
            axios
                .get("http://localhost:8081/channels", {
                    headers: { accessToken: localStorage.getItem("accessToken") },
                })
                .then((response) => {
                    setListOfChannels(response.data);
                });
        }
    }, []);

    const deleteChannel = (channelId) => {
        axios
            .delete(`http://localhost:8081/channels/${channelId}`, {
                headers: { accessToken: localStorage.getItem("accessToken") },
            })
            .then(() => {
                const updatedChannels = listOfChannels.filter((channel) => channel.id !== channelId);
                setListOfChannels(updatedChannels);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        // display all channels, and if the user is admin, display a delete button for each channel and a list of users
        <div className="channelsList">
            <h2> All Channels</h2>
            {
                listOfChannels.map((value, key) => {
                    return (
                        <div key={key} className="channel">
                            <Link to={`/channel/${value.id}`}> {value.channelName} </Link>
                            {authState.username === "admin" && (
                                <button onClick={() => deleteChannel(value.id)}>Delete Channel</button>
                            )}
                        </div>
                    );
                })
            }
        </div>

    );
}

export default ChannelsList;