import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Channel() {
    let { id } = useParams();
    const { authState } = useContext(AuthContext);
    const [listOfPosts, setListOfPosts] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8081/posts/byChannelId/${id}`).then((response) => {
            setListOfPosts(response.data);
        });
    }, []);

    return (
        <div>
            {listOfPosts.map((value, key) => {
                return (
                    <div key={key} className="post">
                        <div className="title"> {value.title} </div>
                        <div
                            className="body"
                            onClick={() => {
                                navigate(`/post/${value.id}`);
                            }}
                        >
                            {value.postText}
                        </div>
                        <div className="footer">
                            <div className="username">{value.username}</div>
                            <div className="buttons">
                                <label> {value.Likes.length}</label>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Channel;
