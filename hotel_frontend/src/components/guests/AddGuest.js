import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

function AddGuest() {
  const [guest, setGuest] = useState({
    firstName: "",
    lastName: "",
    birthdate: "",
    cityDto: {},
  });

  const { firstName, lastName, birthdate } = guest;
  const [errorMessage, setErrorMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [cities, setCities] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const firstNameRef = useRef();
  const { authentication } = useAuth();

  useEffect(() => {
    firstNameRef.current.focus();
    getCities();
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [firstName]);

  const getCities = async () => {
    try {
      const response = await authAxios.get("/cities");
      setCities(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const onInputChange = (e) => {
    setGuest({ ...guest, [e.target.name]: e.target.value });
    setSuccessful(false);
    console.log(guest);
  };

  const authAxios = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + authentication?.token,
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      !(typeof firstName === "string") ||
      !(typeof lastName === "string") ||
      !(typeof birthdate === "string") ||
      guest.cityDto == undefined ||
      Object.keys(guest.cityDto).length === 0
    ) {
      setErrorMessage(
        "First name, last name, birthdate must be a string and a city must be selected"
      );
      setSuccessful(true);
      return;
    }
    if (firstName.length < 2 || lastName.length < 2) {
      setErrorMessage("First and last name must have at least 2 letters");
      setSuccessful(true);
      return;
    }
    if (
      !/^[A-Za-z]{2,15}$/.test(firstName) ||
      !/^[A-Za-z]{2,15}$/.test(lastName)
    ) {
      setErrorMessage("First and last name must have 2-15 letters");
      setSuccessful(true);
      return;
    }
    if (!/^\d{2}-\d{2}-\d{4}$/.test(birthdate)) {
      setErrorMessage("Birthdate must be in a mentioned format");
      setSuccessful(true);
      return;
    }
    console.log(authentication?.token);
    try {
      const response = await authAxios.post("/guests", guest);
      console.log(response?.data);
      navigate("/", { state: { from: location }, replace: true });
    } catch (err) {
      console.error(err);
      setErrorMessage("Guest not added");
      setSuccessful(true);
    }
  };

  const handleCityChange = (e) => {
    const selectedCity = cities.find((city) => city.id == e.target.value);
    setGuest((prevState) => ({
      ...prevState,
      cityDto: selectedCity,
    }));
    setSelectedCityId(e.target.value);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add new guest</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First name
              </label>
              <input
                ref={firstNameRef}
                type={"text"}
                className="form-control"
                placeholder="Enter the first name"
                name="firstName"
                value={firstName}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your last name"
                name="lastName"
                value={lastName}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="birthdate" className="form-label">
                Birthdate (e.g. 05-06-2023)
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your birthdate"
                name="birthdate"
                value={birthdate}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="input-group mb-3">
              <label className="input-group-text" htmlFor="inputGroupSelect01">
                City
              </label>
              <select
                value={selectedCityId}
                className="form-select"
                id="inputGroupSelect01"
                onChange={handleCityChange}
              >
                <option value={""}>Select a city</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
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

export default AddGuest;
