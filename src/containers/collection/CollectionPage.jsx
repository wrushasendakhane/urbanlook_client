import React from "react";
import { selectCollection } from "../../redux/shop/shopSelector";

import classes from "./CollectionPage.module.css";
import { connect } from "react-redux";
import CollectionItem from "../../components/collection-item/CollectionItem";

function CollectionPage({ collection }) {
  const { title, items } = collection;
  return (
    <div className={classes.collection_container}>
      <div className={classes.title}>{title?.toUpperCase()}</div>
      <div className={`${classes.preview_container} row`}>
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
    // <div className={classes.collectionPage}>
    //   <h2 classes={classes.title}>{title}</h2>
    //   {items.map((item) => (
    //     <CollectionItem key={item.id} item={item} />
    //   ))}
    // </div>
  );
}

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});
export default connect(mapStateToProps)(CollectionPage);
