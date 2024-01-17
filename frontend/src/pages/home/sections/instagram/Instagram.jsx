import { Link } from "react-router-dom";
import "./Instagram.css";

export const Instagram = () => {
  return (
    <section className="insta-section-wrapper">
      <h2 className="section-title">Join our Community</h2>
      <span className="hashtag">#PlantsByYou</span>
      <ul className="instafeed-container">
        <li>
          <img src="./insta_1.jpeg" alt="" />
        </li>
        <li>
          <img src="./insta_2.jpeg" alt="" />
        </li>
        <li>
          <img src="./insta_3.jpeg" alt="" />
        </li>
        <li>
          <img src="./insta_4.jpeg" alt="" />
        </li>
      </ul>
      <p>
        We love to see our plants in your homes. Tag your photo with{" "}
        <Link to="https://www.instagram.com/plantsby_hw/">
          <b>@plantsby_hw</b>
        </Link>{" "}
        on Instagram.
      </p>
    </section>
  );
};