import React from "react";
import axios from "axios";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";
import { useLocation } from "react-router-dom";

export default function Homepage() {
  const [posts, setPosts] = React.useState([]);
  const { search } = useLocation();
  const URL = "http://localhost:8080/api/posts" + search;
  console.log(URL);
  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(URL);
        // console.log(res.data);
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [URL]);

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
