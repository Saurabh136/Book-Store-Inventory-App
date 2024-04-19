import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";
import heroImg from "../../assets/StoreFront.png";
import logo from "../../assets/Store-logo.png";
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HiddenLink";

const Home = () => {
  return (
    <div className="home">
      {/* <div className="flex-container">
          <img
              className="blur-sm"
            src={backgroundImage}
            alt="Background Image"
          />
       </div>    */}
      <nav className="navbar">
        {/* <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" /> 
          <p>The Kitab Korner</p>
        </div> */}
        {/* <div className="flex items-center justify-between py-4 px-6 bg-gray-800"> */}
                <div className="logo-container">
                    {/* <Link href="/store"> */}
                    <img src={logo} alt="The Kitab Korner Logo" className="logo" />
                    {/* </Link> */}
                    <div className="brand-text">
                        <h1>The Kitab Korner</h1>
                        <span className="book-slogan">Book Store for All</span>
                    </div>
                </div>
  

        <ul className="home-links">
          <ShowOnLogout>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ShowOnLogout>
          <ShowOnLogout>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/login">Login</Link>
              </button>
            </li>
          </ShowOnLogout>
          <ShowOnLogin>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/dashboard">Dashboard</Link>
              </button>
            </li>
          </ShowOnLogin>
        </ul>
      </nav>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-text">
          <h2> The Kitab Korner Book Store</h2>
          <p>
             One place where you get different genre books at a discounted price.
          </p>
          <div className="hero-buttons">
            <button className="--btn --btn-secondary">
              <Link to="/dashboard">Add New Book</Link>
            </button>
          </div>
          {/* <div className="--flex-start">
            <NumberText num="14K" text="Brand Owners" />
            <NumberText num="23K" text="Active Users" />
            <NumberText num="500+" text="Partners" />
          </div> */}
        </div>

         <div className="hero-image">
          <img src={heroImg} alt="Inventory"/>
        </div> 
        
      </section>
    
    </div>
  );
};

// const NumberText = ({ num, text }) => {
//   return (
//     <div className="--mr">
//       <h3 className="--color-white">{num}</h3>
//       <p className="--color-white">{text}</p>
//     </div>
//   );
// };

export default Home;
