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

  // update mode
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  // get single post
  useEffect(() => {
    const getSinglePost = async () => {
      const res = await axios.get(`/posts/find/${postId}`);

      setData(res.data);

      // FOR UPDATE
      setTitle(res.data.title);
      setDesc(res.data.desc);
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

  // update post
  const handleUpdate = async () => {
    try {
      const res = await axios.put(`/posts/${data._id}`, {
        username: user.username,
        title,
        desc,
      });

      // window.location.reload();

      setUpdateMode(false);
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
        {updateMode ? (
          <input
            type="text"
            value={title}
            autoFocus
            className="singlePostTitleInput"
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {data.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
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
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            rows="4"
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}

        {updateMode && (
          <button onClick={handleUpdate} className="singlePostButton">
            Update
          </button>
        )}
      </div>
    </div>
  );
}
