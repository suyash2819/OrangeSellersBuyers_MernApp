import { Switch, Route } from "react-router-dom";
import UserSignIn from "./SiginIn";
import Home from "./Home";
import Register from "./Register";
import Profile from "./SellerProfile"

const Navigate = () => {
  return (
    <Switch>
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/signin" component={UserSignIn} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/" component={Home} />
    </Switch>
  );
};

export default Navigate;
