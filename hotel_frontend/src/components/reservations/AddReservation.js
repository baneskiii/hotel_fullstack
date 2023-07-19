import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

function AddReservation() {
  const [reservation, setReservation] = useState({
    dateFrom: "",
    dateTo: "",
    guestDto: {},
    reservationItemsDtos: [],
  });
  const [reservationItem, setReservationItem] = useState({
    itemNumber: 1,
    guestDto: {},
    roomDto: {},
  });
  const { dateFrom, dateTo, reservationItemsDtos } = reservation;
  const [errorMessage, setErrorMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [errorMessageItem, setErrorMessageItem] = useState("");
  const [successfulItem, setSuccessfulItem] = useState(false);
  const [guests, setGuests] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState("");
  const [selectedGuestId, setSelectedGuestId] = useState("");
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const dateFromRef = useRef();
  const { authentication } = useAuth();

  const authAxios = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + authentication?.token,
    },
  });

  useEffect(() => {
    dateFromRef.current.focus();
    getGuests();
    getRooms();
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [dateFrom]);

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
      const result = response.data.filter((room) => room.status == false);
      setRooms(result);
    } catch (err) {
      console.log(err);
    }
  };

  const onInputChange = (e) => {
    setReservation({ ...reservation, [e.target.name]: e.target.value });
    setSuccessful(false);
    console.log(reservation);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      !(typeof dateFrom === "string") ||
      !(typeof dateTo === "string") ||
      reservation.guestDto == undefined ||
      Object.keys(reservation.guestDto).length === 0 ||
      reservation.reservationItemsDtos.length === 0
    ) {
      setErrorMessage(
        "Date from and date to must be a string, client must be selected and items list cannot be empty"
      );
      setSuccessful(true);
      return;
    }
    if (
      !/^\d{2}-\d{2}-\d{4}$/.test(dateFrom) ||
      !/^\d{2}-\d{2}-\d{4}$/.test(dateTo)
    ) {
      setErrorMessage("Date from and date to must be in a mentioned format");
      setSuccessful(true);
      return;
    }

    ////////////////////////////////
    try {
      const response = await authAxios.post("/reservations", reservation);
      console.log(response?.data);
      navigate("/", { state: { from: location }, replace: true });
    } catch (err) {
      console.log(err);
      setErrorMessage("Reservation not added");
      setSuccessful(true);
    }
  };

  const handleClientChange = (e) => {
    const selectedClient = guests.find((guest) => guest.id == e.target.value);
    setReservation((prevState) => ({
      ...prevState,
      guestDto: selectedClient,
    }));
    setSelectedClientId(e.target.value);
  };

  const handleGuestChange = (e) => {
    const selectedGuest = guests.find((guest) => guest.id == e.target.value);
    setReservationItem((prevState) => ({
      ...prevState,
      guestDto: selectedGuest,
    }));
    setSelectedGuestId(e.target.value);
    setSuccessfulItem(false);
    setErrorMessageItem("");
  };

  const handleRoomChange = (e) => {
    const selectedRoom = rooms.find((room) => room.id == e.target.value);
    setReservationItem((prevState) => ({
      ...prevState,
      roomDto: selectedRoom,
    }));
    setSelectedRoomId(e.target.value);
    setSuccessfulItem(false);
    setErrorMessageItem("");
  };

  const onSubmitItem = async (e) => {
    e.preventDefault();
    if (
      reservationItem.guestDto == undefined ||
      reservationItem.roomDto == undefined ||
      Object.keys(reservationItem.guestDto).length === 0 ||
      Object.keys(reservationItem.roomDto).length === 0
    ) {
      setSuccessfulItem(true);
      setErrorMessageItem("Guest and room must be picked");
      return;
    }
    /////////////////////////////////////
    if (reservationItemsDtos.length == 0) {
      reservationItemsDtos.push(reservationItem);
    } else {
      const items = [...reservation.reservationItemsDtos];
      let present = false;
      for (let i = 0; i < items.length; i++) {
        const guest = items[i].guestDto;
        if (guest.id == reservationItem.guestDto.id) {
          present = true;
        }
      }
      if (present == true) {
        setSuccessfulItem(true);
        setErrorMessageItem("Guest already added");
        return;
      } else {
        reservationItemsDtos.push(reservationItem);
      }
    }
    setSuccessful(false);
    setErrorMessage("");
    setItemNumber();
  };

  const deleteItem = (index) => {
    const copy = [...reservation.reservationItemsDtos];
    console.log(index);
    copy.splice(index, 1);
    setReservation({
      dateFrom: dateFrom,
      dateTo: dateTo,
      guestDto: reservation.guestDto,
      reservationItemsDtos: copy,
    });
    setSuccessfulItem(false);
    setErrorMessageItem("");
  };

  const setItemNumber = () => {
    const copy = [...reservation.reservationItemsDtos];
    if (copy.length == 0) {
      return;
    }
    for (let i = 0; i < copy.length; i++) {
      const item = copy[i];
      item.itemNumber = i + 1;
    }

    setReservation({
      dateFrom: dateFrom,
      dateTo: dateTo,
      guestDto: reservation.guestDto,
      reservationItemsDtos: copy,
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2 border rounded p-4 mt-2 shadow">
          <h4 className="text-center m-4">Add new reservation</h4>
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home-tab-pane"
                type="button"
                role="tab"
                aria-controls="home-tab-pane"
                aria-selected="true"
              >
                Reservation
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile-tab-pane"
                type="button"
                role="tab"
                aria-controls="profile-tab-pane"
                aria-selected="false"
              >
                Item
              </button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home-tab-pane"
              role="tabpanel"
              aria-labelledby="home-tab"
              tabIndex="0"
            >
              <br />
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                  <label htmlFor="dateFrom" className="form-label">
                    Date from (e.g. 05-06-2023)
                  </label>
                  <input
                    ref={dateFromRef}
                    type="text"
                    className="form-control"
                    placeholder="Enter date from"
                    name="dateFrom"
                    value={dateFrom}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="dateTo" className="form-label">
                    Date to (e.g. 10-06-2023)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter date to"
                    name="dateTo"
                    value={dateTo}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="input-group mb-3">
                  <label
                    className="input-group-text"
                    htmlFor="inputGroupSelect01"
                  >
                    Client
                  </label>
                  <select
                    value={selectedClientId}
                    className="form-select"
                    id="inputGroupSelect01"
                    onChange={handleClientChange}
                  >
                    <option value={""}>Select a client</option>
                    {guests.map((guest) => (
                      <option key={guest.id} value={guest.id}>
                        {guest.firstName} {guest.lastName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="py-4">
                  <table className="table border shadow">
                    <thead>
                      <tr>
                        <th scope="col">Item number</th>
                        <th scope="col">Guest</th>
                        <th scope="col">Room number</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {reservationItemsDtos.map((item, i) => (
                        <tr key={item.itemNumber}>
                          <td>{item.itemNumber}</td>
                          <td>
                            {item.guestDto?.firstName} {item.guestDto?.lastName}
                          </td>
                          <td>{item.roomDto?.id}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-danger mx-2"
                              onClick={() => deleteItem(i)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
            <div
              className="tab-pane fade"
              id="profile-tab-pane"
              role="tabpanel"
              aria-labelledby="profile-tab"
              tabIndex="0"
            >
              <br />
              <form onSubmit={(e) => onSubmitItem(e)}>
                <div className="input-group mb-3">
                  <label
                    className="input-group-text"
                    htmlFor="inputGroupSelect01"
                  >
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
                  <label
                    className="input-group-text"
                    htmlFor="inputGroupSelect01"
                  >
                    Room
                  </label>
                  <select
                    value={selectedRoomId}
                    className="form-select"
                    id="inputGroupSelect01"
                    onChange={handleRoomChange}
                  >
                    <option value={""}>Select a room</option>
                    {rooms.map((room) => (
                      <option key={room.id} value={room.id}>
                        Room number {room.id}, {room.roomTypeDto?.beds} beds
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  {successfulItem ? (
                    <p className="text-danger" aria-live="assertive">
                      {errorMessageItem}
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
                <button type="submit" className="btn btn-outline-primary">
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddReservation;
