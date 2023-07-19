import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Navbar() {
  const { authentication, setAuthentication } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const logout = async () => {
    setAuthentication({});
    navigate(from, { replace: true });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>
            Hotel
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Guests
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/addGuest"}>
                      Add guest
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={"/viewGuests"}>
                      View guests
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Rooms
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/addRoom"}>
                      Add room
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={"/viewRooms"}>
                      View rooms
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={"/rateRooms"}>
                      Rate rooms
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Reservations
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/addReservation"}>
                      Add reservations
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={"/viewReservations"}>
                      View reservations
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            {authentication.token ? (
              <>
                <li className="nav-item d-flex">User: {authentication.name}</li>
                <li className="nav-item d-flex">
                  <button
                    style={{ color: "red" }}
                    onClick={logout}
                    className="btn"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
