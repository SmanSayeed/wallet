import React from "react";

function AuthLayout({ children }) {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">{children}</div>
      </div>
    </div>
  );
}

export default AuthLayout;
