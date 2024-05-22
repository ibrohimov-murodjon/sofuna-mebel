import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const StirCompany = () => {
  const [companySearch, setCompanySearch] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetch(`https://custom.uz/products/company-order/api/${id}/`)
    .then((res) => res.json())
    .then((data) => {
      setCompanySearch(data);
    })
    .catch((error) => console.error("malumot olishta xatolik:", error));
  }, [id])
    console.log(companySearch);
  return <div>
    {companySearch.length > 0 ?  companySearch.map(order => {
        return(
            <div key={crypto.randomUUID()}>
        <p>{order.name}</p>
        </div>
        )
    }) : <p>Hech qanday malumot mavjud emas😐</p>}
  </div>;
};

export default StirCompany;
