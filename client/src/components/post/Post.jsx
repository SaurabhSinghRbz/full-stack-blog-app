import { Link } from "react-router-dom";
import "./post.css";
import defaultBlog from "../../Images/defaultBlog.jpg";

export default function Post({ post }) {
  let blogPic = post.photo;
  if (blogPic === undefined || blogPic === "") {
    blogPic = defaultBlog;
  }
  return (
    <div className="post">
      <img className="postImg" src={blogPic} alt="poster" />
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c, idx) => (
            <span className="postCat" key={idx}>
              <Link
                className="link"
                to={`http://localhost:8080/api/posts/?categories=${c}`}
              >
                {c}
              </Link>
            </span>
            // <span className="postCat">{c}</span>
          ))}
        </div>
        <span className="postTitle">
          <Link to={`/post/${post._id}`} className="link">
            {post.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.description}</p>
    </div>
  );
}
