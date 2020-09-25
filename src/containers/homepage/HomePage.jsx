import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Directory from "../../components/directory/Directory";
import {
  selectError,
  selectIsFetching,
} from "../../redux/directory/directorySelector";
import Spinner from "../spinner/Spinner";

const HomePage = ({ isLoading, error }) => {
  return error ? (
    <div className="alert alert-danger text-center" role="alert">
      {error}
    </div>
  ) : isLoading ? (
    <Spinner />
  ) : (
    <Directory />
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsFetching,
  error: selectError,
});
export default connect(mapStateToProps)(HomePage);
