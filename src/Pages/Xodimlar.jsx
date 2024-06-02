import "react-toastify/dist/ReactToastify.css";
import { Dialog } from "@material-tailwind/react";
import { DeleteBtn, EditBTn } from "../assets";
import {
  Card,
  CardHeader,
  Input,
  Tabs,
  TabsHeader,
  Tab,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {Loader, OutlineDeleteModal} from "../components/index.js";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Manager",
    value: "manager",
  },
  {
    label: "Worker",
    value: "worker",
  },
  {
    label: "Admin",
    value: "admin",
  },
];

function Xodimlar() {
  const [category, setCategory] = useState([]);
  const [userId, setUserId] = useState("");
  const [size, setSize] = useState(null);
  const handleOpen = (value) => setSize(value);
  const navigate = useNavigate();


  const deleteCloseFun = () => {
    setSize(null);
  };

  // function handleUpdate(e, id) {
  //   e.preventDefault();
  //   fetch(`https://custom.uz/users/${id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(value),
  //   })
  //     .then((res) => console.log(res, "succes updated"))
  //     .catch((error) => {
  //       console.error(error);
  //     });
  //   setModal(false);
  // }

  // function updateUser(user) {
  //   setIdMember(user.id);
  //   setModal(true);
  //   setValue({
  //     username: user.username,
  //     password: user.password,
  //     user_roles: user.user_roles,
  //   });
  // }

  function deleteUser(id) {
    fetch(`https://custom.uz/users/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        setWorker(worker.filter((user) => user.id !== id));
        setCategory(category.filter((user) => user.id !== id));
        toast.success("Deleted User", {
          position: "top-right",
        });
        deleteCloseFun();
      })
      .catch((error) => console.error("Error deleting user:", error));
  }

  function categoryFilter(category) {
    setCategory(
      data.filter((user) => {
        if (category === "all") return user.user_roles;
        else return user.user_roles === category;
      })
    );
  }

  function searchFn(word) {
    setCategory(
      data.filter((user) => {
        return user.first_name.toLowerCase().includes(word);
      })
    );
  }

  const getStackFn = async () => {
    const response = await fetch("https://custom.uz/users/")
    let data = await response.json()
    data = data.reverse()
    setCategory(data)
    return data
  }
  const {data, isLoading} = useQuery({
    queryKey:["stack"],
    queryFn: getStackFn
  })
  function handleSubmit(id) {
    navigate(`/xodimlar/${id}`);
  }

  return (
    <>
    {isLoading ? <Loader/> :
    <>
    <Card style={{ width: "99%" }} className="rounded-md mt-2 relative">
        <CardHeader
          style={{ width: "96%" }}
          floated={false}
          shadow={false}
          className="rounded-none"
        >
          <div className="flex flex-col items-center border-b-2 justify-between gap-4 md:flex-row">
            <Tabs value="all" className="w-full p-4 md:w-max">
              <TabsHeader className="">
                {TABS.map(({ label, value }) => (
                  <Tab
                    onClick={() => categoryFilter(value)}
                    key={value}
                    value={value}
                  >
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
            <div className="w-full md:w-72">
              <Input
                onChange={(e) => searchFn(e.target.value)}
                label="Search"
              />
            </div>
          </div>
        </CardHeader>
        <div
          style={{
            marginTop: "30px",
            marginBottom: "30px",
          }}
        >
          <table
            style={{
              width: "95%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            className="text-left border-l-2 table-auto min-w-max"
          >
            <thead className="bg-blue-600">
              <tr>
                <th className="px-4 py-4 w-16 text-left text-sm font-medium text-white uppercase tracking-wider">
                  <p className="text-center">№</p>
                </th>
                <th className="px-4 py-4 w-36 text-left text-sm font-medium text-white uppercase tracking-wider">
                  <p className="text-left">Ismi</p>
                </th>
                <th className="px-4 py-4 w-36 text-left text-sm font-medium text-white uppercase tracking-wider">
                  <p className="text-left">Familyasi</p>
                </th>
                <th className="px-4 py-4 w-32 text-left text-sm font-medium text-white uppercase tracking-wider">
                  <p className="text-left">Telefon raqam</p>
                </th>
                <th className="px-4 py-4 w-36 text-center text-sm font-medium text-white uppercase tracking-wider">
                  <p className="text-center">Lavozimi</p>
                </th>
                <th className="px-4 py-4 w-44 text-left text-sm font-medium text-white uppercase tracking-wider">
                  <p className="text-left">Qaysi filialdaligi</p>
                </th>
                <th className="px-4 py-4 w-28 text-left text-sm font-medium text-white uppercase tracking-wider">
                  <p className="text-center">Izox</p>
                </th>
              </tr>
            </thead>

            <tbody>
              {category &&
                category.map((user, index) => (
                  <tr
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
                      <p
                        onClick={() => handleSubmit(user.id)}
                        className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
                      >
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
                      <p className="block font-sans text-sm antialiased text-center font-normal leading-normal text-blue-gray-900">
                        {user.user_roles}
                      </p>
                    </td>
                    <td className="py-2 px-4 border-b border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {user.filial_name || "N/A"}
                      </p>
                    </td>
                    <td className="py-2 px-4 border-b border-blue-gray-50">
                      <span className="flex items-center justify-center gap-5">
                     
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
                ))}
            </tbody>
          </table>
        </div>
      </Card>
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
          deleteUser={() => deleteUser(userId)}
        />
      </Dialog>
      <ToastContainer />
    </>
    }
      
    </>
  );
}

export default Xodimlar;
