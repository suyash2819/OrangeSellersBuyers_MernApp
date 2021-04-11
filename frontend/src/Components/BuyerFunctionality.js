import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const Buyerpage = () => {
  const [sellerData, setSellerData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/getsellers")
      .then((res) => {
        console.log(res.data);
        setSellerData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Table
        striped
        bordered
        hover
        variant="dark"
        style={{ marginTop: "100px" }}
      >
        <thead>
          <tr>
            <th>Username</th>
            <th>Email Id</th>
          </tr>
        </thead>
        <tbody>
          {sellerData
            ? sellerData.map((seller) => {
                return (
                  <>
                    <tr>
                      <td>{seller.username}</td>
                      <td>{seller.email}</td>
                      <td>
                        <Link
                          className="nav-link"
                          to={{
                            pathname: `/getsellers/${seller.username}`,
                            state: {
                              seller_username: seller.username,
                            },
                          }}
                        >
                          Go To Profile
                        </Link>
                      </td>
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

export default Buyerpage;
