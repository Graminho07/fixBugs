import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./layouts/Register";
import Login from "./layouts/Login";
import Dashboard from "./layouts/Dashboard";
import CreateBug from "./layouts/CreateBug";
import PrivateRoute from "./routes/PrivateRoute";
import BugDetails from "./layouts/Bug";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
        <Route path="/createBug" element={<PrivateRoute> <CreateBug /> </PrivateRoute>} />
        <Route path="/bug/:bugId" element={<PrivateRoute> <BugDetails /> </PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
