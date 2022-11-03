import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  const currentUser = true;

  return (
    <Router>
      <Topbar />

      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>

        <Route path="/posts">
          <Homepage />
        </Route>

        <Route path="/post/:postId">
          <Single />
        </Route>

        <Route path="/register">
          {currentUser ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/login">
          {currentUser ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/write">{currentUser ? <Write /> : <Login />}</Route>
        <Route path="/settings">{currentUser ? <Settings /> : <Login />}</Route>
      </Switch>
    </Router>
  );
}

export default App;
