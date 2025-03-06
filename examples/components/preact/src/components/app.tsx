import { render } from "preact";
import { LocationProvider, Router, Route } from "preact-iso";
import Header from "./header";
import Home from "../routes/home";
import Profile from "../routes/profile";

export default function App() {
  return (
    <LocationProvider>
    <div id="app">
      <Header />
      <main>
        <Router>
          <Route path="/" component={Home} />
          <Route path="/profile" component={() => <Profile user="me" />} />
          <Route path="/profile/:user" component={Profile} />
        </Router>
      </main>
    </div>
    </LocationProvider>
  );
}

render(<App />, document.getElementById('app'));
