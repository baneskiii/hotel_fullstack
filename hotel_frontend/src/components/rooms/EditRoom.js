import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function EditRoom() {
  const [room, setRoom] = useState({
    floor: "",
    status: false,
    roomTypeDto: {},
  });
  const [roomTypes, setRoomTypes] = useState([]);
  const { id } = useParams();
  const { authentication } = useAuth();
  const [successful, setSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const floorRef = useRef();

  const { floor, status, roomTypeDto } = room;

  const authAxios = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + authentication?.token,
    },
  });
  useEffect(() => {
    getRoom();
    getRoomTypes();
    floorRef.current.focus();
  }, []);

  const getRoom = async () => {
    try {
      const response = await authAxios.get(`/rooms/${id}`);
      console.log(response.data);
      setRoom(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getRoomTypes = async () => {
    try {
      const response = await authAxios.get("/roomTypes");
      console.log(response.data);
      setRoomTypes(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const onInputChange = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
    console.log(room);
    setSuccessful(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      floor.length == 0 ||
      roomTypeDto === undefined ||
      Object.keys(roomTypeDto).length === 0
    ) {
      setErrorMessage("Floor and room type must be selected");
      setSuccessful(true);
      return;
    }
    if (!Number.isInteger(parseInt(floor))) {
      setErrorMessage("Floor value must be a number");
      setSuccessful(true);
      return;
    }
    if (parseInt(floor) < 0) {
      setErrorMessage("Floor value must a 0 or a positive number");
      setSuccessful(true);
      return;
    }
    try {
      setRoom({
        floor: parseInt(floor),
        status: status,
        roomTypeDto: roomTypeDto,
      });
      const response = await authAxios.put(`/rooms/${id}`, room);
      console.log(response.data);
      navigate("/", { state: { from: location }, replace: true });
    } catch (err) {
      console.log(err);
      setSuccessful(true);
      setErrorMessage("Room not updated");
    }
  };

  const handleRoomTypeChange = (e) => {
    const selectedRoomType = roomTypes.find(
      (roomType) => roomType.id == e.target.value
    );
    setRoom((prevState) => ({
      ...prevState,
      roomTypeDto: selectedRoomType,
    }));
  };
  const handleCheckboxChange = () => {
    setRoom((prevState) => ({
      ...prevState,
      status: !prevState.status,
    }));
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit room</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="floor" className="form-label">
                Floor
              </label>
              <input
                ref={floorRef}
                type="text"
                className="form-control"
                placeholder="Enter the room floor"
                name="floor"
                value={floor}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3 col-md-3 form-check">
              <input
                type="checkbox"
                checked={status}
                onChange={handleCheckboxChange}
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Occupied
              </label>
            </div>
            <div className="input-group mb-3">
              <label className="input-group-text" htmlFor="inputGroupSelect01">
                Room type (area, beds)
              </label>
              <select
                value={roomTypeDto?.id}
                className="form-select"
                id="inputGroupSelect01"
                onChange={handleRoomTypeChange}
              >
                <option value={""}>Select a room type</option>
                {roomTypes.map((roomType) => (
                  <option key={roomType.id} value={roomType.id}>
                    {roomType.area}m^2, {roomType.beds} beds
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
            <Link className="btn btn-outline-danger mx-2" to="/viewRooms">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditRoom;
