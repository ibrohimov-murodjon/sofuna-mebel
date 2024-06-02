import { toast } from "react-toastify";
// import { IconButton } from '@material-tailwind/react'
import { useState } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Button, Dialog } from "@material-tailwind/react";
import { DeleteBtn, EditBTn } from "../assets";
import { data } from "autoprefixer";
// import {useForm } from 'react-hook-form'
function CardUI({ setUiData, uiData, api }) {
  console.log(uiData);
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
    // total_price: "",
  });
  function deleteUser(id) {
    fetch(`${api}${id}/`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        setUiData(uiData.filter((user) => user.id !== id));
        toast.success("Deleted User ✅", {
          position: "top-right",
          autoClose: 1500,
        });
      })
      .catch((error) => console.error("Error deleting user:", error));
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
    <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white  rounded-xl bg-clip-border">
      <table className="w-full text-center border-l-2 table-auto min-w-max">
        <thead>
          <tr>
            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p className="block text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                Name
              </p>
            </th>
            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p className="block text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                Qty
              </p>
            </th>
            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p className="block text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                Meauserement
              </p>
            </th>
            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p className="block text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                Price
              </p>
            </th>
            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p className="block text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                Total price
              </p>
            </th>
            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p className="block text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                NDS + Price
              </p>
            </th>
            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p className="block text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                Dollar curs
              </p>
            </th>
            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p className="block text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                Dollar convert
              </p>
            </th>
            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p className="block text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                Actions
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {uiData.map((user) => {
            return (
              <tr key={crypto.randomUUID()}>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {user.name.charAt() + user.name.slice(1) }
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {user.qty}
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block text-sm antialiased font-normal leading-normal text-blue-gray-900">
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
                <td className="p-4 border-b border-blue-gray-50">
                  <a
                    href="#"
                    className="block text-sm antialiased font-medium leading-normal text-blue-gray-900"
                  >
                    {user.dollor_course_total?.toFixed(2)}
                  </a>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <span className="flex items-center gap-5">
                    <button
                      className=""
                      onClick={() => {
                        updateUser(user), handleOpen("sm");
                      }}
                    >
                      <img src={EditBTn} alt="edit btn" />
                    </button>
                    <button className="" onClick={() => deleteUser(user.id)}>
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
      >
        <span>
          {/* <form
            onSubmit={(e) => handleUpdate(e, user.id)}
            className="flex items-start flex-col gap-5"
          >
            {user.username ? (
              <label className="flex items-center gap-x-2 ">
                <p className="text-white">Name:</p>
                <input
                  className="pl-2"
                  value={value.username}
                  onChange={(e) =>
                    setValue({ ...value, username: e.target.value })
                  }
                  type="text"
                />
              </label>
            ) : null}
            {user.password ? (
              <label className="flex items-center gap-x-2">
                <p className="text-white"> Password:</p>
                <input
                  className="pl-2"
                  value={value.password}
                  onChange={(e) =>
                    setValue({ ...value, password: e.target.value })
                  }
                  type="text"
                />
              </label>
            ) : null}
            {user.price ? (
              <label className="flex items-center gap-x-2 ">
                <p className="text-white">Price:</p>
                <input
                  className="pl-2"
                  value={value.price}
                  onChange={(e) =>
                    setValue({ ...value, price: e.target.value })
                  }
                  type="number"
                />
              </label>
            ) : null}
            {user.qty ? (
              <label className="flex items-center gap-x-2">
                <p className="text-white">Soni:</p>
                <input
                  className="pl-2"
                  value={value.qty}
                  onChange={(e) => setValue({ ...value, qty: e.target.value })}
                  type="number"
                />
              </label>
            ) : null}

            {user.user_roles ? (
              <span className="flex items-center">
                <p className="text-white">Position:</p>
                <select
                  value={value.user_roles}
                  onChange={(e) =>
                    setValue({ ...value, user_roles: e.target.value })
                  }
                >
                  <option value="worker">Worker</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </span>
            ) : null}
            <button className="bg-green-600 rounded-md text-white w-full max-w-[150px] py-1">
              Send
            </button>
          </form> */}
        </span>
      </Dialog>
    </div>
  );
}

export default CardUI;
