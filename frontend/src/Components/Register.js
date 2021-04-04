import { useState } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import AlertMessage from "./AlertMessage";

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    userEmail: "",
    userPassword: "",
    userName: "",
    userConfirmPassword: "",
    userType: "Buyer",
  });

  const [showAlert, setShowAlert] = useState({
    success: null,
    message: null,
    show: false,
  });

  const registerUser = () => {
    axios
      .post("http://localhost:9000/", {
        password: userInfo.userPassword,
        userEmail: userInfo.userEmail,
        userType: userInfo.userType,
        userName: userInfo.userName,
      })
      .then((res) => {
        setShowAlert({
          success: true,
          message: res.data,
          show: true,
        });
        setUserInfo({
          userEmail: "",
          userPassword: "",
          userName: "",
          userConfirmPassword: "",
          userType: "",
        });
      })
      .catch((err) => {
        setShowAlert({
          success: false,
          message: err.message,
          show: true,
        });
        setUserInfo({
          userEmail: "",
          userPassword: "",
          userName: "",
          userConfirmPassword: "",
          userType: "",
        });
      });
  };

  const alertMessageDisplay = () => {
    setShowAlert({ show: false });
  };

  return (
    <>
      <Container>
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
                          userEmail: userInfo.userEmail,
                          userPassword: userInfo.userPassword,
                          userName: e.target.value,
                          userConfirmPassword: userInfo.userConfirmPassword,
                          userType: userInfo.userType,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="email"
                      id="email"
                      placeholder="Enter email"
                      value={userInfo.userEmail}
                      onChange={(e) =>
                        setUserInfo({
                          userEmail: e.target.value,
                          userPassword: userInfo.userPassword,
                          userName: userInfo.userName,
                          userConfirmPassword: userInfo.userConfirmPassword,
                          userType: userInfo.userType,
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
                          userEmail: userInfo.userEmail,
                          userPassword: e.target.value,
                          userName: userInfo.userName,
                          userConfirmPassword: userInfo.userConfirmPassword,
                          userType: userInfo.userType,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="password"
                      id="con-password"
                      placeholder="Confirm Password"
                      value={userInfo.userConfirmPassword}
                      onChange={(e) =>
                        setUserInfo({
                          userEmail: userInfo.userEmail,
                          userPassword: userInfo.userPassword,
                          userName: userInfo.userName,
                          userConfirmPassword: e.target.value,
                          userType: userInfo.userType,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridState">
                    {/* <Form.Label>State</Form.Label> */}
                    <Form.Control
                      as="select"
                      defaultValue="Choose..."
                      onChange={(e) =>
                        setUserInfo({
                          userEmail: userInfo.userEmail,
                          userPassword: userInfo.userPassword,
                          userName: userInfo.userName,
                          userConfirmPassword: userInfo.userConfirmPassword,
                          userType: e.target.value,
                        })
                      }
                    >
                      <option>Buyer</option>
                      <option>Seller</option>
                    </Form.Control>
                  </Form.Group>
                  <center>
                    <Button variant="primary" onClick={registerUser}>
                      Register
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
    </>
  );
};

export default Register;
