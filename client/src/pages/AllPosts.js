import React, { useEffect, useState, useContext, useMemo } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ThumbsUp from "../images/ThumbsUp.png";
import { AuthContext } from "../helpers/AuthContext";

function AllPosts() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchUser, setSearchUser] = useState("");

  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:8081/posts", {
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
  }, [navigate]);

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

  const filteredPosts = useMemo(() => {
    let result = listOfPosts;

    if (searchKeyword) {
      result = result.filter((post) =>
        post.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        post.postText.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    if (searchUser) {
      result = result.filter((post) =>
        post.username.toLowerCase().includes(searchUser.toLowerCase())
      );
    }

    return result;
  }, [searchKeyword, searchUser, listOfPosts]);

  const sortByMostLiked = () => {
    setListOfPosts(
      listOfPosts.sort((a, b) => {
        return b.Likes.length - a.Likes.length;
      })
    );
    window.location.reload();
  };

  const sortByDate = () => {
    setListOfPosts(
      listOfPosts.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
    );
    window.location.reload();
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '50px' }}>
        <label style={{ fontSize: '25px', marginLeft: '50px' }}>Search:</label>
        <input
          type="text"
          placeholder="Keyword"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          style={{
            border: "2px solid dodgerblue",
            padding: '10px',
            borderRadius: '5px',
            width: '300px',
            fontSize: '20px',
            marginLeft: '10px',
            marginRight: '10px',
          }}
        />
        <input
          type="text"
          placeholder="User"
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
          style={{
            border: "2px solid dodgerblue",
            padding: '10px',
            borderRadius: '5px',
            width: '300px',
            fontSize: '20px',
          }}
        />
        <label style={{ fontSize: '25px', marginLeft: '100px' }}>Sort By:</label>
        <button style={{ backgroundColor: 'dodgerblue', color: 'white', padding: '10px', borderRadius: '5px', fontSize: '20px', marginLeft: '50px' }} onClick={sortByMostLiked}>Most Liked</button>
        <button style={{ backgroundColor: 'dodgerblue', color: 'white', padding: '10px', borderRadius: '5px', fontSize: '20px' }} onClick={sortByDate}>Date Created</button>
      </div>

      <h2 style={{ margin: "50px" }}>All Posts</h2>
      {filteredPosts.map((value, key) => {
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
      }
      )}
    </div>
  );
}

export default AllPosts;