import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

function ViewGuest() {
  const [guest, setGuest] = useState({});
  const { authentication } = useAuth();
  const { id } = useParams();

  const { firstName, lastName, birthdate, cityDto } = guest;

  const authAxios = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + authentication?.token,
    },
  });

  useEffect(() => {
    getGuest();
  }, []);

  const getGuest = async () => {
    try {
      const response = await authAxios.get(`/guests/${id}`);
      console.log(response.data);
      setGuest(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="contrainer">
      <div className="row">
        <div className="col-md-6  offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Guest details</h2>
          <div className="card">
            <div className="card-header">
              <ul className="list-group">
                <li className="list-group-item">
                  <b>Guest ID: </b>
                  {id}
                </li>
                <li className="list-group-item list-group-item-light">
                  <b>First name: </b>
                  {firstName}
                </li>
                <li className="list-group-item list-group-item-light">
                  <b>Last name: </b>
                  {lastName}
                </li>
                <li className="list-group-item list-group-item-light">
                  <b>Birthdate: </b>
                  {birthdate}
                </li>
                <li className="list-group-item list-group-item-light">
                  <b>City: </b>
                  {cityDto?.name}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-outline-primary my-2" to={"/viewGuests"}>
            Return to the guest list
          </Link>
          <Link
            className="btn btn-primary mx-2 my-2"
            to={`/editGuest/${guest.id}`}
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ViewGuest;
