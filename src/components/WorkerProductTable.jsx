import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

function WorkerProductTable({ setUiData, uiData, api, filteredData }) {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  console.log(filteredData, "filteredData");
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="relative flex flex-col w-full h-full text-gray-700 bg-white">
          <table className="text-left border-l-2 table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 w-2 border-b bg-blue-600 text-white">
                  <p className="block font-sans text-sm font-normal leading-none text-white">
                    No
                  </p>
                </th>
                <th className="p-4 border-b bg-blue-600 text-white">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-white">
                    Name
                  </p>
                </th>
                <th className="p-4 border-b bg-blue-600">
                  <p className="block font-sans text-center text-sm antialiased font-normal leading-none text-white">
                    O&apos;lchov
                  </p>
                </th>
                <th className="p-4 border-b bg-blue-600">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-white">
                    Soni
                  </p>
                </th>

                <th className="p-4 border-b bg-blue-600">
                  <p className="block font-sans text-sm text-left antialiased font-normal leading-none text-white">
                    Actions
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData
                ? filteredData.map((user, index) => {
                    return (
                      <tr
                        className={`${index % 2 === 0 ? "bg-blue-50" : ""}`}
                        key={user.id}
                      >
                        <td className="p-4 border-b border-blue-gray-50">
                          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {index + 1}
                          </p>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {user.name?.charAt() + user.name?.slice(1)}
                          </p>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <p className="block font-sans text-center text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {user.measurement}
                          </p>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {user.qty}
                          </p>
                        </td>

                        <td className="p-4 border-b border-blue-gray-50">
                          <span
                            onClick={() => {
                              navigate(`/product/${user.id}`);
                            }}
                            className="bg-blue-800 text-white p-3 cursor-pointer"
                          >
                            Mahsulot Olish
                          </span>
                        </td>
                      </tr>
                    );
                  })
                : uiData.map((user, index) => {
                    return (
                      <tr
                        className={`${index % 2 === 0 ? "bg-blue-50" : ""}`}
                        key={user.id}
                      >
                        <td className="p-4 border-b border-blue-gray-50">
                          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {index + 1}
                          </p>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {user.name?.charAt() + user.name?.slice(1)}
                          </p>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <p className="block font-sans text-center text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {user.measurement}
                          </p>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {user.qty}
                          </p>
                        </td>

                        <td className="p-4 border-b border-blue-gray-50">
                          <span
                            onClick={() => {
                              navigate(`/product/${user.id}`);
                            }}
                            className="bg-blue-800 text-white p-3 cursor-pointer"
                          >
                            Mahsulot Olish
                          </span>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default WorkerProductTable;
