import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Loader from "../components/Loader";
const Wrapper = styled.div`
  max-width: 768px;
  gap: 40px;
  width: 90%;
  padding: 10px;
  margin: 40px auto;
  background-color: white;
`;

function WorkerOrder() {
  const [product, setProduct] = useState({});
  const [loader, setLoader] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { id } = useParams();

  const fetchData = async () => {
    setLoader(true);
    try {
      const response = await fetch(
        `https://custom.uz/products/order/api/${id}/`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProduct(data);
      setLoader(false);
      console.log(data);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  const Acceptance = async () => {
    setLoader(true);
    let copied = { ...product, status: "PENDING" };

    try {
      const response = await fetch(
        `https://custom.uz/products/order/api/${product.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(copied),
        }
      );

      if (!response.ok) {
        // Bu yerda xato holatini tekshirish
        throw new Error(`Server error: ${response.status}`);
      }

      const responseData = await response.json();
      fetchData();
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.error("PUT so'rovi xatosi:", error);
    }
  };

  const AcceptanceUpdate = async () => {
    setLoader(true);

    const updatedWorkProses = Number(product.work_proses) + Number(inputValue);

    const updatedStatus =
      updatedWorkProses >= product.qty ? "SUCCESSFULLY" : "PENDING";

    const updatedProduct = {
      ...product,
      work_proses: updatedWorkProses,
      status: updatedStatus,
    };

    try {
      const response = await fetch(
        `https://custom.uz/products/order/api/${product.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Response:", responseData);
      fetchData();
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <Wrapper>
      <div style={{ display: loader ? "block" : "none" }}>
        <Loader />
      </div>
      <div>
        <h3 className="text-2xl text-gray-600">Buyurtma beruvchi: </h3>
        <h2 className="border border-gray-400 mt-2 p-2 rounded-md  text-black text-3xl">
          {product.company_name}
        </h2>
        <h3 className="text-2xl text-gray-600">Maxsulot nomi: </h3>
        <h2 className="border border-gray-400 mt-2 p-2 rounded-md text-3xl text-black ">
          {product.name}
        </h2>
        <h3 className="text-2xl text-gray-600">Buyurtma soni: </h3>
        <h2 className="border border-gray-400 mt-2 p-2 rounded-md text-3xl text-black ">
          {product.qty}
        </h2>
        {product.work_proses != "0" && (
          <>
            <h3 className="text-2xl text-gray-600">Bajarilganlar soni: </h3>
            <h2 className="border border-gray-400 mt-2 p-2 rounded-md text-3xl text-black ">
              {product.work_proses}
            </h2>
          </>
        )}
        <h3 className="text-2xl text-gray-600">O&apos;lchov birligi: </h3>
        <h2 className="border border-gray-400 mt-2 p-2 rounded-md  text-black text-3xl">
          {product.measurement}
        </h2>
        <h3 className="text-2xl text-gray-600">Qo&apos;shimcha</h3>
        <h2 className="border border-gray-400 mt-2 p-2 rounded-md  text-black text-3xl">
          {product.description}
        </h2>

        <h3 className="text-2xl text-gray-600">Mahsulot surati: </h3>
        <img
          width={200}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlKKeLEyZtLk2VXwR5eGqhAAI-npYYH4pHxqt_4AsRqw&s"
          alt="mahsulot surati unda stul tasvirlangan oddiy dam olish stuli"
        />
      </div>
      <div className="flex flex-col md:flex-row flex-wrap items-center mt-4 text-white">
        {product.status == "NO_ACTIVE" && (
          <button
            onClick={Acceptance}
            className="bg-red-400 p-2 mb-2 md:mb-0 md:mr-2"
          >
            Qabul qilish
          </button>
        )}
        {product.status == "PENDING" && (
          <>
            <input
              type="number"
              className="placeholder-styled border p-2 block mb-2 md:mb-0 md:mr-2 text-black"
              placeholder="Bajarilgan mahsulot sonini kiriting placeholder-black"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button
              onClick={AcceptanceUpdate}
              className="bg-blue-600 p-2 px-5 mb-2 md:mb-0 md:mr-2"
            >
              Bajarildi
            </button>
          </>
        )}
        {product.status == "SUCCESSFULLY" && (
          <h2 className="bg-green-300 p-2 px-5 w-full text-center mx-auto ">
            Yakunlandi
          </h2>
        )}
      </div>
    </Wrapper>
  );
}

export default WorkerOrder;
