import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Quotes from "./components/pages/Quotes";
import Stocks from "./components/pages/Stocks";
import StockHistory from "./components/pages/StockHistory";
import SignUp from "./components/pages/SignUp";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/quotes" component={Quotes} />
          <Route path="/stocks" component={Stocks} />
          <Route path="/stockhistory" component={StockHistory} />
          <Route path="/sign-up" component={SignUp} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
