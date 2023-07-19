import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { Link } from "react-router-dom";

function ViewReservations() {
  const [reservations, setReservations] = useState([]);
  const [reservation, setReservation] = useState({
    dateFrom: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const { dateFrom } = reservation;
  const { authentication } = useAuth();
  const authAxios = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + authentication?.token,
    },
  });

  useEffect(() => {
    getReservations();
  }, []);

  const getReservations = async () => {
    try {
      const response = await authAxios.get("/reservations");
      setReservations(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteReservation = async (id) => {
    await authAxios.delete(`/reservations/${id}`);
    getReservations();
  };

  const onInputChange = (e) => {
    setReservation({ ...reservation, [e.target.name]: e.target.value });
    setSuccessful(false);
    console.log(reservation);
  };

  const onSubmit = async () => {
    if (!/^\d{2}-\d{2}-\d{4}$/.test(dateFrom)) {
      setErrorMessage("Date from must be in mentioned format");
      setSuccessful(true);
      return;
    }
    try {
      const response = await authAxios.get("/reservations/byDateFrom", {
        params: {
          dateFrom: dateFrom,
        },
      });
      setReservations(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const refresh = () => {
    getReservations();
    setReservation({ dateFrom: "" });
  };

  return (
    <div className="container">
      <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
        <h4 className="text-center m-3">Search reservations</h4>
        <div className="mb-3">
          <label htmlFor="dateFrom" className="form-label">
            Date from (e.g. 05-06-2023)
          </label>
          <input
            type="text"
            className="form-control"
            name="dateFrom"
            value={dateFrom}
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
              <th scope="col">Date from</th>
              <th scope="col">Date to</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>{reservation.dateFrom}</td>
                <td>{reservation.dateTo}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewReservation/${reservation.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editReservation/${reservation.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteReservation(reservation.id)}
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

export default ViewReservations;
