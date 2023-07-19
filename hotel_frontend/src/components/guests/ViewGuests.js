import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

function ViewGuests() {
  const [guests, setGuests] = useState([]);
  const [guest, setGuest] = useState({
    firstName: "",
    lastName: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const { firstName, lastName } = guest;
  const { authentication } = useAuth();
  const authAxios = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + authentication?.token,
    },
  });

  useEffect(() => {
    getGuests();
  }, []);

  const getGuests = async () => {
    try {
      const response = await authAxios.get("/guests");
      setGuests(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteGuest = async (id) => {
    await authAxios.delete(`/guests/${id}`);
    getGuests();
  };

  const onInputChange = (e) => {
    setGuest({ ...guest, [e.target.name]: e.target.value });
    setSuccessful(false);
    console.log(guest);
  };

  const onSubmit = async () => {
    if (
      Number.isInteger(parseInt(firstName)) ||
      Number.isInteger(parseInt(lastName))
    ) {
      setErrorMessage("First and last name must be a string");
      setSuccessful(true);
      return;
    }
    if (
      !/^[A-Za-z]{2,15}$/.test(firstName) ||
      !/^[A-Za-z]{2,15}$/.test(lastName)
    ) {
      setErrorMessage("First and last name can have 2-15 letters");
      setSuccessful(true);
      return;
    }
    if (firstName.length >= 2 && lastName.length >= 2) {
      try {
        const response = await authAxios.get("/guests/byName", {
          params: {
            firstName: firstName,
            lastName: lastName,
          },
        });
        setGuests(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    } else {
      setErrorMessage(
        "First name and last name must be at least 2 letters long"
      );
      setSuccessful(true);
    }
  };

  const refresh = () => {
    getGuests();
    setGuest({ firstName: "", lastName: "" });
  };

  return (
    <div className="container">
      <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
        <h4 className="text-center m-3">Search guests</h4>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First name
          </label>
          <input
            type={"text"}
            className="form-control"
            name="firstName"
            value={firstName}
            onChange={(e) => onInputChange(e)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last name
          </label>
          <input
            type={"text"}
            className="form-control"
            name="lastName"
            value={lastName}
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
              <th scope="col">First name</th>
              <th scope="col">Last name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest) => (
              <tr key={guest.id}>
                <td>{guest.firstName}</td>
                <td>{guest.lastName}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewGuest/${guest.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editGuest/${guest.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteGuest(guest.id)}
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

export default ViewGuests;
