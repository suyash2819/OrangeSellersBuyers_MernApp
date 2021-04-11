import { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Button, Form, Table } from "react-bootstrap";

const ProfileComponent = (props) => {
  const [showOrangeTypesField, setOrangeTypesField] = useState([]);
  const [sellerData, setSellerData] = useState(null);
  const [orangeInputs, setOrangeInputs] = useState({ type: "", rate: "" });
  const [allInputs, setAllInputs] = useState([]);
  const [description, setDescription] = useState("");
  const [updateInputs, setUpdateInputs] = useState(false);
  const [oldValue, setOldValue] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:9000/profile", {
        params: {
          username: props.user.username,
        },
      })
      .then((res) => {
        setSellerData(res.data);
      });
  });

  const addInputs = () => {
    setOrangeTypesField([...showOrangeTypesField, 1]);
  };

  const setOrangeFields = (e) => {
    const { name, value } = e.target;
    setOrangeInputs({ ...orangeInputs, [name]: value });
  };

  const saveOrangeType = () => {
    setAllInputs([...allInputs, orangeInputs]);
  };

  const saveAllData = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:9000/profile", {
        username: props.user.username,
        image: "",
        orangeTypes: allInputs,
        description: description,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const appendData = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:9000/profile", {
        username: props.user.username,
        orangeTypes: allInputs,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showUpdateInputs = (type, rate) => {
    setUpdateInputs(!updateInputs);
    setOldValue({ type, rate });
  };

  const updateToNewValue = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:9000/profile/update", {
        username: props.user.username,
        type: oldValue.type,
        newValue: orangeInputs,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {sellerData ? (
        <>
          <h4 style={{ marginTop: "100px" }}>
            Description: {sellerData.Description}
          </h4>
          <Table striped bordered hover variant="dark" table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Rate rs/kg</th>
              </tr>
            </thead>
            <tbody>
              {sellerData.OrangeTypes.map((oranges) => {
                return (
                  <>
                    <tr>
                      <td>{oranges.type}</td>
                      <td>{oranges.rate}</td>
                      <td
                        style={{ color: "blue" }}
                        onClick={() =>
                          showUpdateInputs(oranges.type, oranges.rate)
                        }
                      >
                        <u>Edit Type or Rate</u>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </Table>
          {updateInputs ? (
            <Form style={{ width: "50%" }}>
              <Form.Group onChange={setOrangeFields}>
                <Form.Control
                  type="text"
                  id="name"
                  placeholder="name of the orange type"
                  name="type"
                />
                <Form.Control
                  type="text"
                  id="rate"
                  placeholder="rate per kg"
                  name="rate"
                />
              </Form.Group>
              <center>
                <Button
                  variant="success"
                  type="submit"
                  onClick={updateToNewValue}
                >
                  Update
                </Button>
              </center>
            </Form>
          ) : null}
          <Form style={{ width: "50%" }}>
            {showOrangeTypesField.map(() => {
              return (
                <>
                  <Form.Group onChange={setOrangeFields}>
                    <Form.Control
                      type="text"
                      id="name"
                      placeholder="name of the orange type"
                      name="type"
                    />
                    <Form.Control
                      type="text"
                      id="rate"
                      placeholder="rate per kg"
                      name="rate"
                    />
                  </Form.Group>

                  <center>
                    <Button variant="primary" onClick={saveOrangeType}>
                      Save Orange Type
                    </Button>
                  </center>
                  <br />
                  <br />
                </>
              );
            })}
            {showOrangeTypesField.length ? (
              <Button variant="primary" type="submit" onClick={appendData}>
                Submit
              </Button>
            ) : null}
          </Form>
          <center>
            <Button variant="primary" onClick={addInputs}>
              Add New Orange Types
            </Button>
          </center>
        </>
      ) : (
        <>
          <Form style={{ marginTop: "100px", width: "50%" }}>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            {showOrangeTypesField.map(() => {
              return (
                <>
                  <Form.Group onChange={setOrangeFields}>
                    <Form.Control
                      type="text"
                      id="name"
                      placeholder="name of the orange type"
                      name="type"
                    />
                    <Form.Control
                      type="text"
                      id="rate"
                      placeholder="rate per kg"
                      name="rate"
                    />
                  </Form.Group>
                  <center>
                    <Button variant="primary" onClick={saveOrangeType}>
                      Save Orange Type
                    </Button>
                  </center>
                  <br />
                  <br />
                </>
              );
            })}
            <Button variant="primary" type="submit" onClick={saveAllData}>
              Submit
            </Button>
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
