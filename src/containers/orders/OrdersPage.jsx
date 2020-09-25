import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import dateformat from "dateformat";
import {
  selectIsFetching,
  selectUserOrders,
  selectError,
} from "../../redux/orders/ordersSelector";
import Spinner from "../spinner/Spinner";
import { fetchOrdersStart } from "../../redux/orders/ordersActions";

function OrdersPage({ userOrders, isLoading, error, fetchOrders }) {
  return error ? (
    <div className="alert alert-danger text-center mt-2" role="alert">
      {error.message}
    </div>
  ) : isLoading ? (
    <Spinner />
  ) : (
    <div className="container">
      <h3>ORDER HISTORY</h3>
      {userOrders?.map((order) => (
        <div className="card mb-2" key={order.id}>
          <div className="card-header">
            <div className="row">
              <div className="col">
                {dateformat(
                  order.createdAt.toDate(),
                  "mmm dS, yyyy, h:MM:ss TT"
                )}
              </div>
              <div className="col">${order.total}</div>
              <div className="col">
                <div className="card-link">
                  <a
                    href={order.receiptUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    Receipt
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  userOrders: selectUserOrders,
  isLoading: selectIsFetching,
  error: selectError,
});

const mapDispatchToProps = (dispatch) => ({
  fetchOrders: () => dispatch(fetchOrdersStart()),
});
export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage);
