import styled from "@emotion/styled";
import {jwtDecode} from "jwt-decode"; // remove curly braces
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
  border-top: 7px solid green;
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
    background-color: green;
    cursor: pointer;
    color: white;
  }
`;

const BajarilganIshlar = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.userToken.token);
  const decodedToken = jwtDecode(token);
  const [data, setData] = useState([]);

  function handleNavigate(elId) {
    navigate(`/mahsulot/${elId}`);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://custom.uz/products/worker-orders/${decodedToken.user_id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        
        console.log(result); 
        setData(
          result.filter((order) => order.order && order.order.status === "SUCCESSFULLY")
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
              <h3>{el.order?.name}</h3>
              <p>{el?.order?.description}</p>
              <button
                onClick={() => {
                  handleNavigate(el.order.id);
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

export default BajarilganIshlar;
