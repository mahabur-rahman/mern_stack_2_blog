import { Link } from "react-router-dom";
import "./post.css";

export default function Post({ post }) {
  const PF = "http://localhost:4000/images/";
  return (
    <div className="post">
      {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((cat) => (
            <span className="postCat" key={cat}>
              <Link className="link" to={`/post/${cat}`}>
                {cat}
              </Link>
            </span>
          ))}
        </div>
        <span className="postTitle">
          <Link to={`/post/${post._id}`} className="link">
            {post.title}
            <br />
            <br />
            <span style={{ color: "gray" }}> {post.username}</span>
          </Link>
        </span>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
}
