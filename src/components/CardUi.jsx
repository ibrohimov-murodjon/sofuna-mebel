import { toast } from "react-toastify";
// import { IconButton } from '@material-tailwind/react'
import { useState } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Button, Dialog } from "@material-tailwind/react";
import { DeleteBtn, EditBTn } from "../assets";
// import {useForm } from 'react-hook-form'
function CardUI({ user, setUiData, uiData, api }) {
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
      // total_price: user.total_price
    });
  }
  return (
    <div class="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
      <table class="w-full text-left table-auto min-w-max">
        <thead>
          <tr>
            <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                Name
              </p>
            </th>
            <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                Job
              </p>
            </th>
            <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                Employed
              </p>
            </th>
            <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"></p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-4 border-b border-blue-gray-50">
              <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                John Michael
              </p>
            </td>
            <td class="p-4 border-b border-blue-gray-50">
              <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                Manager
              </p>
            </td>
            <td class="p-4 border-b border-blue-gray-50">
              <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                23/04/18
              </p>
            </td>
            <td class="p-4 border-b border-blue-gray-50">
              <a
                href="#"
                class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
              >
                Edit
              </a>
            </td>
          </tr>
          <tr>
            <td class="p-4 border-b border-blue-gray-50">
              <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                Alexa Liras
              </p>
            </td>
            <td class="p-4 border-b border-blue-gray-50">
              <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                Developer
              </p>
            </td>
            <td class="p-4 border-b border-blue-gray-50">
              <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                23/04/18
              </p>
            </td>
            <td class="p-4 border-b border-blue-gray-50">
              <a
                href="#"
                class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
              >
                Edit
              </a>
            </td>
          </tr>
          <tr>
            <td class="p-4 border-b border-blue-gray-50">
              <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                Laurent Perrier
              </p>
            </td>
            <td class="p-4 border-b border-blue-gray-50">
              <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                Executive
              </p>
            </td>
            <td class="p-4 border-b border-blue-gray-50">
              <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                19/09/17
              </p>
            </td>
            <td class="p-4 border-b border-blue-gray-50">
              <a
                href="#"
                class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
              >
                Edit
              </a>
            </td>
          </tr>
          <tr>
            <td class="p-4 border-b border-blue-gray-50">
              <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                Michael Levi
              </p>
            </td>
            <td class="p-4 border-b border-blue-gray-50">
              <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                Developer
              </p>
            </td>
            <td class="p-4 border-b border-blue-gray-50">
              <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                24/12/08
              </p>
            </td>
            <td class="p-4 border-b border-blue-gray-50">
              <a
                href="#"
                class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
              >
                Edit
              </a>
            </td>
          </tr>
          <tr>
            <td class="p-4">
              <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                Richard Gran
              </p>
            </td>
            <td class="p-4">
              <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                Manager
              </p>
            </td>
            <td class="p-4">
              <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                04/10/21
              </p>
            </td>
            <td class="p-4">
              <a
                href="#"
                class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
              >
                Edit
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      {/* <span className="flex items-center gap-5">
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
      </span> */}
      {/* <Dialog
        className="animateModal"
        open={size === "sm"}
        size={size || "md"}
        handler={handleOpen}
      >
        <span>
          <form
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
          </form>
        </span>
      </Dialog> */}
    </div>
  );
}

export default CardUI;
