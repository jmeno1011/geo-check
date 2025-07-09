import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './hooks/useAuth';
import { auth } from './firebase';
import './App.css';

function App() {
  const { currentUser } = useAuth();

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <BrowserRouter>
      <nav>
        {currentUser ? (
          <>
            <Link to="/">Home</Link> | <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
