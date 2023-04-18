import React, { useEffect, useState } from "react";
import { SERVER_BASE_URL, USER_ACTIVATION } from "../api/constants";
import { useParams } from "react-router-dom";
import axios from "axios";

const AccountActivationPage = () => {
  const { activation_token } = useParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(`${SERVER_BASE_URL}/${USER_ACTIVATION}`, {
            activation_token,
          })
          .then((res) => {
            const data = res.data;
            setMessage(data.message);
          })
          .catch((err) => {
            console.log(err.response.data.message);
            setMessage(err.response.data.message);
          });
      };
      sendRequest();
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {message.length === 0 ? <p> Loading ... </p> : <p> {message}</p>}
    </div>
  );
};

export default AccountActivationPage;
