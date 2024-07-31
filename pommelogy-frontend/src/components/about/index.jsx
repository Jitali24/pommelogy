import React, { useContext } from "react";
import "./About.css";
import Header from "../header/index";
import Banner from "../../assets/banner-about.jpeg";
import BannerLight from "../../assets/banner-about-light.png";
import janvi from "../../assets/janvi.png";
import jitali from "../../assets/jitali.png";
import vishva from "../../assets/vishva.png";
import Footer from "../footer/index";
import { ThemeContext } from "../../contexts/ThemeContext"; // Ensure this path is correct

const About = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`about-container ${theme}`}>
      <div className="banner">
        <Header />
        <img
          src={theme === "dark" ? Banner : BannerLight}
          alt="Apple Banner"
          className="banner-image"
        />
        <div className="banner-content">
          <h1>About Apple Variety Identification Application</h1>
          <p>
            Our mission is to inspire and empower individuals through innovative
            solutions and exceptional service, creating a positive impact on our
            community and beyond.
          </p>
        </div>
      </div>
      <div className="about-content">
        <p>
          Welcome to our Apple Variety Identification Application. Our mission
          is to make apple identification easier and more accessible for
          everyone. Whether you are a farmer, researcher, or just an apple
          enthusiast, our application provides a simple and accurate way to
          identify various apple varieties.
        </p>
        <h4>Who we are</h4>
        <p>
          We are passionate about apples and dedicated to making apple
          identification easier and more accessible for everyone. Whether you
          are a farmer, researcher, or just an apple enthusiast, our application
          provides a simple and accurate way to identify various apple
          varieties.
        </p>
        <h4>Our Mission</h4>
        <p>
          Our mission is to support agricultural innovation and help users
          quickly identify apple varieties using advanced image recognition
          technology. We believe in the power of technology to transform
          agriculture and provide solutions that are both efficient and
          user-friendly.
        </p>
        <h4>Features</h4>
        <ul>
          <li>Easy image upload and identification process</li>
          <li>Accurate and quick results</li>
          <li>Detailed information about various apple varieties</li>
          <li>Support for multiple file formats</li>
        </ul>
        <h4>Meet the Team</h4>
        <div className="team-container">
          <div className="team-card">
            <img src={jitali} alt="Jitali Hadiya" className="team-photo" />
            <h5>Jitali Hadiya</h5>
            <div className="team-info">
              <h5>Jitali Hadiya</h5>
              <h6>Tech Innovator</h6>
              <p>
                Jitali Hadiya is passionate about the intersection of
                agriculture and technology. She leads our team in developing
                innovative solutions that push the boundaries of what our
                application can achieve. Her dedication ensures that our
                technology remains at the forefront of agricultural
                advancements.
              </p>
            </div>
          </div>
          <div className="team-card">
            <img src={janvi} alt="Janvi Patel" className="team-photo" />
            <h5>Janvi Patel</h5>
            <div className="team-info">
              <h5>Janvi Patel</h5>
              <h6>Quality Assurance</h6>
              <p>
                Janvi Patel brings a meticulous eye for detail to our team. Her
                role focuses on maintaining the accuracy and reliability of our
                identification process. Through her rigorous quality checks,
                Janvi ensures that users receive the best possible results every
                time they use our application.
              </p>
            </div>
          </div>
          <div className="team-card">
            <img src={vishva} alt="Vishva Patel" className="team-photo" />
            <h5>Vishva Patel</h5>
            <div className="team-info">
              <h5>Vishva Patel</h5>
              <h6>User Experience Specialist</h6>
              <p>
                Vishva Patel specializes in enhancing the user experience of our
                application. With a strong background in image recognition
                technology, Vishva works tirelessly to make the application
                intuitive and user-friendly. Her efforts ensure that the
                application not only functions smoothly but also provides an
                enjoyable experience for all users.
              </p>
            </div>
          </div>
        </div>
        <h4>Contact Us</h4>
        <p>
          If you have any questions or need further assistance, feel free to
          contact us at{" "}
          <a href="mailto:pommelogy@gmail.com">pommelogy@gmail.com</a>. We are
          always here to help and support our users.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default About;
