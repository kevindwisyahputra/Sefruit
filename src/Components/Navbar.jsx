import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ModalLogin from "./ModalLogin";
import { connect } from "react-redux"; // menghubungkan component dengan redux store
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { logoutAction } from "../Redux/Actions/UserAction";
import { Navigate } from "react-router-dom";
class Navbar extends React.Component {
  state = {
    modalOpen: false,
    dropdownOpen: false,
    redirect: false,
  };

  handleModalLogin = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  handleLogout = () => {
    this.props.logoutAction();
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      this.setState({ redirect: false });
      return <Navigate to="/" />;
    }
    return (
      <div className="row">
        <ModalLogin
          modalOpen={this.state.modalOpen}
          handleModal={this.handleModalLogin}
        />
        <div className="col-12 col-md-6 align-self-center">
          <Link to="/" className="m" style={{ textDecoration: "none" }}>
            <h3 className="sefruit-main-dark px-3">Sefruit</h3>
          </Link>
        </div>
        <div className="col-12 col-md-6">
          <div className="row">
            <div className="col-4 sefruit-bg-main-light py-3">
              <div className="d-flex justify-content-center align-items-center h-100">
                <FontAwesomeIcon
                  icon={faBars}
                  className="sefruit-font-size-20 sefruit-main-dark"
                />
              </div>
            </div>
            <div className="col-4 sefruit-bg-dark-grey py-3">
              <div className="d-flex justify-content-center align-items-center h-100">
                <div className="position-relative">
                  <FontAwesomeIcon
                    icon={faBasketShopping}
                    className="sefruit-font-size-20 sefruit-main-dark"
                  />
                  {this.props.cart.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {this.props.cart.length}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="col-4 sefruit-bg-light-grey py-3">
              <div className="d-flex flex-wrap justify-content-center align-items-center h-100 sefruit-main-dark">
                {this.props.username ? (
                  <Dropdown
                    isOpen={this.state.dropdownOpen}
                    toggle={() =>
                      this.setState({ dropdownOpen: !this.state.dropdownOpen })
                    }
                  >
                    <DropdownToggle color="info" caret>
                      {this.props.username}
                    </DropdownToggle>
                    <DropdownMenu end>
                      {this.props.role == "Admin" ? (
                        <>
                          <Link
                            to="/manage-product"
                            style={{ textDecoration: "none" }}
                          >
                            <DropdownItem>Manage Products</DropdownItem>
                          </Link>
                          <DropdownItem>Manage Transactions</DropdownItem>
                        </>
                      ) : (
                        <DropdownItem>Transactions</DropdownItem>
                      )}
                      <DropdownItem>Profile</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem onClick={this.handleLogout}>
                        Logout
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                ) : (
                  <>
                    <button
                      className="btn btn-outline-info"
                      onClick={this.handleModalLogin}
                    >
                      Login
                    </button>
                    <Link to="/register">
                      <button className="btn btn-light">Register</button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapToProps = (state) => {
  return {
    username: state.userReducer.username,
    role: state.userReducer.role,
    cart: state.userReducer.cart,
  };
};

export default connect(mapToProps, { logoutAction })(Navbar);
