import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./singlePost.css";
import axios from "axios";

export default function SinglePost() {
  const [data, setData] = useState({});
  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  useEffect(() => {
    const getSinglePost = async () => {
      const res = await axios.get(`/posts/find/${postId}`);

      setData(res.data);
    };

    getSinglePost();
  }, [postId]);

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {data.photo && (
          <img className="singlePostImg" src={data.photo} alt="" />
        )}
        <h1 className="singlePostTitle">
          {data.title}
          <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit"></i>
            <i className="singlePostIcon far fa-trash-alt"></i>
          </div>
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to="/posts?username=Safak">
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
