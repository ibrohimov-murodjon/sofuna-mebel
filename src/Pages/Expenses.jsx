import { useEffect, useRef, useState } from "react";
import {
  Button,
  Dialog,
  Tab,
  Tabs,
  TabsHeader,
} from "@material-tailwind/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { DeleteBtn, EditBTn } from "../assets";
import { OutlineDeleteModal, DatePicker } from "../components";
import Loader from "../components/Loader";
import Tag from "../ui/Tag";
import { formatCurrency } from "../utils/helpers";
import { AddElement } from "../fetchMethods/AddMethod";
import { deleteElement } from "../fetchMethods/DeleteMethod";

const API = "https://custom.uz/products/expense/";

const STATUS = [
  {
    label: "Barchasi",
    value: "all",
  },
  {
    label: "Xarajat",
    value: "MATERIAL_COST",
  },
  {
    label: "Ish haqqi",
    value: "SALARY",
  },
  {
    label: "Transport",
    value: "TRANSPORT",
  },
  {
    label: "Boshqa",
    value: "OTHER",
  },
];

function Expenses() {
  const [filteredData, setFilteredData] = useState([]);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const priceInputRef = useRef(null);
  const [userId, setUserId] = useState("");
  const [size, setSize] = useState(null);
  const descriptionInputRef = useRef(null);
  const [updateView, setUpdateView] = useState(false);
  const [selectedType, setSelectedType] = useState("MATERIAL_COST");
  const [category, setCategory] = useState([]);
  const handleOpen = (value) => setSize(value);
  const token = useSelector((state) => state.userToken.token);
  const deleteCloseFun = () => {
    setSize(null);
  };
  //!Get expenses
  const getExpensesFn = async () => {

    const request = await fetch(API);
    const data = await request.json();
    setCategory(data);
    setFilteredData(data);
    return data;
  };
  const { data, isLoading } = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpensesFn,
  });

  function categoryFilter(category) {
    setFilteredData(
      data.filter((order) => {
        if (category == "all") return order.status;
        else return order.status == category;
      })
    );
 
  }
console.log(filteredData)
  const queryClient = useQueryClient();
  const { mutate: deleteMutate } = useMutation({
    mutationFn: (id) => deleteElement(id, API),
    onSuccess: () => {
      toast.success("Xarajat muaffaqiyatli o'chirildi");
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });
    },
    onError: () => alert("Xarajat o'chirishdagi muammo"),
  });

  const { mutate: addMutate } = useMutation({
    mutationFn: (newExpenses) => AddElement(newExpenses, API),
    onSuccess: () => {
      toast.success("Muaffiqiyatli qo'shildi");
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });
      deleteCloseFun();
    },
    onError: () => toast.success("Malumot qo'shishda xatolik!"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!price) {
      toast.error("Iltimos, narxni kiriting.");
      priceInputRef.current.focus();
      return;
    }
    if (!description) {
      toast.error("Iltimos, tavsifni kiriting.");
      descriptionInputRef.current.focus();
      return;
    }
    const decodedToken = jwtDecode(token);
    const newExpenses = {
      user: decodedToken.user_id,
      status: selectedType,
      price: price,
      description: description,
    };
    console.log(newExpenses,127);
    addMutate(newExpenses);
  };
  function handleFilterData(filteredData) {
    // Update the filteredData state with the received data
    setFilteredData(filteredData);
  }
  const handleUpdate = (item) => {
    setUserId(item.id);
    setPrice(item.price);
    setDescription(item.description);
    setUpdateView(true);
  };

  // async function updateExpense(id) {
  //   setLoader(true);
  //   try {
  //     const response = await fetch(`https://custom.uz/products/cost/${id}/`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         price: price,
  //         description: description,
  //       }),
  //     });

  //     if (response.ok) {
  //       notify();
  //       setValueReset();
  //     } else {
  //       console.error("Update error:", response.status);
  //     }
  //   } catch (error) {
  //     console.error("Update error:", error);
  //   } finally {
  //     setLoader(false);
  //   }
  // }
  const setValueReset = () => {
    setPrice("");
    setDescription("");
    setUpdateView(false);
    deleteCloseFun();
  };
  const totalPrice = () => {
    let sum = 0;
    filteredData
      ? filteredData.forEach((item) => (sum += item.price))
      : data.forEach((item) => {
          sum += item.price;
        });
    return sum;
  };
  return (
    <div>
      {isLoading && <Loader />}
      <div
        style={{
          padding: "10px",
          backgroundColor: "white",
          margin: "10px",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>
          <div className="flex items-center gap-24">
            <button
              onClick={() => {
                setDescription("");
                setPrice("");
                setUpdateView(false);
                handleOpen("sm");
              }}
              className="bg-blue-600 py-2 w-[30%] px-8 text-white rounded cursor-pointer"
            >
              Harajat Qo&apos;shish
            </button>
            <DatePicker
              filterDateData={handleFilterData}
              api={"https://custom.uz/products/expense/filter-date/"}
            />
          </div>

          <h3
            style={{
              textAlign: "center",
              fontSize: "30px",
              fontWeight: "bold",
              marginTop: "50px",
            }}
          >
            HARAJATLAR JADVALI
          </h3>
          <Tabs value="all" className="w-full md:w-4/6 mx-auto">
            <TabsHeader className="">
              {STATUS.map(({ label, value }) => (
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

          <table
            style={{
              width: "90%",
              border: "1px solid #eeecec",
              margin: "20px auto",
            }}
            className="text-left border-l-2  table-auto min-w-max "
          >
            <thead>
              <tr>
                <th className="py-4 px-2 w-2 border-b bg-blue-600 text-white">
                  <p className="w-8 text-center block text-sm font-normal leading-none text-white">
                    No
                  </p>
                </th>
                <th className="py-4 px-2 border-b bg-blue-600 text-white">
                  <p className="w-20 block text-sm antialiased font-normal leading-none text-white">
                    Ism
                  </p>
                </th>
                <th className="py-4 px-2 border-b bg-blue-600">
                  <p className=" w-20 block text-sm antialiased font-normal leading-none text-white">
                    Familya
                  </p>
                </th>
                <th className="p-4 border-b bg-blue-600">
                  <p className="w-16 block text-sm antialiased font-normal leading-none text-white">
                    Puli
                  </p>
                </th>

                <th className="p-4 border-b bg-blue-600">
                  <p className=" block text-sm antialiased font-normal leading-none text-white">
                    Nima uchun qo&apos;shilgani
                  </p>
                </th>

                <th className="p-4 border-b bg-blue-600">
                  <p className="text-end block text-sm antialiased font-normal leading-none text-white">
                    Actions
                  </p>
                </th>
              </tr>
            </thead>
            {filteredData
              ? filteredData.map((item, index) => {
                  return (
                    <>
                      <tbody key={index}>
                        <th className="py-4 px-2 w-2 border-b border-blue-gray-50 text-white">
                          <p className="w-8 text-center block text-sm font-normal leading-none text-blue-gray-900">
                            {index + 1}
                          </p>
                        </th>
                        <th className="py-4 px-2 border-b border-blue-gray-50 text-blue-gray-900">
                          <p className="w-20 block text-sm antialiased font-normal leading-none text-blue-gray-900">
                            {item.user.first_name}
                          </p>
                        </th>
                        <th className="py-4 px-2 border-b border-blue-gray-50">
                          <p className=" w-20 block text-sm antialiased font-normal leading-none text-blue-gray-900">
                            {item.user.last_name}
                          </p>
                        </th>
                        <th className="p-4 border-b border-blue-gray-50">
                          <p className="w-16 block text-sm antialiased font-normal leading-none text-blue-gray-900">
                            {formatCurrency(item.price)}
                          </p>
                        </th>

                        <th className="p-4 border-b border-blue-gray-50">
                          <p className=" block text-sm antialiased font-normal leading-none text-blue-gray-900">
                            {item.description}
                          </p>
                        </th>

                        <th className="p-4 border-b border-blue-gray-50">
                          <span className="flex items-center justify-end gap-5">
                            <button
                              className=""
                              onClick={() => {
                                handleUpdate(item);
                                handleOpen("sm");
                              }}
                            >
                              <img src={EditBTn} alt="edit btn" />
                            </button>
                            <button
                              className=""
                              onClick={() => {
                                setUserId(item.id);
                                handleOpen("xs");
                              }}
                            >
                              <img src={DeleteBtn} alt="delete btn" />
                            </button>
                          </span>
                        </th>
                      </tbody>
                    </>
                  );
                })
              : category.map((item, index) => {
                  return (
                    <>
                      <tbody key={index}>
                        <th className="py-4 px-2 w-2 border-b border-blue-gray-50 text-white">
                          <p className="w-8 text-center block text-sm font-normal leading-none text-blue-gray-900">
                            {index + 1}
                          </p>
                        </th>
                        <th className="py-4 px-2 border-b border-blue-gray-50 text-blue-gray-900">
                          <p className="w-20 block text-sm antialiased font-normal leading-none text-blue-gray-900">
                            {item.user.first_name}
                          </p>
                        </th>
                        <th className="py-4 px-2 border-b border-blue-gray-50">
                          <p className=" w-20 block text-sm antialiased font-normal leading-none text-blue-gray-900">
                            {item.user.last_name}
                          </p>
                        </th>
                        <th className="p-4 border-b border-blue-gray-50">
                          <p className="w-16 block text-sm antialiased font-normal leading-none text-blue-gray-900">
                            {formatCurrency(item.price)}
                          </p>
                        </th>

                        <th className="p-4 border-b border-blue-gray-50">
                          <p className=" block text-sm antialiased font-normal leading-none text-blue-gray-900">
                            {item.description}
                          </p>
                        </th>

                        <th className="p-4 border-b border-blue-gray-50">
                          <span className="flex items-center justify-end gap-5">
                            <button
                              className=""
                              onClick={() => {
                                handleUpdate(item);
                                handleOpen("sm");
                              }}
                            >
                              <img src={EditBTn} alt="edit btn" />
                            </button>
                            <button
                              className=""
                              onClick={() => {
                                setUserId(item.id);
                                handleOpen("xs");
                              }}
                            >
                              <img src={DeleteBtn} alt="delete btn" />
                            </button>
                          </span>
                        </th>
                      </tbody>
                    </>
                  );
                })}
          </table>
        </div>
        <div className="ml-auto mr-[60px] flex items-center gap-12">
          <span className="font-bold">Balans: </span>
          <Tag type="green">{formatCurrency(totalPrice())}</Tag>
        </div>
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
            deleteUser={() => deleteMutate(userId)}
          />
        </Dialog>
      </div>
      <Dialog open={size === "sm"} size={size || "sm"} handler={handleOpen}>
        <div
          style={{
            marginTop: "30px",
            backgroundColor: "#eeecec",
            borderRadius: "10px",
            padding: "20px",
            margin: "0px auto",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <h2
            style={{
              margin: " auto",
              marginBottom: "10px",
              textAlign: "center",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            {updateView ? "Harajatni tahrirlash" : "Harajat qo'shish"}
          </h2>
          <form
            onSubmit={handleSubmit}
            style={{ width: "100%", margin: "0px auto" }}
          >
            <div className=" w-full min-w-[200px] h-10">
              <label htmlFor="price">Harajat narxini kiriting</label>
              <input
                style={{ background: "#f5f5f5" }}
                ref={priceInputRef}
                value={price}
                id="price"
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                placeholder=""
                className="block w-full rounded mb-2"
              />
            </div>
            <div className=" w-full min-w-[200px] h-10 mt-8">
              <label htmlFor="type">Harajat turini Tanlang</label>
              <select
                id="type"
                className="block w-full"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="MATERIAL_COST" selected>
                  Moddiy Harajat
                </option>
                <option value="SALARY">Ish Haqqi</option>
                <option value="TRASNPORT">Transport</option>
                <option value="OTHER">Boshqa</option>
              </select>
            </div>
            <div className=" w-full min-w-[200px] h-28 mt-8">
              <label>Nima uchun qo&apos;shilganini ko&apos;rsating</label>
              <textarea
                ref={descriptionInputRef}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ resize: "none", background: "#f5f5f5" }}
                className="block w-full rounded mb-2"
                placeholder=""
              ></textarea>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                marginTop: "20px",
              }}
            >
              {updateView ? (
                <>
                  <Button
                    onClick={setValueReset}
                    style={{ width: "30%", marginRight: "10px" }}
                    color="red"
                  >
                    Tozalash
                  </Button>
                  <Button
                    onClick={() => {
                      updateExpense(userId);
                      deleteCloseFun();
                    }}
                    style={{ width: "30%" }}
                    color="blue"
                  >
                    O&apos;zgartirish
                  </Button>
                </>
              ) : (
                <Button type="submit" style={{ width: "30%" }} color="blue">
                  Qo&apos;shish
                </Button>
              )}
            </div>
          </form>
        </div>
      </Dialog>
      <ToastContainer />
    </div>
  );
}

export default Expenses;
