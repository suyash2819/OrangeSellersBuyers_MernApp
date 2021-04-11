import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { userInfo } from "../Store/reducer";

const HeaderComponent = (props) => {
  const logout = () => {
    props.userInfo(null);
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
      <Navbar.Brand style={{ fontSize: "15px" }}>Scaffoldzoid</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {props.user ? (
            <>
              <Navbar.Text style={{ padding: "0px" }}>
                <Link className="nav-link" onClick={logout} to="/">
                  Log Out
                </Link>
              </Navbar.Text>
              {props.user.usertype === "Seller" ? (
                <Navbar.Text style={{ padding: "0px" }}>
                  <Link
                    className="nav-link"
                    to={{
                      pathname: `/profile/${props.user.username}`,
                    }}
                  >
                    Profile
                  </Link>
                </Navbar.Text>
              ) : (
                <Navbar.Text style={{ padding: "0px" }}>
                  <Link className="nav-link" to="/getsellers">
                    Orange Sellers
                  </Link>
                </Navbar.Text>
              )}
            </>
          ) : (
            <>
              <Navbar.Text style={{ padding: "0px" }}>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </Navbar.Text>
              <Navbar.Text style={{ padding: "0px" }}>
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </Navbar.Text>
              <Navbar.Text style={{ padding: "0px" }}>
                <Link to="/signin" className="nav-link">
                  Sign In
                </Link>
              </Navbar.Text>
            </>
          )}
        </Nav>
        <Nav>
          {props.user && (
            <Navbar.Text>Welcome {props.user.username}</Navbar.Text>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  userInfo: bindActionCreators(userInfo, dispatch),
});

const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);

export default Header;
