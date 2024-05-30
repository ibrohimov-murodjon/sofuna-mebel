import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode"; // jwtDecode should not be destructured
import OrderOneAbuot from "../components/OrderOneAbuot";
import { toast } from "react-toastify";
import { Dialog } from "@material-tailwind/react";
import UserAddOrder from "../components/UserAddOrder";

function OrderDetails() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const senderId = useSelector(
    (state) => jwtDecode(state.userToken.token).user_id
  );
  const { id } = useParams();
  const [size, setSize] = useState(null);

  const handleOpen = (userId) => {
    setUserId(userId);
    console.log(userId);
    setSize("xs");
  };

  const deleteCloseFun = () => {
    setSize(null);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://custom.uz/users/");
        const data = await response.json();
        const filteredUsers = data.filter(
          (user) => user.user_roles === "worker"
        );
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const notify = () => toast.success("Buyutma biriktirildi");

  const handleSubmit = (userId) => {
    handleOpen(userId);
  };

  const handleAddSubmit = async () => {
    const messageData = {
      sender: senderId,
      worker: userId,
      order: id,
      text: "hayr",
    };

    try {
      const response = await fetch("https://custom.uz/products/message/api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });
      const data = await response.json();
      console.log(data);
      notify();
      deleteCloseFun();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div style={{ width: "98%", marginBottom: "50px" }}>
      <div>
        <OrderOneAbuot />
      </div>
      <table className="w-full text-left border-l-2 table-auto min-w-max">
        <thead className="bg-blue-600">
          <tr>
            <th className="px-4 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
              <p className="text-center">№</p>
            </th>
            <th className="px-4 py-4 w-72 text-left text-xs font-medium text-white uppercase tracking-wider">
              <p className="text-left">Ismi</p>
            </th>
            <th className="px-4 py-4 w-72 text-left text-xs font-medium text-white uppercase tracking-wider">
              <p className="text-left">Familyasi</p>
            </th>
            <th className="px-4 py-4 w-72 text-left text-xs font-medium text-white uppercase tracking-wider">
              <p className="text-left">Telefon raqam</p>
            </th>
            <th className="px-4 py-4 w-72 text-left text-xs font-medium text-white uppercase tracking-wider">
              <p className="text-left">Qaysi fillialdaligi</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, index) => (
              <tr
                onClick={() => handleSubmit(user.id)}
                style={{ cursor: "pointer" }}
                className={`${index % 2 === 0 ? "bg-blue-50" : "bg-white"}`}
                key={user.id}
              >
                <td className="py-2 px-4 border-b border-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 text-center">
                    {index + 1}
                  </p>
                </td>
                <td className="py-2 px-4 border-b border-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {user.first_name}
                  </p>
                </td>
                <td className="py-2 px-4 border-b border-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {user.last_name}
                  </p>
                </td>
                <td className="py-2 px-4 border-b border-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {user.phone_number}
                  </p>
                </td>
                <td className="py-2 px-4 border-b border-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {user.filial_name || "N/A"}
                  </p>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Dialog
        open={size === "xs"}
        size={size || "md"}
        onClose={deleteCloseFun}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <UserAddOrder
          AddUser={handleAddSubmit}
          handleClose={deleteCloseFun}
          userId={userId}
        />
      </Dialog>
    </div>
  );
}

export default OrderDetails;
