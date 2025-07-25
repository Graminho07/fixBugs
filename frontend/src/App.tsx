import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./layouts/Register";
import Login from "./layouts/Login";
import Dashboard from "./layouts/Dashboard";
import CreateBug from "./layouts/CreateBug";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createBug" element={<CreateBug />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
