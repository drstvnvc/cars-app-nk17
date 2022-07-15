import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CarSearch from "./components/CarSearch";
import AddCar from "./pages/AddCar";
import AppCars from "./pages/AppCars";

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/cars">Cars</Link>
            </li>
            <li>
              <Link to="/add">Add new car</Link>
            </li>
            <li>
              <CarSearch />
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/cars">
            <AppCars />
          </Route>
          <Route exact path="/add">
            <AddCar />
          </Route>
          <Route exact path="/edit/:id">
            <AddCar />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
