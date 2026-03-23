import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import LeadDetail from './pages/LeadDetail';
import Followups from './pages/Followups';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector } from 'react-redux';
import PageWrapper from './components/PageWrapper';

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  return user ? children : <Navigate to='/login' />;
};

const Layout = ({ children }) => {
  return (
    <div className='flex h-screen overflow-hidden bg-bgBase'>
      <Sidebar />
      <div className='flex flex-col flex-1 overflow-hidden relative'>
        <Topbar />
        <main className='flex-1 overflow-x-hidden overflow-y-auto p-6 relative'>
          {children}
        </main>
      </div>
    </div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path='/login' element={<PageWrapper><Login /></PageWrapper>} />
        <Route path='/register' element={<PageWrapper><Register /></PageWrapper>} />
        
        <Route path='/' element={
          <PrivateRoute>
            <Layout><PageWrapper><Dashboard /></PageWrapper></Layout>
          </PrivateRoute>
        } />
        <Route path='/leads' element={
          <PrivateRoute>
            <Layout><PageWrapper><Leads /></PageWrapper></Layout>
          </PrivateRoute>
        } />
        <Route path='/leads/:id' element={
          <PrivateRoute>
            <Layout><PageWrapper><LeadDetail /></PageWrapper></Layout>
          </PrivateRoute>
        } />
        <Route path='/followups' element={
          <PrivateRoute>
            <Layout><PageWrapper><Followups /></PageWrapper></Layout>
          </PrivateRoute>
        } />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;

