import { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

const SellerInfo = (props) => {
  const [sellerData, setSellerData] = useState(null);
  const { seller_username } = props.location.state;

  useEffect(() => {
    axios
      .get("http://localhost:9000/profile", {
        params: {
          username: seller_username,
        },
      })
      .then((res) => {
        setSellerData(res.data);
      });
  }, []);
  return (
    <>
      {sellerData ? (
        <h4 style={{ marginTop: "100px" }}>
          Description: {sellerData.Description}
        </h4>
      ) : null}
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Type</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {sellerData
            ? sellerData.OrangeTypes.map((oranges) => {
                return (
                  <>
                    <tr>
                      <td>{oranges.type}</td>
                      <td>{oranges.rate}</td>
                    </tr>
                  </>
                );
              })
            : null}
        </tbody>
      </Table>
    </>
  );
};

export default SellerInfo;
