import React, {Component} from 'react';
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

// import AddTutorial from "./components/add-tutorial.component";
// import TutorialsList from "./components/tutorials-list.component";

import AddProducts from "./components/add-products.component";
import ProductsList from "./components/products-list.component";
class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Home
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/tutorials"} className="nav-link">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <h2>React Typescript Firebase example</h2>
          <Routes>
            <Route path='/tutorials' element={<ProductsList/>} />
            <Route path='/add' element={<AddProducts/>} />
          </Routes>
        </div>
      </div>
    );

  }
}

export default App;
