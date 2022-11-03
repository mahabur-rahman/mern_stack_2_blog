import { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";
import axios from "axios";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

export default function Homepage() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get(`/posts` + search);
        setPosts(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, [search]);

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}
