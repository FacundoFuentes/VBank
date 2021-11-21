import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getUserInfo } from "../../redux/reducers/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Text, Input, Modal } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

const Container = styled.div`
  width: 70%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 150px;

  @media (max-width: 640px) {
  }
`;

export default function Profile() {
  //me traigo la info del usuario
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  const token = JSON.parse(localStorage.getItem("token")).data;

  console.log(token);

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data);
    axios
      .post("http://localhost:3001/user/updateInfo", data, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log(res);
        dispatch(getUserInfo());
      })
      .catch((err) => {
        if (err.response.data.data === "Unauthorized") {
          localStorage.removeItem("token");
          toast.error(`Session expired, you must sign in again`, {
            position: "top-right",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            onClose: () => (window.location.href = "http://localhost:3000/"),
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }
      });
  };

  return (
    <>
      <Container>
        <Input
          readOnly
          initialValue="Simon"
          bordered
          color="primary"
          style={{ width: "300px", textAlign: "center" }}
        />
        <Input
          readOnly
          initialValue="Simon"
          bordered
          color="primary"
          style={{ width: "300px", textAlign: "center" }}
        />
        <Input
          readOnly
          initialValue="Simon"
          bordered
          color="primary"
          style={{ width: "300px", textAlign: "center" }}
        />
        <Input
          readOnly
          initialValue="Simon"
          bordered
          color="primary"
          style={{ width: "300px", textAlign: "center" }}
        />
        <Input
          readOnly
          initialValue="Simon"
          bordered
          color="primary"
          style={{ width: "300px", textAlign: "center" }}
        />
        <Input
          readOnly
          initialValue="Simon"
          bordered
          color="primary"
          style={{ width: "300px", textAlign: "center" }}
        />
      </Container>
    </>
  );
}
