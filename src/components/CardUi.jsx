import { toast, ToastContainer } from "react-toastify";
// import { IconButton } from '@material-tailwind/react'
import { useState } from "react";
import { Dialog } from "@material-tailwind/react";
import { DeleteBtn, EditBTn } from "../assets";
import Loader from "./Loader";
import OutlineDeleteModal from "./OutlineDeleteModal/OutlineDeleteModal";
import { useNavigate } from "react-router-dom";

function CardUI({ setUiData, uiData, api }) {
  const [loader, setLoader] = useState(false);
  const [userId, setUserId] = useState("");
  const [size, setSize] = useState(null);
  const navigate = useNavigate();
  const handleOpen = (value) => setSize(value);

  const deleteCloseFun = () => {
    setSize(null);
  };

  console.log(uiData);

  const deleteOrder = (id) => {
    fetch(`https://custom.uz/products/order/api/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log("Order deleted successfully");
          let copied = JSON.parse(JSON.stringify(uiData));
          const updatedUiData = copied.filter((user) => user.id !== id);
          setUiData(updatedUiData);
          toast.success("Mufaqiyatli o'chirildi", {
            position: "top-right",
            autoClose: 1500,
          });
          deleteCloseFun();
        }
      })
      .catch((error) => {
        console.error("Delete error:", error);
        toast.error("Error deleting user", {
          position: "top-center",
          autoClose: 1500,
        });
      });
  };

  function handleRowClick(id) {
    navigate(`/orders/${id}`);
  }

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white  ">
          {api == "https://custom.uz/products/order/api/" ? (
            <table className="w-full text-left border-l-2 table-auto min-w-max">
              <thead className="">
                <tr>
                  <th className="p-4 border-b  bg-blue-600 text-white">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-white ">
                      No
                    </p>
                  </th>
                  <th className="p-4 border-b  bg-blue-600 text-white">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-white ">
                      Name
                    </p>
                  </th>
                  <th className="p-4 border-b  bg-blue-600">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-white">
                      O'lchov
                    </p>
                  </th>
                  <th className="p-4 border-b  bg-blue-600">
                    <p className="block font-sans text-center  text-sm antialiased font-normal leading-none text-white">
                      Soni
                    </p>
                  </th>
                  <th className="p-4 border-b  bg-blue-600">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-white">
                      Price
                    </p>
                  </th>
                  <th className="p-4 border-b  bg-blue-600">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-white">
                      Total price
                    </p>
                  </th>
                  <th className="p-4 border-b  bg-blue-600">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-white">
                      NDS Price
                    </p>
                  </th>
                  <th className="p-4 border-b  bg-blue-600">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-white">
                      Dollar curs
                    </p>
                  </th>

                  <th className="p-4 border-b  bg-blue-600">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-white text-center">
                      Dollar convert
                    </p>
                  </th>
                  {api !== "https://custom.uz/products/api/" ? (
                    <th className="p-4 border-b  bg-blue-600">
                      <p className="block font-sans text-sm antialiased font-normal leading-none text-white text-center">
                        Company
                      </p>
                    </th>
                  ) : null}

                  <th className="p-4 border-b  bg-blue-600">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-white text-center">
                      Qarzdorlik
                    </p>
                  </th>
                  <th className="p-4 border-b  bg-blue-600">
                    <p className="block font-sans text-sm text-right antialiased font-normal leading-none text-white">
                      Actions
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {uiData &&
                  uiData.map((user, index) => {
                    return (
                      <tr
                        className={`${index % 2 == 0 ? "bg-blue-50" : ""}`}
                        key={crypto.randomUUID()}
                      >
                        <td className="p-4 border-b border-blue-gray-50">
                          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {index + 1}
                          </p>
                        </td>
                        <td
                          onClick={() => handleRowClick(user.id)}
                          className="p-4 border-b border-blue-gray-50"
                        >
                          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {user.name?.charAt() + user.name?.slice(1)}
                          </p>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {user.measurement}
                          </p>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <p className="block font-sans text-center text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {user.qty}
                          </p>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {user.price}
                          </p>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <a
                            href="#"
                            className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
                          >
                            {user.total_price}
                          </a>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <a
                            href="#"
                            className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
                          >
                            {user.ndc_price}
                          </a>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <a
                            href="#"
                            className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
                          >
                            {user.dollor_course}
                          </a>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50 text-center ">
                          <a
                            href="#"
                            className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
                          >
                            {api == "https://custom.uz/products/api/"
                              ? user.dollor_course_total?.toFixed(2)
                              : user.dollor_convert.toFixed(2)}
                          </a>
                        </td>
                        {api !== "https://custom.uz/products/api/" ? (
                          <td className="p-4 border-b border-blue-gray-50 text-center ">
                            <a
                              href="#"
                              className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
                            >
                              {user.company_name}
                            </a>
                          </td>
                        ) : null}
                        <td className="p-4 border-b border-blue-gray-50 text-center ">
                          <a
                            href="#"
                            className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
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
          ) : (
            <table className="w-full text-left border-l-2 table-auto min-w-max">
              <thead className="">
                <tr>
                  <th className="p-4 border-b  bg-blue-600 text-white">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-white ">
                      No
                    </p>
                  </th>
                  <th className="p-4 border-b  bg-blue-600 text-white">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-white ">
                      Name
                    </p>
                  </th>
                  <th className="p-4 border-b  bg-blue-600">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-white">
                      O'lchov
                    </p>
                  </th>
                  <th className="p-4 border-b  bg-blue-600">
                    <p className="block font-sans text-center  text-sm antialiased font-normal leading-none text-white">
                      Soni
                    </p>
                  </th>

                  <th className="p-4 border-b  bg-blue-600">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-white">
                      Price
                    </p>
                  </th>
                  <th className="p-4 border-b  bg-blue-600">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-white">
                      Total price
                    </p>
                  </th>
                  <th className="p-4 border-b  bg-blue-600">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-white">
                      NDS Price
                    </p>
                  </th>
                  <th className="p-4 border-b  bg-blue-600">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-white">
                      Dollar curs
                    </p>
                  </th>
                  <th className="p-4 border-b  bg-blue-600">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-white text-center">
                      Dollar convert
                    </p>
                  </th>
                  {api !== "https://custom.uz/products/api/" ? (
                    <th className="p-4 border-b  bg-blue-600">
                      <p className="block font-sans text-sm antialiased font-normal leading-none text-white text-center">
                        Company
                      </p>
                    </th>
                  ) : null}

                  <th className="p-4 border-b  bg-blue-600">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-white text-center">
                      Qarzdorlik
                    </p>
                  </th>
                  <th className="p-4 border-b  bg-blue-600">
                    <p className="block font-sans text-sm text-right antialiased font-normal leading-none text-white">
                      Actions
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {uiData &&
                  uiData.map((user, index) => {
                    return (
                      <tr
                        className={`${index % 2 == 0 ? "bg-blue-50" : ""}`}
                        key={crypto.randomUUID()}
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
                          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {" "}
                            {user.measurement}
                          </p>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <p className="block font-sans text-center text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {user.qty}
                          </p>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {user.price}
                          </p>
                        </td>

                        <td className="p-4 border-b border-blue-gray-50">
                          <a
                            href="#"
                            className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
                          >
                            {user.total_price}
                          </a>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <a
                            href="#"
                            className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
                          >
                            {user.ndc_price}
                          </a>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <a
                            href="#"
                            className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
                          >
                            {user.dollor_course}
                          </a>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50 text-center ">
                          <a
                            href="#"
                            className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
                          >
                            {api == "https://custom.uz/products/api/"
                              ? user.dollor_course_total?.toFixed(2)
                              : user.dollor_convert?.toFixed(2)}
                          </a>
                        </td>
                        {api !== "https://custom.uz/products/api/" ? (
                          <td className="p-4 border-b border-blue-gray-50 text-center ">
                            <a
                              href="#"
                              className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
                            >
                              {user.company_name}
                            </a>
                          </td>
                        ) : null}
                        <td className="p-4 border-b border-blue-gray-50 text-center ">
                          <a
                            href="#"
                            className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
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
          )}

          <Dialog
            open={size === "xs"}
            size={size || "md"}
            handler={handleOpen}
            onClose={() => deleteCloseFun()}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <OutlineDeleteModal
              handleClose={deleteCloseFun}
              deleteUser={() => deleteOrder(userId)}
            />
          </Dialog>
          <ToastContainer />
        </div>
      )}
    </>
  );
}

export default CardUI;
