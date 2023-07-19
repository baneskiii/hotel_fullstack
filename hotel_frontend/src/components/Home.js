import React from "react";
import "../img/1.jpeg";

function Home() {
  return (
    <div className="container">
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={require("../img/1.jpeg")} className="d-block w-100" />
          </div>
          <div className="carousel-item">
            <img src={require("../img/2.jpeg")} className="d-block w-100" />
          </div>
          <div className="carousel-item">
            <img src={require("../img/3.jpeg")} className="d-block w-100" />
          </div>
          <div className="carousel-item">
            <img src={require("../img/4.jpeg")} className="d-block w-100" />
          </div>
          <div className="carousel-item">
            <img src={require("../img/5.jpeg")} className="d-block w-100" />
          </div>
          <div className="carousel-item">
            <img src={require("../img/6.jpeg")} className="d-block w-100" />
          </div>
          <div className="carousel-item">
            <img src={require("../img/7.jpeg")} className="d-block w-100" />
          </div>
          <div className="carousel-item">
            <img src={require("../img/8.jpeg")} className="d-block w-100" />
          </div>
          <div className="carousel-item">
            <img src={require("../img/9.jpeg")} className="d-block w-100" />
          </div>
          <div className="carousel-item">
            <img src={require("../img/10.jpeg")} className="d-block w-100" />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Home;
