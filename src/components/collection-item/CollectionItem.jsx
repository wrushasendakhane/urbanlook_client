import React from "react";
import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cartActions";
import CustomButton from "../custom-button/CustomButton";
import classes from "./CollectionItem.module.css";
const CollectionItem = ({ item, addItem }) => {
  const { name, imageUrl, price } = item;
  return (
    <div className={`col-sm-12 col-md-3 ${classes.collection_item} mb-2`}>
      <div className="card" style={{ width: "300px" }}>
        <img
          src={imageUrl}
          className="card-img-top"
          alt={name}
          style={{
            width: "100%",
            height: "310px",
            objectFit: "cover",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="card-img-overlay">
          <CustomButton
            style={{
              opacity: "0.7",
              marginTop: "240px",
              width: "100%",
            }}
            onClick={() => addItem(item)}
          >
            Add to Cart
          </CustomButton>
        </div>
        <div className={classes.price}>
          <div className="row  p-1">
            <div className="col-auto mr-auto">
              <span>{name}</span>
            </div>
            <div className="col-auto">
              <span>${price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
