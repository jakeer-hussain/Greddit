import { useEffect } from "react";
import jwt_decode from "jwt-decode";

function Login({ onSuccess }) {

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "YOUR_GOOGLE_CLIENT_ID",
      callback: (response) => {
        const user = jwt_decode(response.credential);
        onSuccess(user); // send data to parent
      },
    });

    google.accounts.id.renderButton(
      document.getElementById("google-btn"),
      { theme: "outline", size: "large" }
    );
  }, [onSuccess]);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <div id="google-btn"></div>
    </div>
  );
}

export default Login;
