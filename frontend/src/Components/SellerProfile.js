import { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

const ProfileComponent = (props) => {
  const [showOrangeTypesField, setOrangeTypesField] = useState([]);
  const [sellerData, setSellerData] = useState(null);
  console.log(showOrangeTypesField);
  useEffect(() => {
    axios
      .get("http://localhost:9000/profile", {
        username: props.user.username,
      })
      .then((data) => {
        setSellerData(data);
      });
  }, []);

  const addInputs = () => {
    setOrangeTypesField([...showOrangeTypesField, 1]);
  };

  return (
    <>
      {sellerData ? (
        <p>{sellerData}</p>
      ) : (
        <>
          <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            {showOrangeTypesField.map(() => {
              return (
                <Form.Group>
                  <Form.Control
                    type="text"
                    id="name"
                    placeholder="name of the orange type"
                  />
                  <Form.Control
                    type="text"
                    id="rate"
                    placeholder="rate per kg"
                  />
                </Form.Group>
              );
            })}
          </Form>
          <center>
            <Button variant="primary" onClick={addInputs}>
              Add Orange Type
            </Button>
          </center>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const Profile = connect(mapStateToProps, null)(ProfileComponent);

export default Profile;
