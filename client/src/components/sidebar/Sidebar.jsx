import { Link } from "react-router-dom";
import "./sidebar.css";
import aboutme from "../../Images/aboutme.png";
import React from "react";
import axios from "axios";
export default function Sidebar() {
  const [category, setCategory] = React.useState([]);
  React.useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/categories");
        // console.log(res.data);
        setCategory(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img src={aboutme} alt="" />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {category.map((c) => (
            <li className="sidebarListItem">
              <Link className="link" to={`/posts/?categories=${c.name}`}>
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
}
