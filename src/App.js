import React, { Component } from "react";
import { Route, HashRouter } from "react-router-dom";
import AWS from "aws-sdk";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Dashboard from "./views/Dashboard";
import UserMessages from "./views/UserMessages";
import BotResponses from "./views/BotResponses";
import "./icons";
import "./App.css";
import dotenv from "dotenv";

dotenv.config();

class App extends Component {
  constructor() {
    super();

    this.awsConfig                 = AWS.config;
    this.awsConfig.accessKeyId     = process.env.REACT_APP_AWS_ACCESS_KEY;
    this.awsConfig.secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
    this.awsConfig.region          = process.env.REACT_APP_AWS_REGION;
  }

  render() {
    return (
      <HashRouter>
        <div className= "container-fluid px-0">
          <Header name="AUXILIUM" />
          <NavBar />
          <div className="row content">
            <Route exact path="/" component={Dashboard} />
            <Route path="/messages" component={UserMessages} />
            <Route path="/responses" component={BotResponses} />
          </div>
          <Footer />
        </div>
      </HashRouter>
    );
  }
}

export default App;
