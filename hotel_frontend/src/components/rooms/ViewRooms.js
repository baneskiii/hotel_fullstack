import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

function ViewRooms() {
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState({
    floor: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const { id, floor } = room;
  const { authentication } = useAuth();
  const authAxios = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + authentication?.token,
    },
  });

  useEffect(() => {
    getRooms();
  }, []);

  const getRooms = async () => {
    try {
      const response = await authAxios.get("/rooms");
      setRooms(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteRoom = async (id) => {
    await authAxios.delete(`/rooms/${id}`);
    getRooms();
  };

  const onInputChange = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
    setSuccessful(false);
    console.log(room);
  };

  const onSubmit = async () => {
    setRoom({ floor: parseInt(floor) });
    if (floor >= 0) {
      try {
        const response = await authAxios.get("/rooms/byFloor", {
          params: {
            floor: floor,
          },
        });
        setRooms(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
        setRoom({ floor: "" });
        setErrorMessage("You must input the floor value");
        setSuccessful(true);
      }
    } else {
      setErrorMessage("Inputed value must a 0 or a positive number");
      setSuccessful(true);
    }
  };
  const refresh = () => {
    getRooms();
    setRoom({ floor: "" });
  };
  return (
    <div className="container">
      <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
        <h4 className="text-center m-3">Search rooms</h4>
        <div className="mb-3">
          <label htmlFor="floor" className="form-label">
            Floor
          </label>
          <input
            type="text"
            className="form-control"
            name="floor"
            value={floor}
            onChange={(e) => onInputChange(e)}
            required
          />
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
        <button onClick={onSubmit} className="btn btn-primary mx-2">
          Search
        </button>
        <button onClick={refresh} className="btn btn-outline-primary mx-2">
          Clear
        </button>
      </div>
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">Room number</th>
              <th scope="col">Floor</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td>{room.id}</td>
                <td>{room.floor}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewRoom/${room.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editRoom/${room.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteRoom(room.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewRooms;
