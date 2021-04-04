import { Switch, Route } from "react-router-dom";
import UserSignIn from "./SiginIn";
import Home from "./Home";
import Register from "./Register";

const Navigate = () => {
  return (
    <Switch>
      <Route exact path="/signin" component={UserSignIn} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/" component={Home} />
    </Switch>
  );
};

export default Navigate;
