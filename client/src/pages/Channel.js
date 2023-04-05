import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ThumbsUp from "../images/ThumbsUp.png";
import { AuthContext } from "../helpers/AuthContext";
import CreatePost from "./CreatePost";

function Channel() {
    let { id } = useParams();
    const [listOfPosts, setListOfPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const { authState } = useContext(AuthContext);

    let navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate("/login");
        } else {
            axios
                .get(`http://localhost:8081/posts/byChannelId/${id}`, {
                    headers: { accessToken: localStorage.getItem("accessToken") },
                })
                .then((response) => {
                    setListOfPosts(response.data.listOfPosts);
                    setLikedPosts(
                        response.data.likedPosts.map((like) => {
                            return like.PostId;
                        })
                    );
                });
        }
    }, []);

    const likeAPost = (postId) => {
        axios
            .post(
                "http://localhost:8081/likes",
                { PostId: postId },
                { headers: { accessToken: localStorage.getItem("accessToken") } }
            )
            .then((response) => {
                setListOfPosts(
                    listOfPosts.map((post) => {
                        if (post.id === postId) {
                            if (response.data.liked) {
                                return { ...post, Likes: [...post.Likes, 0] };
                            } else {
                                const likesArray = post.Likes;
                                likesArray.pop();
                                return { ...post, Likes: likesArray };
                            }
                        } else {
                            return post;
                        }
                    })
                );

                if (likedPosts.includes(postId)) {
                    setLikedPosts(
                        likedPosts.filter((id) => {
                            return id !== postId;
                        })
                    );
                } else {
                    setLikedPosts([...likedPosts, postId]);
                }
            });
    };

    // Sort the posts based on the length of the Likes array in descending order
    const sortedPosts = listOfPosts.sort((a, b) => b.Likes.length - a.Likes.length);

    return (
        <div>
            <CreatePost channelId={id} />
            {sortedPosts.map((value, key) => {
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
                            <div className="buttons">
                                <img
                                    onClick={() => {
                                        likeAPost(value.id);
                                    }}
                                    className={
                                        likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"
                                    }
                                    src={ThumbsUp}
                                    alt="like"
                                />
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
