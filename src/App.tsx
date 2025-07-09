import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './hooks/useAuth';
import { auth } from './firebase';

function App() {
  const { currentUser } = useAuth();

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">GeoCheck</Link>
            <div>
              {currentUser ? (
                <button 
                  onClick={handleLogout}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                  Logout
                </button>
              ) : (
                <Link 
                  to="/login"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                  Login
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              <Route index element={<Home />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
