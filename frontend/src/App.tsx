import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./layouts/Register";
import Login from "./layouts/Login";
import Dashboard from "./layouts/Dashboard";
import CreateBug from "./layouts/CreateBug";
import PrivateRoute from "./routes/PrivateRoute";
import BugDetails from "./layouts/BugDetails";
import BugEditor from "./layouts/BugEditor";
import Bugs from "./layouts/Bugs";
import CreateTeam from "./layouts/CreateTeam";
import TeamDetails from "./layouts/TeamDetails";
import TeamEditor from "./layouts/TeamEditor";
import Teams from "./layouts/Teams";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<PrivateRoute> <Dashboard/> </PrivateRoute>} />
        <Route path="/createBug" element={<PrivateRoute> <CreateBug/> </PrivateRoute>} />
        <Route path="/bug/:bugId" element={<PrivateRoute> <BugDetails/> </PrivateRoute>} />
        <Route path="/bug/:bugId/edit" element={<PrivateRoute> <BugEditor/> </PrivateRoute>} />
        <Route path="/bugs" element={<PrivateRoute> <Bugs/> </PrivateRoute>} />
        <Route path="/createTeam" element={<PrivateRoute> <CreateTeam/> </PrivateRoute>} />
        <Route path="/team/:teamId" element={<PrivateRoute> <TeamDetails/> </PrivateRoute>} />
        <Route path="/team/:teamId/edit" element={<PrivateRoute> <TeamEditor/> </PrivateRoute>} />
        <Route path="/teams" element={<PrivateRoute> <Teams/> </PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
