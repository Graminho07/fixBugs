import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './layouts/Register';
import Login from './layouts/Login';
import Dashboard from './layouts/Dashboard';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute><Register /></PrivateRoute>} />
        <Route path="/login" element={<PrivateRoute><Login /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
