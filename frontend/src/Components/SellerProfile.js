import { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

const ProfileComponent = (props) => {
  const [showDescriptionField, setShowDescriptionField] = useState(false);
  const [sellerData, setSellerData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:9000/profile", {
        username: props.user.username,
      })
      .then((data) => {
        setSellerData(data);
      });
  }, []);

  return <></>;
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const Profile = connect(mapStateToProps, null)(ProfileComponent);

export default Profile;
