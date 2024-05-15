import { toast, ToastContainer } from "react-toastify";
// import { IconButton } from '@material-tailwind/react'
import { useState } from "react";
import { Dialog } from "@material-tailwind/react";
import { DeleteBtn, EditBTn } from "../assets";
import Loader from "./Loader";
function CardUI({ setUiData, uiData, api }) {
  const [loader, setLoader] = useState(false);
  const [size, setSize] = useState(null);
  const handleOpen = (value) => setSize(value);
  // const { register, handleSubmit, resetField, formState: {dirtyFields, isDirty}  } =  useForm()
  const [value, setValue] = useState({
    username: "",
    password: "",
    user_roles: "",
    name: "",
    ndc_price: "",
    ndc: "",
    price: "",
    qty: "",
  });
  function deleteUser(id) {
    setLoader(true);
    fetch(`${api}${id}/`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        if (data.message == "Product successfully deleted") {
          toast.success(data.message, {
            position: "top-right",
            autoClose: 1500,
          });
          let copied = JSON.parse(JSON.stringify(uiData));
          const updatedUiData = copied.filter((user) => user.id !== id);
          setUiData(updatedUiData);
          setLoader(false);
        }
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        setLoader(false);
        toast.error("Error deleting user", {
          position: "top-center",
          autoClose: 1500,
        });
      });
  }

  function handleUpdate(e, id) {
    e.preventDefault();
    const requestOptions = {
      method: "PUT", // Specify the request method
      headers: { "Content-Type": "application/json" }, // Specify the content type
      body: JSON.stringify(value), // Send the data in JSON format
    };
    fetch(`${api}${id}/`, requestOptions)
      .then((res) => console.log(res))
      // .then(data => console.log(data))
      .catch((error) => {
        console.error(error);
      });
    toast.success("Edit successfuly 🙂");
  }
  function updateUser(user) {
    setValue({
      ...value,
      username: user.username,
      password: user.password,
      user_roles: user.user_roles,
      name: user.name,
      ndc_price: user.ndc_price,
      ndc: user.ndc,
      qty: user.qty,
      price: user.price,
    });
  }
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white  ">
          <table className="w-full text-left border-l-2 table-auto min-w-max">
            <thead className="">
              <tr>
                <th className="p-4 border-b  bg-blue-600 text-white">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-white ">
                    Name
                  </p>
                </th>
                <th className="p-4 border-b  bg-blue-600">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-white">
                    Qty
                  </p>
                </th>
                <th className="p-4 border-b  bg-blue-600">
                  <p className="block font-sans text-center  text-sm antialiased font-normal leading-none text-white">
                    Meauserement
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
                    NDS + Price
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
                          {user.name.charAt() + user.name.slice(1)}
                        </p>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {user.qty}
                        </p>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <p className="block font-sans text-center text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {user.measurement}
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
                          {user.dollor_course_total?.toFixed(2)}
                        </a>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <span className="flex items-center justify-end gap-5">
                          <button
                            className=""
                            onClick={() => {
                              updateUser(user), handleOpen("sm");
                            }}
                          >
                            <img src={EditBTn} alt="edit btn" />
                          </button>
                          <button
                            className=""
                            onClick={() => deleteUser(user.id)}
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
            className="animateModal"
            open={size === "sm"}
            size={size || "md"}
            handler={handleOpen}
          ></Dialog>
          <ToastContainer />
        </div>
      )}
    </>
  );
}

export default CardUI;
