import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";

const Card = styled.div`
  padding: 15px;
  border: 1px solid black;
  width: 24%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(217, 217, 217, 0.58);
  border: 1px solid white;
  border-radius: 17px;
  cursor: pointer;
  transition: all 0.5s;
  color: black;
  :hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 20px;
`;

function OlinganlarHaqida() {
  const { id } = useParams();

  const [orderData, setOrderData] = useState([]);
  useEffect(() => {
    console.log(id);
    fetch(`https://custom.uz/products/worker-product-get/${id}/`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrderData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);
  return (
    <div className="bg-white w-[98%] my-4 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl text-center font-bold text-gray-800">
          Ishchi haqida
        </h1>
      </div>
      {orderData && (
        <div className="py-4 px-8 grid grid-cols-2 gap-4">
          <div className="flex gap-32">
            <div>
              <p className="text-gray-900 font-bold">Ism Familya</p>
              <p className="text-gray-700 mb-4">
                {orderData.first_name} {orderData.last_name}
              </p>
            </div>
            <div>
              <p className="text-gray-900 font-bold">Telefon raqami:</p>
              <p className="text-gray-700 mb-4">{orderData.phone_number}</p>
            </div>
          </div>
        </div>
      )}
      <div
        style={{
          borderTop: "2px solid #55c5f1",
          padding: "10px",
          margin: "10px",
        }}
      >
        <h3
          style={{
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Ishchi olgan Maxsulotlar ro&apos;yhati
        </h3>
        <div>
          <CardWrapper>
            {orderData.products &&
              orderData.products.reverse().map((el, index) => {
                return (
                  <Card key={index}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span
                        style={{
                          fontSize: "14px",
                          marginBottom: "-5px",
                        }}
                      >
                        Nomi
                      </span>
                      <p
                        style={{
                          fontSize: "20px",
                          marginBottom: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        {el.name}
                      </p>
                      <span
                        style={{
                          fontSize: "14px",
                          marginBottom: "-5px",
                        }}
                      >
                        Olingan sanasi
                      </span>
                      <p style={{ fontWeight: "bold" }}>{el.created_at}</p>
                    </div>
                    <div>
                      <span
                        style={{
                          fontSize: "14px",
                          marginBottom: "-5px",
                        }}
                      >
                        Soni
                      </span>
                      <p style={{ fontWeight: "bold" }}>
                        {el.qty} {el.measurement}
                      </p>
                    </div>
                  </Card>
                );
              })}
          </CardWrapper>
        </div>
      </div>
    </div>
  );
}

export default OlinganlarHaqida;
