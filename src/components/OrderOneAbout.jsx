import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function OrderOneAbout() {
  const { id } = useParams();
  const [orderData, setOrderData] = useState("");
  useEffect(() => {
    fetch(`https://custom.uz/products/order-measurement/${id}/`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrderData(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [id]);

  return (
    <div>
      <div
        className="bg-white my-4 rounded-lg shadow-md overflow-hidden"
      >
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl text-center font-bold text-gray-800">
            Buyutma haqida
          </h1>
        </div>
        {orderData && (
          <div className="py-4 px-8 grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-900 font-bold">Buyutma nomi:</p>
              <p className="text-gray-700 mb-4">{orderData.name}</p>
              <p className="text-gray-900 font-bold">Buyutma Soni</p>
              <p className="text-gray-700 mb-4">{orderData.qty}</p>
              <p className="text-gray-900 font-bold">Buyutmaning o&apos;lchov birligi:</p>
              <p className="text-gray-700 mb-4">{orderData.measurement.name}</p>
              <p className="text-gray-900 font-bold">
                Buyutma haqida ma&apos;lumot
              </p>
              <p className="text-gray-700 mb-4 w-4/5">
                {orderData.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default OrderOneAbout;
