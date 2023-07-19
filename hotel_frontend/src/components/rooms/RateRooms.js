import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

function RateRooms() {
  const [roomRating, setRoomRating] = useState({
    rating: "",
    guestDto: {},
    roomDto: {},
  });
  const { rating, guestDto, roomDto } = roomRating;
  const [errorMessage, setErrorMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [guests, setGuests] = useState([]);
  const [selectedGuestId, setSelectedGuestId] = useState("");
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const ratingRef = useRef();
  const { authentication } = useAuth();

  const authAxios = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + authentication?.token,
    },
  });

  useEffect(() => {
    ratingRef.current.focus();
    getGuests();
    getRooms();
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [rating]);

  const getGuests = async () => {
    try {
      const response = await authAxios.get("/guests");
      setGuests(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getRooms = async () => {
    try {
      const response = await authAxios.get("/rooms");
      setRooms(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const onInputChange = (e) => {
    setRoomRating({ ...roomRating, [e.target.name]: e.target.value });
    setSuccessful(false);
    console.log(roomRating);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      !/^\d$/.test(rating) ||
      roomDto == undefined ||
      guestDto == undefined ||
      Object.keys(guestDto).length === 0 ||
      Object.keys(roomDto).length === 0
    ) {
      setErrorMessage("Rating, guest and room must be entered");
      setSuccessful(true);
      return;
    }
    if (Number.parseInt(rating) < 1 || Number.parseInt(rating) > 5) {
      setErrorMessage("Rating must be between 1 and 5");
      setSuccessful(true);
      return;
    }
    try {
      setRoomRating((prevState) => ({
        ...prevState,
        rating: parseInt(rating),
      }));
      const response = await authAxios.post("/ratings", roomRating);
      console.log(response.data);
      navigate("/", { state: { from: location }, replace: true });
    } catch (err) {
      setErrorMessage("Rating not added");
      setSuccessful(true);
    }
  };

  const handleGuestChange = (e) => {
    const selectedGuest = guests.find((guest) => guest.id == e.target.value);
    setRoomRating((prevState) => ({
      ...prevState,
      guestDto: selectedGuest,
    }));
    setSelectedGuestId(e.target.value);
  };

  const handleRoomChange = (e) => {
    const selectedRoom = rooms.find((room) => room.id == e.target.value);
    setRoomRating((prevState) => ({
      ...prevState,
      roomDto: selectedRoom,
    }));
    setSelectedRoomId(e.target.value);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Rate rooms</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="rating" className="form-label">
                Rating (1-5)
              </label>
              <input
                ref={ratingRef}
                type="text"
                className="form-control"
                placeholder="Enter the rating"
                name="rating"
                value={rating}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="input-group mb-3">
              <label className="input-group-text" htmlFor="inputGroupSelect01">
                Guest
              </label>
              <select
                value={selectedGuestId}
                className="form-select"
                id="inputGroupSelect01"
                onChange={handleGuestChange}
              >
                <option value={""}>Select a guest</option>
                {guests.map((guest) => (
                  <option key={guest.id} value={guest.id}>
                    {guest.firstName} {guest.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group mb-3">
              <label className="input-group-text" htmlFor="inputGroupSelect02">
                Room number
              </label>
              <select
                value={selectedRoomId}
                className="form-select"
                id="inputGroupSelect02"
                onChange={handleRoomChange}
              >
                <option value={""}>Select a room</option>
                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.id}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              {successful ? (
                <p className="text-danger" aria-live="assertive">
                  {errorMessage}
                </p>
              ) : (
                <></>
              )}
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RateRooms;
