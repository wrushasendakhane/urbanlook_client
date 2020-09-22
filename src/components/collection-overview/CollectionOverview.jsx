import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import classes from "./CollectionOverview.module.css";
import CollectionPreview from "../collection-preview/CollectionPreview";
import { selectCollectionForPreview } from "../../redux/shop/shopSelector";
import Spinner from "../../containers/spinner/Spinner";

function CollectionOverview({ isLoading, collections }) {
  return isLoading ? (
    <Spinner />
  ) : (
    <div className={classes.collectionOverview}>
      {collections.map(({ id, ...otherCollectionProps }) => {
        return <CollectionPreview key={id} {...otherCollectionProps} />;
      })}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionForPreview,
});
export default connect(mapStateToProps)(CollectionOverview);
