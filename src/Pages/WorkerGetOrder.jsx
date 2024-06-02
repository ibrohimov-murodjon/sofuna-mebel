import styled from "@emotion/styled";
import { jwtDecode } from "jwt-decode";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Wrapper = styled.div`
  max-width: 768px;
  width: 90%;
  padding: 10px;
  margin: 10px auto;
  background-color: white;
`;

const WorkerGetOrder = () => {
  const token = useSelector((state) => state.userToken.token);
  const decodedToken = jwtDecode(token);
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://custom.uz/products/order/api/${id}/`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);
  function addOrder(productId) {
    const messageData = {
      sender: decodedToken.user_id,
      worker: decodedToken.user_id,
      order: productId,
      text: "hayr",
    };
    fetch("https://custom.uz/products/message/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error sending message:", error));
    const edited = { status: "ONE_PENDING" };
    fetch(`https://custom.uz/products/order/api/${productId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(edited),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        toast.success("Buyurtma qo'shildi")
        navigate('/')
      })
      .catch((error) => console.error("Error sending message:", error));
  }
  return (
    <Wrapper>
      <div>
        <h3 className="text-2xl text-gray-600">Maxsulot nomi: </h3>
        <h2 className="border border-gray-400 mt-2 p-2 rounded-md text-3xl text-black ">
          {product.name}
        </h2>
      
        <h3 className="text-2xl text-gray-600">Buyurtma soni: </h3>
        <h2 className="border border-gray-400 mt-2 p-2 rounded-md text-3xl text-black ">
          {product.qty}
        </h2>
        <h3 className="text-2xl text-gray-600">O&apos;lchov birligi: </h3>
        <h2 className="border border-gray-400 mt-2 p-2 rounded-md  text-black text-3xl">
          {product.measurement}
        </h2>
        <h3 className="text-2xl text-gray-600">Qo&apos;shimcha</h3>
        <h2 className="border border-gray-400 mt-2 p-2 rounded-md  text-black text-3xl">
          {product.description}
        </h2>
        <div className="flex flex-col md:flex-row flex-wrap items-center mt-2 text-white">
          <button
            onClick={() => addOrder(product.id)}
            className="bg-green-600 p-2 px-5 w-full mt-1"
          >
            Buyurtmalarimga qo&apos;shish
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default WorkerGetOrder;
