import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Channel() {
    let { id } = useParams();
    let navigate = useNavigate();
    const [listOfPosts, setListOfPosts] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate("/login");
        } else {
            axios.get(`http://localhost:8081/posts/byChannelId/${id}`).then((response) => {
                setListOfPosts(response.data.listOfPosts);
            });
        }
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
                            <div className="username">
                                <Link to={`/profile/${value.UserId}`}> {value.username} </Link>
                            </div>
                            {/* <div className="buttons">
                <ThumbUpAltIcon
                  onClick={() => {
                    likeAPost(value.id);
                  }}
                  className={
                    likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"
                  }
                />

                <label> {value.Likes.length}</label>
              </div> */}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}


export default Channel;
