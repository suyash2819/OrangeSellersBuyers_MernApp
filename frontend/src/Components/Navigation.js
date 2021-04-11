import { Switch, Route } from "react-router-dom";
import UserSignIn from "./SiginIn";
import Home from "./Home";
import Register from "./Register";
import Profile from "./SellerProfile";
import Buyerpage from "./BuyerFunctionality";
import SellerInfo from "./SellerInfo";

const Navigate = () => {
  return (
    <Switch>
      <Route exact path="/getsellers/:username" component={SellerInfo} />

      <Route exact path="/getsellers" component={Buyerpage} />
      <Route exact path="/profile/:username" component={Profile} />
      <Route exact path="/signin" component={UserSignIn} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/" component={Home} />
    </Switch>
  );
};

export default Navigate;
