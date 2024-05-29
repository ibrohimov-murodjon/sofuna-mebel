import { toast } from "react-toastify";
import { useState } from "react";
import { Dialog } from "@material-tailwind/react";
import { DeleteBtn,  } from "../assets";
import {Loader,OutlineDeleteModal } from "../components/index";
import { useNavigate } from "react-router-dom";

import OrderUpdateModal from "./OrderUpdateModal";

function OrderTable({ setUiData, uiData, getApi }) {
  const [loader, setLoader] = useState(false);
  const [userId, setUserId] = useState("");
  const [size, setSize] = useState(null);
  const [measurement, setMeasurement] = useState('')
  const navigate = useNavigate();
  const handleOpen = (value) => setSize(value);

  const deleteCloseFun = () => {
    setSize(null);
  };
  const notify = () => toast.success("Maxsulot o'chirildi");

  const deleteProduct = (id) => {
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
          deleteCloseFun();
          notify();
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
          <table className="w-full text-left border-l-2 table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 border-b  bg-blue-600 text-white">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-white ">
                    No
                  </p>
                </th>
                <th className="p-4 border-b  bg-blue-600 text-white">
                  <p
                    style={{ cursor: "pointer" }}
                    className="block font-sans text-sm antialiased font-normal leading-none text-white "
                  >
                    Name
                  </p>
                </th>
                <th className="p-4 border-b  bg-blue-600">
                  <p className="block font-sans text-center  text-sm antialiased font-normal leading-none text-white">
                    O&apos;lchov
                  </p>
                </th>
                <th className="p-4 border-b  bg-blue-600">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-white">
                    Soni
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
                  console.log(user);
                  // const { measurementName } = GetMeasurement(user.measurement)
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
                        <p className="block font-sans text-center text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {user.measurement.name}
                        </p>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {user.qty}
                        </p>
                      </td>

                      <td className="p-4 border-b border-blue-gray-50">
                        <span className="flex items-center justify-end gap-5">
                    
                          <OrderUpdateModal product = {user} getApi={getApi} />
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
              deleteUser={() => deleteProduct(userId)}
            />
          </Dialog>
        </div>
      )}
    </>
  );
}

export default OrderTable;
