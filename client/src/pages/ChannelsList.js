import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

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

    return (
        <div className="listOfChannels">
            {listOfChannels.map((value, key) => {
                return (
                    <div key={key} className="channel">
                        <Link to={`/channel/${value.id}`}> {value.channelName} </Link>
                    </div>
                );
            })}
        </div>
    );
}

export default ChannelsList;
