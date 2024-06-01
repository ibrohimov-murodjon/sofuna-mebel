import { useEffect, useRef, useState } from "react";
import { Button, Dialog } from "@material-tailwind/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { DeleteBtn, EditBTn } from "../assets";
import { OutlineDeleteModal, DatePicker } from "../components";
import Loader from "../components/Loader";
import Tag from "../ui/Tag";
import { formatCurrency } from "../utils/helpers";
import { AddElement } from "../fetchMethods/AddMethod";
import { deleteElement } from "../fetchMethods/DeleteMethod";

const API = 'https://custom.uz/products/cost/'
function Expenses() {
  const [filteredData, setFilteredData] = useState([]);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const priceInputRef = useRef(null);
  const [userId, setUserId] = useState("");
  const [size, setSize] = useState(null);
  const descriptionInputRef = useRef(null);
  const [loader, setLoader] = useState(false);
  const [updateView, setUpdateView] = useState(false);
  const handleOpen = (value) => setSize(value);
  const token = useSelector((state) => state.userToken.token);
  const deleteCloseFun = () => {
    setSize(null);
  };
  //!Get expenses
  const getExpensesFn = async () => {
    const request = await fetch(API)
    const response = await request.json()
    setFilteredData(response);
    return response
  }
  const {data, isLoading } = useQuery({
    queryKey:["expenses"],
    queryFn:getExpensesFn
  })
  //! DELETE
  const queryClient = useQueryClient()
  const {mutate: deleteMutate} = useMutation({
    mutationFn: (id) => deleteElement(id, API),
    onSuccess: () => {
      toast.success("Xarajat muaffaqiyatli o'chirildi")
      queryClient.invalidateQueries({
        queryKey:['expenses']
      })
    },
    onError: () => alert("Xarajat o'chirishdagi muammo")
  })

    const { mutate: addMutate } = useMutation({
      mutationFn: (newExpenses) => AddElement(newExpenses, API),
      onSuccess: () => {
        toast.success("Muaffiqiyatli qo'shildi")
        queryClient.invalidateQueries({
          queryKey: ["expenses"]
        })
      },
      onError: () => toast.success("Malumot qo'shishda xatolik!")
    })

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
      //! Add expenses
    const newExpenses = {
      user: decodedToken.user_id,
      price: price,
      description: description,
    };
    addMutate(newExpenses)
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
    deleteCloseFun()
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
      {loader && <Loader />}
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
              setDescription('')
              setPrice('')
              setUpdateView(false);
              handleOpen('sm')
            }}
              className="bg-blue-600 py-2 w-[30%] px-8 text-white rounded cursor-pointer"
            >
              Harajat Qo&apos;shish
            </button>
            <DatePicker
              filterDateData={handleFilterData}
              api={"https://custom.uz/products/cost/filter-date/"}
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
                  <p className="w-8 text-center block font-sans text-sm font-normal leading-none text-white">
                    No
                  </p>
                </th>
                <th className="py-4 px-2 border-b bg-blue-600 text-white">
                  <p className="w-20 block font-sans text-sm antialiased font-normal leading-none text-white">
                    Ism
                  </p>
                </th>
                <th className="py-4 px-2 border-b bg-blue-600">
                  <p className=" w-20 block font-sans text-sm antialiased font-normal leading-none text-white">
                    Familya
                  </p>
                </th>
                <th className="p-4 border-b bg-blue-600">
                  <p className="w-16 block font-sans text-sm antialiased font-normal leading-none text-white">
                    Puli
                  </p>
                </th>

                <th className="p-4 border-b bg-blue-600">
                  <p className=" block font-sans text-sm antialiased font-normal leading-none text-white">
                    Nima uchun qo&apos;shilgani
                  </p>
                </th>

                <th className="p-4 border-b bg-blue-600">
                  <p className="text-end block font-sans text-sm antialiased font-normal leading-none text-white">
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
                          <p className="w-8 text-center block font-sans text-sm font-normal leading-none text-blue-gray-900">
                            {index + 1}
                          </p>
                        </th>
                        <th className="py-4 px-2 border-b border-blue-gray-50 text-blue-gray-900">
                          <p className="w-20 block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900">
                            {item.user.first_name}
                          </p>
                        </th>
                        <th className="py-4 px-2 border-b border-blue-gray-50">
                          <p className=" w-20 block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900">
                            {item.user.last_name}
                          </p>
                        </th>
                        <th className="p-4 border-b border-blue-gray-50">
                          <p className="w-16 block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900">
                            {formatCurrency(item.price)}
                          </p>
                        </th>

                        <th className="p-4 border-b border-blue-gray-50">
                          <p className=" block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900">
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
              : data.map((item, index) => {
                  return (
                    <>
                      <tbody key={index}>
                        <th className="py-4 px-2 w-2 border-b border-blue-gray-50 text-white">
                          <p className="w-8 text-center block font-sans text-sm font-normal leading-none text-blue-gray-900">
                            {index + 1}
                          </p>
                        </th>
                        <th className="py-4 px-2 border-b border-blue-gray-50 text-blue-gray-900">
                          <p className="w-20 block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900">
                            {item.user.first_name}
                          </p>
                        </th>
                        <th className="py-4 px-2 border-b border-blue-gray-50">
                          <p className=" w-20 block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900">
                            {item.user.last_name}
                          </p>
                        </th>
                        <th className="p-4 border-b border-blue-gray-50">
                          <p className="w-16 block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900">
                            {formatCurrency(item.price)}
                          </p>
                        </th>

                        <th className="p-4 border-b border-blue-gray-50">
                          <p className=" block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900">
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
            <div className="relative w-full min-w-[200px] h-10">
              <input
                style={{ background: "#f5f5f5" }}
                ref={priceInputRef}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-3 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
                placeholder=" "
              />
              <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500">
                Harajat narxini kiriting
              </label>
            </div>
            <div className="relative w-full min-w-[200px] h-28   mt-6">
              <textarea
                ref={descriptionInputRef}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ resize: "none", background: "#f5f5f5" }}
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-3 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
                placeholder=""
              ></textarea>
              <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500">
                Nima uchun qo&apos;shilganini ko&apos;rsating
              </label>
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
    </div>
  );
}

export default Expenses;
