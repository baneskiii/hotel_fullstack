import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function ViewReservation() {
  const [reservation, setReservation] = useState({});
  const [reservationItems, setReservationItems] = useState([]);
  const { authentication } = useAuth();
  const { id } = useParams();

  const { dateFrom, dateTo, guestDto } = reservation;

  const authAxios = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + authentication?.token,
    },
  });

  useEffect(() => {
    getReservation();
    getReservationItems();
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
      console.log(response.data);
      setReservationItems(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Reservation details</h2>
          <div className="card">
            <div className="card-header">
              <ul className="list-group">
                <li className="list-group-item">
                  <b>Reservation ID: </b>
                  {id}
                </li>
                <li className="list-group-item list-group-item-light">
                  <b>Date from: </b>
                  {dateFrom}
                </li>
                <li className="list-group-item list-group-item-light">
                  <b>Date to: </b>
                  {dateTo}
                </li>
                <li className="list-group-item list-group-item-light">
                  <b>Client: </b>
                  {guestDto?.firstName} {guestDto?.lastName}
                </li>
              </ul>
            </div>
          </div>
          <div className="py-4">
            <table className="table border shadow">
              <thead>
                <tr>
                  <th scope="col">Item number</th>
                  <th scope="col">Guest</th>
                  <th scope="col">Room number</th>
                </tr>
              </thead>
              <tbody>
                {reservationItems.map((item) => (
                  <tr key={item.itemNumber}>
                    <td>{item.itemNumber}</td>
                    <td>
                      {item.guestDto?.firstName} {item.guestDto?.lastName}
                    </td>
                    <td>{item.roomDto?.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link
            className="btn btn-outline-primary my-2"
            to={"/viewReservations"}
          >
            Return to the reservation list
          </Link>
          <Link
            className="btn btn-primary mx-2 my-2"
            to={`/editReservation/${reservation.id}`}
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ViewReservation;
