import Contacts from "./components/contacts/Contacts";
import Header from "./components/layout/Header";
import Pages from "./components/pages/About";

import {HashRouter as Router, Switch, Route} from "react-router-dom";

import Provider from './context';


import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddContacts from "./components/contacts/AddContacts";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";
import EditContact from "./components/contacts/EditContact";

function App() {
  return (
    <Provider>
      <Router>
        <div className="App">
        <Header branding="Contact Manager" />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Contacts}></Route>
            <Route exact path="/contact/add" component={AddContacts}></Route>
            <Route exact path="/contact/edit/:id" component={EditContact}></Route>
            <Route exact path="/about" component={About}></Route>
            <Route component={NotFound}></Route>
          </Switch>
        </div>
      </div>
      </Router>
    </Provider>
  );
}

export default App;
