import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./singlePost.css";
import axios from "axios";
import { UserContext } from "../../context/Context";

export default function SinglePost() {
  const [data, setData] = useState({});
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const PF = "http://localhost:4000/images/";
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getSinglePost = async () => {
      const res = await axios.get(`/posts/find/${postId}`);

      setData(res.data);
    };

    getSinglePost();
  }, [postId]);

  // Delete post
  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`, {
        data: { username: user.username },
      });

      alert("post has been delete..");
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {data.photo && (
          <img className="singlePostImg" src={PF + data.photo} alt="" />
        )}
        <h1 className="singlePostTitle">
          {data.title}
          {data.username === user?.username && (
            <div className="singlePostEdit">
              <i className="singlePostIcon far fa-edit"></i>
              <i
                className="singlePostIcon far fa-trash-alt"
                onClick={handleDelete}
              ></i>
            </div>
          )}
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/?user=${data.username}`}>
                {data.username}
              </Link>
            </b>
          </span>
          <span>{new Date(data.createdAt).toDateString()}</span>
        </div>
        <p className="singlePostDesc">{data.desc}</p>
      </div>
    </div>
  );
}
