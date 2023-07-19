import React from "react";

function Footer() {
  return (
    <div>
      <footer
        className="text-center text-white fixed-bottom"
        style={{ backgroundColor: "#21081a" }}
      >
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(39, 191, 245, 0.8)" }}
        >
          © 2023 Copyright
        </div>
      </footer>
    </div>
  );
}

export default Footer;
