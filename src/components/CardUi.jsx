import { toast } from "react-toastify";
import { useState } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Button, Dialog } from "@material-tailwind/react";
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
    <tr className="w-full">
      <td >
        {user.name ? <>{user.name}</> : null}
      </td>

      {user.user_roles ? <td>{user.user_roles}</td> : null}
        {user.price ? <td>{user.price}</td> : null}
        {user.qty ? <td>{user.qty}</td> : null}
        {user.total_price ? <td>{user.total_price}</td> : null}
      <td className="flex gap-x-3">
        <Button
          variant="outlined"
          className="border rounded-md p-2"
          onClick={() => {
            updateUser(user), handleOpen("sm");
          }}
        >
          <MdOutlineModeEditOutline className="text-[20px]" />
        </Button>
        <Button
          variant="outlined"
          className="border rounded-md p-2"
          onClick={() => deleteUser(user.id)}
        >
          <RiDeleteBin5Line className="text-[20px]" />
        </Button>
      </td>
      <Dialog
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
      </Dialog>
    </tr>
  );
}

export default CardUI;
