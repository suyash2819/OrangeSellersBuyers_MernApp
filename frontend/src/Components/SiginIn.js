import { useState } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { userInfo } from "../Store/reducer";
import AlertMessage from "./AlertMessage";

const UserSignInComponent = (props) => {
  const [showAlert, setShowAlert] = useState({
    success: null,
    message: null,
    show: false,
  });

  const [userInfo, setUserInfo] = useState({
    userPassword: "",
    userName: "",
  });

  const alertMessageDisplay = () => {
    setShowAlert({ show: false });
  };

  const saveUser = (data) => {
    const userdetails = {
      email: data.email,
      username: data.username,
      usertype: data.usertype,
    };
    props.userInfo(userdetails);
  };

  const authenticateUser = () => {
    axios
      .post("http://localhost:9000/signin", {
        password: userInfo.userPassword,
        userName: userInfo.userName,
      })
      .then((res) => {
        if (res.data.isMatch) {
          setShowAlert({
            success: true,
            message: "user signed in successfully",
            show: true,
          });
          setUserInfo({
            userPassword: "",
            userName: "",
          });
          saveUser(res.data.user);
        } else {
          setShowAlert({
            success: false,
            message: "wrong username or password",
            show: true,
          });
          setUserInfo({
            userPassword: "",
            userName: "",
          });
        }
      })
      .catch((err) => {
        setShowAlert({
          success: false,
          message: err.message,
          show: true,
        });
        setUserInfo({
          userPassword: "",
          userName: "",
        });
      });
  };
  return (
    <Container style={{ marginTop: "100px" }}>
      <Row className="justify-content-md-center">
        <Col md="5">
          <Card>
            <center>
              <Card.Title style={{ marginTop: "20px" }}>Register</Card.Title>
            </center>
            <Card.Body>
              <Form>
                <Form.Group>
                  <Form.Control
                    type="text"
                    id="name"
                    placeholder="Username"
                    value={userInfo.userName}
                    onChange={(e) =>
                      setUserInfo({
                        userPassword: userInfo.userPassword,
                        userName: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={userInfo.userPassword}
                    onChange={(e) =>
                      setUserInfo({
                        userPassword: e.target.value,
                        userName: userInfo.userName,
                      })
                    }
                  />
                </Form.Group>
                <center>
                  <Button variant="primary" onClick={authenticateUser}>
                    Sign In
                  </Button>
                </center>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="row justify-content-center">
        {showAlert.show ? (
          <AlertMessage
            success={showAlert.success}
            message={showAlert.message}
            alertDisplay={alertMessageDisplay}
          />
        ) : null}
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  userInfo: bindActionCreators(userInfo, dispatch),
});

const UserSignIn = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSignInComponent);

export default UserSignIn;
