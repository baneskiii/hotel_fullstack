import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function ViewRoom() {
  const [room, setRoom] = useState({});
  const { authentication } = useAuth();
  const { id } = useParams();

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

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Room details</h2>
          <div className="card">
            <div className="card-header">
              <ul className="list-group">
                <li className="list-group-item">
                  <b>Room number: </b>
                  {id}
                </li>
                <li className="list-group-item list-group-item-light">
                  <b>Floor: </b>
                  {floor}
                </li>
                <li className="list-group-item list-group-item-light">
                  <b>Status: </b>
                  {status ? "Occupied" : "Available"}
                </li>
                <li className="list-group-item list-group-item-light">
                  <b>Room type: </b>
                  {roomTypeDto?.area}m^2, {roomTypeDto?.beds} beds
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-outline-primary my-2" to={"/viewRooms"}>
            Return to the room list
          </Link>
          <Link
            className="btn btn-primary mx-2 my-2"
            to={`/editRoom/${room.id}`}
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ViewRoom;
