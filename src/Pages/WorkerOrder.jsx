import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 768px;
  width: 90%;
  padding: 10px;
  margin: 40px auto;
  background-color: white;
`;
const product = {
  id: "e94af3f4-a7b4-46b1-82b5-9b6c82252185",
  name: "Stul",
  status: "NO_ACTIVE",
  qty: 100,
  total_price: 1000,
  price: 10,
  dollor_course: 1,
  work_proses: "0",
  dollor_convert: 1000,
  created_at: "2024-05-15T14:45:54.798124Z",
  description:
    "Bu stul ikki kishi otirishi uchun qulay bolishi kerak va  unda bemalol dars qila olishi kerak",
  measurement: "kg",
  STIR: "1",
  company_name: "salom",
};

function WorkerOrder() {
  const [product, setProduct] = useState({});
  const { id } = useParams();
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

  return (
    <Wrapper>
      <div>
        <h3 className="text-2xl text-gray-600">Maxsulot nomi: </h3>
        <h2 className="border border-gray-400 mt-2 p-2 rounded-md text-3xl text-black ">
          {product.name}
        </h2>
        <h3 className="text-2xl text-gray-600">Buyurtma beruvchi: </h3>
        <h2 className="border border-gray-400 mt-2 p-2 rounded-md  text-black text-3xl">
          {product.company_name}
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
          <button className="bg-red-400 p-2 mb-2 md:mb-0 md:mr-2">
            Qabul qilish
          </button>
          <input
            type="text"
            className="placeholder-styled border p-2 block mb-2 md:mb-0 md:mr-2 text-black"
            placeholder="Bajarilgan mahsulot sonini kiriting placeholder-black"
          />
          <button className="bg-blue-600 p-2 px-5 mb-2 md:mb-0 md:mr-2">
            Bajarildi
          </button>
          <button className="bg-green-600 p-2 px-5">Yakunlandi</button>
        </div>
      </div>
    </Wrapper>
  );
}

export default WorkerOrder;
