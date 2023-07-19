import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

function EditReservation() {
  const [reservationItems, setReservationItems] = useState([]);
  const [reservation, setReservation] = useState({
    dateFrom: "",
    dateTo: "",
    guestDto: {},
    reservationItemsDtos: [],
  });

  const [reservationItem, setReservationItem] = useState({
    index: "",
    itemNumber: "",
    guestDto: {},
    roomDto: {},
  });
  const [guests, setGuests] = useState([]);
  const [rooms, setRooms] = useState([]);
  const { id } = useParams();
  const { authentication } = useAuth();
  const [successful, setSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successfulItem, setSuccessfulItem] = useState(false);
  const [errorMessageItem, setErrorMessageItem] = useState("");
  const [selectedClientId, setSelectedClientId] = useState("");
  const [selectedGuestId, setSelectedGuestId] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const dateFromRef = useRef();

  const { dateFrom, dateTo, guestDto, reservationItemsDtos } = reservation;

  const authAxios = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + authentication?.token,
    },
  });

  useEffect(() => {
    getReservation();
    getGuests();
    getRooms();
    dateFromRef.current.focus();
  }, []);

  const getReservation = async () => {
    try {
      const response = await authAxios.get(`/reservations/${id}`);
      console.log(response.data);
      setReservation(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getReservationItems = async () => {
    try {
      const response = await authAxios.get(`/reservationItems/${id}`);
      setReservationItems(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getGuests = async () => {
    try {
      const response = await authAxios.get("/guests");
      console.log(response.data);
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
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  const onInputChange = (e) => {
    setReservation({ ...reservation, [e.target.name]: e.target.value });
    console.log(reservation);
    setSuccessful(false);
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
    try {
      const response = await authAxios.put(`/reservations/${id}`, reservation);
      console.log(response.data);
      navigate("/", { state: { from: location }, replace: true });
    } catch (err) {
      console.log(err);
      setSuccessful(true);
      setErrorMessage("Reservation not updated");
    }
  };

  const handleClientChange = (e) => {
    const selectedClient = guests.find((guest) => guest.id == e.target.value);
    setReservation((prevState) => ({
      ...prevState,
      guestDto: selectedClient,
    }));
  };

  const handleGuestChange = (e) => {
    const selectedGuest = guests.find((guest) => guest.id == e.target.value);
    setReservationItem((prevState) => ({
      ...prevState,
      guestDto: selectedGuest,
    }));
    setSuccessfulItem(false);
    setErrorMessageItem("");
  };

  const handleRoomChange = (e) => {
    const selectedRoom = rooms.find((room) => room.id == e.target.value);
    setReservationItem((prevState) => ({
      ...prevState,
      roomDto: selectedRoom,
    }));
    setSuccessfulItem(false);
    setErrorMessageItem("");
  };

  const onSubmitItem = (e) => {
    e.preventDefault();
    const items = [...reservation.reservationItemsDtos];
    let present = false;
    const guest = items[reservationItem.index].guestDto;
    const room = items[reservationItem.index].roomDto;
    if (guest.id == reservationItem.guestDto.id) {
      present = true;
    }
    for (let i = 0; i < items.length; i++) {
      const guest = items[i].guestDto;
      if (guest.id == reservationItem.guestDto.id) {
        present = true;
      }
    }
    if (present == true && room.id == reservationItem.roomDto.id) {
      setSuccessfulItem(true);
      setErrorMessageItem("Guest already exists");
      return;
    }
    const result = reservationItemsDtos.map((item, i) => {
      if (i == reservationItem.index) {
        const updatedGuest = reservationItem.guestDto;
        const updatedRoom = reservationItem.roomDto;
        return {
          ...item,
          guestDto: updatedGuest,
          roomDto: updatedRoom,
        };
      }
      return item;
    });
    setReservation({
      dateFrom: dateFrom,
      dateTo: dateTo,
      guestDto: guestDto,
      reservationItemsDtos: result,
    });
  };

  const editItem = (index) => {
    setReservationItem((prevState) => ({
      ...prevState,
      index: index,
      guestDto: reservationItemsDtos[index].guestDto,
      roomDto: reservationItemsDtos[index].roomDto,
    }));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2 border rounded p-4 mt-2 shadow">
          <h4 className="text-center m-4">Edit reservation</h4>
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
                    value={guestDto?.id}
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
                              className="btn btn-primary mx-2"
                              onClick={() => editItem(i)}
                            >
                              Edit
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
                    value={reservationItem.guestDto?.id}
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
                    value={reservationItem.roomDto?.id}
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
                  Edit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditReservation;
