import React, { useEffect, useState } from "react";
import CollectionOverview from "../../components/collection-overview/CollectionOverview";
import classes from "./ShopPage.module.css";
import { Route } from "react-router-dom";
import CollectionPage from "../collection/CollectionPage";
import { connect } from "react-redux";
import { updateCollections } from "../../redux/shop/shopActions";
import {
  convertCollectionsSnapshotToMap,
  firestore,
} from "../../firebase/firebase.utils";

function ShopPage({ match, updateCollections }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const collectionRef = firestore.collection("collections");
    const unsubscribeFromSnapshot = collectionRef.onSnapshot(
      async (snapshot) => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        updateCollections(collectionsMap);
        setLoading(false);
      }
    );
    return () => {
      unsubscribeFromSnapshot();
    };
  }, []);

  return (
    <div className={classes.shopPage}>
      <Route
        exact
        path={`${match.path}`}
        render={(props) => (
          <CollectionOverview isLoading={loading} {...props} />
        )}
      />
      <Route
        path={`${match.path}/:collectionId`}
        render={(props) => <CollectionPage isLoading={loading} {...props} />}
      />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
