import {HashRouter as Router, Route, Switch} from "react-router-dom";
import './App.scss';
import {HomePage} from "./pages/Homepage";
import {HTMLGenerator} from "./pages/HTMLGenerator";
import {PresentationGenerator} from "./pages/PresentationGenerator";
import {Navigator} from "./pages/Navigator";


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/html-generator">
            <HTMLGenerator />
          </Route>
          <Route path="/presentation-generator" >
            <PresentationGenerator />
          </Route>
          <Route path="/navigator/:name" component={(props) => (<Navigator presentationName={props.match.params.name} />)} />
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
