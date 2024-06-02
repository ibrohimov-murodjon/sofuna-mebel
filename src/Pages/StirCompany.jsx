import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { DeleteBtn, EditBTn } from "../assets";

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
  }, [id]);
  return (
    <div>
      <div className="bg-white mt-2 ml-1 pl-10 py-10">
      <h2 className="text-center font-bold text-[25px] mb-3">Kompaniya haqida:</h2>
      <div className="flex flex-col gap-y-2 text-2xl mb-5">
      <span className="flex items-center">
        <small>Companiya nomi:</small>
        <small>{companySearch[0]?.company_name}</small>
      </span>
      <span>
        <small>Companiya STIR raqami:</small>
        <small>{companySearch[0]?.STIR}</small>
      </span>
      <span>
        <small>Companiyaning buyurtmalar soni:</small>
        <small>{companySearch.length}</small>
      </span>
      </div>
      
      {/* {companySearch.length > 0 ? (
        companySearch.map((order) => {
          return (
            
          );
        })
      ) : (
        <p>Hech qanday malumot mavjud emas😐</p>
      )} */}
    </div>
      <table className="w-full text-left border-l-2 table-auto min-w-max">
              <thead className="">
                <tr>
                  <th className="p-4 border-b  bg-blue-600 text-white">
                    <p className="block text-sm antialiased font-normal leading-none text-white ">
                      No
                    </p>
                  </th>
                  <th className="p-4 border-b  bg-blue-600 text-white">
                    <p className="block text-sm antialiased font-normal leading-none text-white ">
                      Name
                    </p>
                  </th>
                  <th className="p-4 border-b  bg-blue-600">
                    <p className="block text-sm antialiased font-normal leading-none text-white">
                      Qty
                    </p>
                  </th>
                  <th className="p-4 border-b  bg-blue-600">
                    <p className="block text-center  text-sm antialiased font-normal leading-none text-white">
                      Meauserement
                    </p>
                  </th>
                  <th className="p-4 border-b  bg-blue-600">
                    <p className="block text-sm antialiased font-normal leading-none text-white">
                      Price
                    </p>
                  </th>
                  <th className="p-4 border-b  bg-blue-600">
                    <p className="block text-sm antialiased font-normal leading-none text-white">
                      Total price
                    </p>
                  </th>
                  <th className="p-4 border-b  bg-blue-600">
                    <p className="block text-sm antialiased font-normal leading-none text-white">
                      NDS Price
                    </p>
                  </th>
                  <th className="p-4 border-b  bg-blue-600">
                    <p className="block text-sm antialiased font-normal leading-none text-white">
                      Dollar curs
                    </p>
                  </th>

                  <th className="p-4 border-b  bg-blue-600">
                    <p className="block text-sm antialiased font-normal leading-none text-white text-center">
                      Dollar convert
                    </p>
                  </th>
                  <th className="p-4 border-b  bg-blue-600">
                    <p className="block text-sm antialiased font-normal leading-none text-white text-center">
                      Qarzdorlik
                    </p>
                  </th>
                  <th className="p-4 border-b  bg-blue-600">
                    <p className="block text-sm text-right antialiased font-normal leading-none text-white">
                      Actions
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {companySearch &&
                  companySearch.map((user, index) => {
                    return (
                      <tr
                        className={`${index % 2 == 0 ? "bg-blue-50" : ""}`}
                        key={crypto.randomUUID()}
                      >
                        <td className="p-4 border-b border-blue-gray-50">
                          <p className="block text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {index + 1}
                          </p>
                        </td>
                        <td
                          onClick={() => handleRowClick(user.id)}
                          className="p-4 border-b border-blue-gray-50"
                        >
                          <p className="block text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {user.name?.charAt() + user.name?.slice(1)}
                          </p>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <p className="block text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {user.qty}
                          </p>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <p className="block text-center text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {user.measurement}
                          </p>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <p className="block text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {user.price}
                          </p>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <a
                            href="#"
                            className="block text-sm antialiased font-medium leading-normal text-blue-gray-900"
                          >
                            {user.total_price}
                          </a>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <a
                            href="#"
                            className="block text-sm antialiased font-medium leading-normal text-blue-gray-900"
                          >
                            {user.ndc_price}
                          </a>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <a
                            href="#"
                            className="block text-sm antialiased font-medium leading-normal text-blue-gray-900"
                          >
                            {user.dollor_course}
                          </a>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50 text-center ">
                          <a
                            href="#"
                            className="block text-sm antialiased font-medium leading-normal text-blue-gray-900"
                          >
                    {user.dollor_convert.toFixed(2)}
                          </a>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50 text-center ">
                          <a
                            href="#"
                            className="block text-sm antialiased font-medium leading-normal text-blue-gray-900"
                          >
                            {user.debt}
                          </a>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <span className="flex items-center justify-end gap-5">
                            <button
                              className=""
                              onClick={() => {
                                handleOpen("xs");
                              }}
                            >
                              <img src={EditBTn} alt="edit btn" />
                            </button>
                            <button
                              className=""
                              onClick={() => {
                                setUserId(user.id);
                                handleOpen("xs");
                              }}
                            >
                              <img src={DeleteBtn} alt="delete btn" />
                            </button>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
    </div>
    
  );
};

export default StirCompany;
