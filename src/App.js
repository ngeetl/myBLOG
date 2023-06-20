import './App.css';
import useToast from './Hooks/toast';
import Toast from './componets/Toast';
import Layout from './pages/Layout';
import routes from './routes'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useSelector } from 'react-redux';

function App() {
  const { removeToast } = useToast();
  const toasts = useSelector((state) => state.toast.toasts)

  const route = routes.map(route => {
    return (
      <Route key={route.path} path={route.path} element={route.component} exact />
    )
  });

  return (
    <Router>
      <div className="App">
        <Layout />
        <Toast toasts={toasts} removeToast={removeToast}/>
        <Routes>
          {route}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
