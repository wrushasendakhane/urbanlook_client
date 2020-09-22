import React from "react";
import CollectionOverview from "../../components/collection-overview/CollectionOverview";
import classes from "./ShopPage.module.css";
import { Route } from "react-router-dom";
import CollectionPage from "../collection/CollectionPage";

function ShopPage({ match }) {
  return (
    <div className={classes.shopPage}>
      <Route exact path={`${match.path}`} component={CollectionOverview} />
      <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>
  );
}

export default ShopPage;
