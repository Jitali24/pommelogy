import React, { useRef, useState, useEffect, useContext } from "react";
import { Modal } from "react-bootstrap";
import { ThemeContext } from "../../contexts/ThemeContext"; // Import your theme context
import "./Home.css";
import Header from "../header/index";

const Home = () => {
  const { theme } = useContext(ThemeContext); // Get the current theme
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedApple, setSelectedApple] = useState(null);
  const [showUploadAlert, setShowUploadAlert] = useState(false);
  const [uploadAlertTimeout, setUploadAlertTimeout] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);

  const handleIdentifyClick = async () => {
    if (!selectedFile) {
      alert("Please upload an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("http://localhost:8000/api/predict/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      data.uploaded_image_url = imagePreview;
      if (response.ok) {
        console.log("Prediction:", data);
        setSelectedApple(data);
        setShowModal(true);
      } else {
        console.error("Error predicting apple variety:", data);
        alert("Error predicting apple variety: " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error: " + error.message);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      setIsImageSelected(true);
      console.log("File selected:", file.name);
      const timeout = setTimeout(() => {
        setShowUploadAlert(false);
      }, 30000); // 30 seconds
      setUploadAlertTimeout(timeout);
    } else {
      setIsImageSelected(false);
    }
  };

  const handleCloseUploadAlert = () => {
    setShowUploadAlert(false);
    if (uploadAlertTimeout) {
      clearTimeout(uploadAlertTimeout);
    }
  };

  useEffect(() => {
    return () => {
      if (uploadAlertTimeout) {
        clearTimeout(uploadAlertTimeout);
      }
    };
  }, [uploadAlertTimeout]);

  return (
    <div className={`home-container ${theme === "dark" ? "dark" : "light"}`}>
      <Header />
      <div className="content">
        <h1 className="title">Apple Variety Identification Application</h1>
        <h5 className="subtitle">Apples Unveiled: Identify with Ease</h5>
        <div className="flex-col">
          <div className="buttons">
            <button className="button" onClick={handleUploadClick}>
              Upload Image
            </button>
            <button className="button primary" onClick={handleIdentifyClick}>
              Identify
            </button>
          </div>

          {isImageSelected ? (
            <div
              className="btn-secondary"
              onClick={() => setShowUploadAlert(true)}
            >
              View Selected Image
            </div>
          ) : (
            <div className="btn-secondary disabled">No image selected</div>
          )}

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>

        <Modal show={showUploadAlert} onHide={handleCloseUploadAlert} centered>
          <Modal.Header className="home-modal-header" closeButton>
            <Modal.Title>Uploaded Image</Modal.Title>
          </Modal.Header>
          <Modal.Body className="home-modal-body">
            <h6>File Uploaded: {selectedFile?.name}</h6>
            {imagePreview && (
              <div className="image-preview">
                <img
                  src={imagePreview}
                  alt="Uploaded preview"
                  className="uploaded-image-preview"
                />
              </div>
            )}
          </Modal.Body>
        </Modal>

        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Know your Apple</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedApple && (
              <div className="apple-detail">
                <div className="">
                  <img
                    src={imagePreview}
                    alt=""
                    className="cta-img"
                    style={{ margin: "0 auto" }}
                  />
                </div>
                <div className="apple-detail-name">
                  <h3>{selectedApple.apple_variety.name}</h3>
                </div>
                <div className="apple-detail-info">
                  <div className="apple-detail-section">
                    <h3>Description:</h3>
                    <p>{selectedApple.apple_variety.description}</p>
                  </div>
                  <div className="apple-detail-section">
                    <h3>Visual Characteristics:</h3>
                    <p>{selectedApple.apple_variety.visual_characteristics}</p>
                  </div>
                  <div className="apple-detail-section">
                    <h3>Taste Profile:</h3>
                    <p>{selectedApple.apple_variety.taste_profile}</p>
                  </div>
                  <div className="apple-detail-section">
                    <h3>Culinary Uses:</h3>
                    <p>{selectedApple.apple_variety.culinary_uses}</p>
                  </div>
                </div>
              </div>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Home;
