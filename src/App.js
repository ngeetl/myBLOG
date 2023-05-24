import './App.css';
import Layout from './pages/Layout';
import routes from './routes'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const route = routes.map(route => 
    <Route key={route.path} path={route.path} element={route.component} exact/>);

  return (
    <Router>
      <div className="App">
        <Layout />
        <Routes>
          {route}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
