import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
const Wrapper = styled.div`
  max-width: 768px;
  gap: 40px;
  width: 90%;
  padding: 10px;
  margin: 40px auto;
  background-color: white;
`;

function WorkerProductDetail() {
  const [product, setProduct] = useState({});
  const [loader, setLoader] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const token = useSelector((state) => state.userToken.token);
  const { id } = useParams();
  const decodedToken = jwtDecode(token);
  const fetchData = async () => {
    setLoader(true);
    try {
      const response = await fetch(`https://custom.uz/products/api/${id}/`);
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

  const AcceptanceUpdate = async () => {
    setLoader(true);

    const updatedProduct = {
      worker: decodedToken.user_id,
      product: id,
      qty: inputValue,
    };
    try {
      const response = await fetch(
        `https://custom.uz/products/worker-product/api/`,
        {
          method: "POST",
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
      setInputValue('')
      setLoader(false);
      toast.success("Mahsulot olindi")
    } catch (error) {
      setLoader(false);
      toast.error("Mahsulot olinmadi qatya urining")
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
        <h3 className="text-2xl text-gray-600">Maxsulot nomi: </h3>
        <h2 className="border border-gray-400 mt-2 p-2 rounded-md text-3xl text-black ">
          {product.name}
        </h2>
        <h3 className="text-2xl text-gray-600">
          BIzda Mavjud {product.measurement}:{" "}
        </h3>
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
      </div>
      <div className="flex flex-col md:flex-row flex-wrap items-center mt-4 text-white">
        <>
          <input
            type="number"
            className="placeholder-styled  p-2 block mb-2 md:mb-0 md:mr-2 text-black"
            placeholder="Miqdor..."
            value={inputValue}
            style={{ border: "2px solid black" }}
            onChange={handleInputChange}
          />
          <button
            onClick={AcceptanceUpdate}
            className="bg-blue-600 p-3 px-5 mb-2 md:mb-0 md:mr-2 w-2/6"
          >
            Olish
          </button>
        </>
      </div>
    </Wrapper>
  );
}

export default WorkerProductDetail;
