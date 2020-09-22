import React from "react";
import { selectCollection } from "../../redux/shop/shopSelector";

import classes from "./CollectionPage.module.css";
import { connect } from "react-redux";
import CollectionItem from "../../components/collection-item/CollectionItem";
import Spinner from "../spinner/Spinner";

function CollectionPage({ isLoading, collection }) {
  const { title, items } = collection ? collection : { title: "", items: [] };
  return isLoading ? (
    <Spinner />
  ) : (
    <div className={classes.collection_container}>
      <div className={classes.title}>{title?.toUpperCase()}</div>
      <div className={`${classes.preview_container} row`}>
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});
export default connect(mapStateToProps)(CollectionPage);
