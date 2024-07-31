import React, { useState, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Contact.css";
import Header from "../header/index";
import Footer from "../footer/index";
import redIconUrl from "../../assets/pin.png";
import Banner from "../../assets/banner-contact.jpg";
import BannerLight from "../../assets/banner-contact-light.png";
import { ThemeContext } from "../../contexts/ThemeContext";

const Index = () => {
  const [selectedService, setSelectedService] = useState(null);
  const { theme } = useContext(ThemeContext);

  const services = [
    {
      title: "Agricultural Research and Development",
      description:
        "Conduct cutting-edge research to enhance agricultural productivity and sustainability. Collaborate with researchers and industry partners to develop new technologies and practices.",
      examples: [
        "Crop disease research",
        "Soil health studies",
        "Agricultural innovation programs",
      ],
    },
    {
      title: "Farm Financial Support",
      description:
        "Provide financial assistance and advice to farmers and agricultural businesses to help them manage risks and improve their operations.",
      examples: [
        "Grants for farm improvements",
        "Subsidies for sustainable practices",
        "Financial planning services",
      ],
    },
    {
      title: "Food Safety and Inspection",
      description:
        "Ensure the safety and quality of food products through rigorous inspection and monitoring programs. Work to prevent foodborne illnesses and ensure compliance with safety standards.",
      examples: [
        "Food inspection services",
        "Certification programs",
        "Consumer safety information",
      ],
    },
    {
      title: "Sustainable Agriculture Programs",
      description:
        "Promote environmentally friendly farming practices and support the transition to sustainable agriculture. Provide resources and guidance on reducing environmental impact.",
      examples: [
        "Soil conservation programs",
        "Water management strategies",
        "Organic farming support",
      ],
    },
    {
      title: "Farmer Education and Training",
      description:
        "Offer educational programs and training sessions to help farmers and agricultural professionals stay informed about best practices and new technologies.",
      examples: [
        "Workshops on modern farming techniques",
        "Online courses on crop management",
        "Technical support for new equipment",
      ],
    },
    {
      title: "Rural Development Initiatives",
      description:
        "Support rural communities through various development programs aimed at improving infrastructure, economic opportunities, and quality of life.",
      examples: [
        "Rural infrastructure projects",
        "Community development grants",
        "Support for local businesses",
      ],
    },
    {
      title: "Climate Change Adaptation",
      description:
        "Assist farmers in adapting to the impacts of climate change by providing research, tools, and strategies for managing climate-related risks.",
      examples: [
        "Climate adaptation planning",
        "Risk assessment tools",
        "Support for climate-resilient crops",
      ],
    },
    {
      title: "Policy and Advocacy",
      description:
        "Work on agricultural policy development and advocate for the needs of the agricultural sector. Engage with policymakers and stakeholders to shape effective policies.",
      examples: [
        "Policy analysis and recommendations",
        "Advocacy for agricultural interests",
        "Public consultations",
      ],
    },
  ];

  const handleServiceClick = (index) => {
    setSelectedService(index === selectedService ? null : index);
  };

  const redIcon = new L.Icon({
    iconUrl: redIconUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <div className={`contact-container ${theme}`}>
      <div className="contact-banner">
        <Header />
        <img
          src={theme === "dark" ? Banner : BannerLight}
          alt="Index Banner"
          className="contact-banner-image"
        />
        <div className="contact-banner-text">
          Your Feedback Matters - Get in Touch and Let Us Serve You Better!
        </div>
      </div>

      <div className="services">
        <h2>Our Services</h2>
        <ul>
          {services.map((service, index) => (
            <li
              key={index}
              className="service-title"
              onClick={() => handleServiceClick(index)}
            >
              <h5>
                <span
                  className={`arrow ${
                    selectedService === index ? "down" : "right"
                  }`}
                >
                  {selectedService === index ? "▼" : "▶"}
                </span>
                {service.title}
              </h5>
              {selectedService === index && (
                <div className="service-details">
                  <p>{service.description}</p>
                  <ul>
                    {service.examples.map((example, idx) => (
                      <li key={idx}>{example}</li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="map-and-address">
        <div className="map">
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            style={{ height: "300px", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[51.505, -0.09]} icon={redIcon}>
              <Popup>Our Location</Popup>
            </Marker>
          </MapContainer>
        </div>
        <div className="address">
          <h2>Our Address</h2>
          <p>Agriculture and Agri-Food Canada</p>
          <p>1341 Baseline Road</p>
          <p>Ottawa, ON</p>
          <p>K1A 0C5</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
