import classes from "./MenuItem.module.css";
import React from "react";
import { withRouter } from "react-router-dom";

const MenuItem = ({ title, imageUrl, size, linkUrl, history }) => {
  return (
    <div
      className={`col-12 ${size ? "col-md-6" : "col-md-4"}`}
      style={{
        height: `${size ? "380px" : "240px"}`,
        display: "flex",
        padding: "15px",
        overflow: "hidden",
      }}
    >
      <div className="card bg-dark text-white">
        <img
          src={imageUrl}
          // className="card-img"
          alt="Menu Item"
          style={{
            width: "100%",
            height: "100%",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="card-img-overlay d-flex"
          onClick={() => history.push(`${linkUrl}`)}
        >
          <div
            className="my-auto mx-auto text-center btn btn-light border-dark"
            style={{ opacity: "0.7" }}
          >
            <h5 className="card-title">{title?.toUpperCase()}</h5>
            <p className="card-text">SHOP NOW</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(MenuItem);
