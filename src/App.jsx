import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoadingPage from './global-pages/LoadingPage.jsx';
import ErrorPage from './global-pages/ErrorPage.jsx';
import Home from './pages/Home.jsx';
import Cars from './pages/Cars.jsx';
import CarDetails from './pages/CarDetails.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Compare from './pages/Compare.jsx';
import About from './pages/About.jsx';
import Profile from './pages/Profile.jsx';
import NotFound from './pages/NotFound.jsx';
import MainLayout from './layouts/MainLayout.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Loading page - initial route */}
        <Route path="/" element={<LoadingPage />} />

        {/* Main application routes */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/cars/:carId" element={<CarDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Global error page */}
        <Route path="/error" element={<ErrorPage />} />

        {/* Redirect root to home after loading */}
        <Route path="/app" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;