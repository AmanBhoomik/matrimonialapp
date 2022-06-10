import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./componants/Home";
import Login from "./componants/Login";
import Signup from "./componants/Signup";
import BasicProfile from "./componants/BasicProfile";
import ProfessionProfile from "./componants/ProfessionProfile";
import ProfiliList from "./componants/ProfiliList";
import ProfileDetails from "./componants/ProfileDetails";
import ShowUserData from "./componants/ShowUserData";
import AdminDasboard from "./componants/AdminDashboard"
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Admindashboard" element={<AdminDasboard />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/basic/:userId" element={<BasicProfile />} />
          <Route path="/professional/:userId" element={<ProfessionProfile />} />

          <Route path="/profilelist" element={<ProfiliList />} />

          <Route path="/profiledetails/:profileId" element={<ProfileDetails />} />
          <Route path="profiledetails/userdata/:userId" element={<ShowUserData />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
