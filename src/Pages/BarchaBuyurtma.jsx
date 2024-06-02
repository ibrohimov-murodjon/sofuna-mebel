import styled from "@emotion/styled";
import { jwtDecode } from "jwt-decode";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Logo } from "../assets";

const Wrapper = styled.div`
  max-width: 1280px;
  padding: 10px;
  width: 100%;
  margin: 40px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 40px;
`;
const OrderCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 250px;
  padding: 5px;
  width: 80%;
  padding-top: 0px;
  border-top: 7px solid red;
  box-shadow: 0px 5px 10px black;
  background: #ffffff;
  img {
    width: 80px;
    margin-top: 15px;
    border-radius: 50%;
  }
  h3 {
    font-size: 26px;
    font-family: 900;
    font-family: sans-serif;
    margin-top: 5px;
    margin-bottom: 7px;
    height: 50px;
  }
  p {
    width: 90%;
    height: 60px;
    text-align: center;
  }
  button {
    margin: 7px;
    width: 100%;
    padding: 7px;
    background-color: red;
    cursor: pointer;
    color: white;
  }
`;

let a = "lorem sjj ks  sdskdskd sdks d skjd sk dsjdkskdsdsk";
const BarchaBuyurtma = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.userToken.token);
  const decodedToken = jwtDecode(token);
  const [data, setData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  function handleNavigate(elId) {
    navigate(`/allOrders/${elId}`);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://custom.uz/products/order/api/`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(
          result.filter((order) => order.status == "NO_ACTIVE")
        );
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, []);
  return (
    <Wrapper>
      {data.length > 0 &&
        data.map((el, index) => {
          return (
            <OrderCard key={index}>
              <img src={Logo} alt="" />
              <h3>{el.name}</h3>
              <p>{el.description}</p>
              <button
                onClick={() => {
                  handleNavigate(el.id);
                }}
              >
                Batafsil
              </button>
            </OrderCard>
          );
        })}
    </Wrapper>
  );
};

export default BarchaBuyurtma;
