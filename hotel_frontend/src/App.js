import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Content from "./components/Content";
import RequireAuth from "./components/RequireAuth";
import AddGuest from "./components/guests/AddGuest";
import ViewGuests from "./components/guests/ViewGuests";
import ViewGuest from "./components/guests/ViewGuest";
import EditGuest from "./components/guests/EditGuest";
import AddRoom from "./components/rooms/AddRoom";
import ViewRooms from "./components/rooms/ViewRooms";
import ViewRoom from "./components/rooms/ViewRoom";
import EditRoom from "./components/rooms/EditRoom";
import AddReservation from "./components/reservations/AddReservation";
import ViewReservations from "./components/reservations/ViewReservations";
import ViewReservation from "./components/reservations/ViewReservation";
import EditReservation from "./components/reservations/EditReservation";
import RateRooms from "./components/rooms/RateRooms";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Content />}>
        {/* public */}
        <Route path="login" element={<Login />} />

        {/* to be protected */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />

          <Route path="/addGuest" element={<AddGuest />} />
          <Route path="/viewGuests" element={<ViewGuests />} />
          <Route path="/viewGuest/:id" element={<ViewGuest />} />
          <Route path="/editGuest/:id" element={<EditGuest />} />

          <Route path="/addRoom" element={<AddRoom />} />
          <Route path="/viewRooms" element={<ViewRooms />} />
          <Route path="/viewRoom/:id" element={<ViewRoom />} />
          <Route path="/editRoom/:id" element={<EditRoom />} />
          <Route path="/rateRooms" element={<RateRooms />} />

          <Route path="/addReservation" element={<AddReservation />} />
          <Route path="/viewReservations" element={<ViewReservations />} />
          <Route path="/viewReservation/:id" element={<ViewReservation />} />
          <Route path="/editReservation/:id" element={<EditReservation />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
