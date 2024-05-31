import { Button, Dialog } from "@material-tailwind/react";
import { DeleteBtn, EditBTn } from "../assets";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Loader, OutlineDeleteModal } from "../components";

function MaxsulotQoshish() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [data, setData] = useState([]);
  const nameInputRef = useRef(null);
  const priceInputRef = useRef(null);
  const [loader, setLoader] = useState(false);
  const [userId, setUserId] = useState("");
  const [updateView, setUpdateView] = useState(false);
  const notify = () => toast.success("Amaliyot muvofaqiyatli bo'ldi");

  const setValueReset = () => {
    setPrice("");
    setName("");
    setUpdateView(false);
    setOpenAddModal(false);
    setOpenDeleteModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!price) {
      toast.error("Iltimos, narxni kiriting.");
      priceInputRef.current.focus();
      return;
    }
    if (!name) {
      toast.error("Iltimos, tavsifni kiriting.");
      nameInputRef.current.focus();
      return;
    }
    const requestData = {
      price: price,
      name: name,
    };
    setOpenAddModal(false);
    setLoader(true);
    try {
      const response = await fetch(
        `https://custom.uz/products/company-product/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setData((prevData) => [...prevData, data]);
        notify();
        setValueReset();
        console.log(data);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://custom.uz/products/company-product/"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [data]);

  async function deleteProduct(id) {
    setLoader(true);
    try {
      const response = await fetch(
        `https://custom.uz/products/company-product/${id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        let copied = JSON.parse(JSON.stringify(data));
        const updatedUiData = copied.filter((user) => user.id !== id);
        setData(updatedUiData);
        setOpenDeleteModal(false);
        notify();
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Error deleting user", {
        position: "top-center",
        autoClose: 1500,
      });
    } finally {
      setLoader(false);
    }
  }

  return (
    <>
      {loader && <Loader />}
      <div
        style={{
          padding: "20px",
          backgroundColor: "white",
          width: "99%",
          marginTop: "10px",
          marginLeft: "4px",
        }}
      >
        <Dialog
          open={openAddModal}
          size="xs"
          handler={() => setOpenAddModal(false)}
          onClose={() => setOpenAddModal(false)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ padding: "30px" }}>
            <h2
              style={{
                margin: " auto",
                marginBottom: "10px",
                textAlign: "center",
                fontSize: "20px",
                color: "black",
                fontWeight: "bold",
              }}
            >
              MAXSULOT QO&apos;SHISH
            </h2>
            <form
              onSubmit={handleSubmit}
              style={{ width: "100%", margin: "0px auto" }}
            >
              <div className="relative w-full min-w-[200px]  mt-6">
                <input
                  ref={nameInputRef}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ resize: "none", background: "#f5f5f5" }}
                  className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-3 rounded-[7px] border-blue-gray-200 focus:border-blue-500 "
                  placeholder=""
                ></input>
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500">
                  Maxsulot nomini kiriting
                </label>
              </div>
              <div className="relative w-full min-w-[200px] mt-6 h-10">
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
                  Maxsulot narxini kiriting
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
                      style={{ width: "50%", marginRight: "10px" }}
                      color="red"
                    >
                      Tozalash
                    </Button>
                    <Button
                      // onClick={() => updateExpense(userId)}
                      style={{ width: "50%" }}
                      color="blue"
                    >
                      O&apos;zgartirish
                    </Button>
                  </>
                ) : (
                  <Button type="submit" style={{ width: "50%" }} color="blue">
                    Qo&apos;shish
                  </Button>
                )}
              </div>
            </form>
          </div>
        </Dialog>
        <div
          style={{ marginLeft: "auto", display: "flex", justifyContent: "end" }}
        >
          <Button
            style={{
              display: "flex",
            }}
            color="blue"
            onClick={() => setOpenAddModal(true)}
          >
            Maxsulot qo&apos;shish
          </Button>
        </div>
        <h1
          style={{
            textAlign: "center",
            fontSize: "25px",
            fontWeight: "bold",
            marginTop: "30px",
          }}
        >
          QO&apos;SHILGAN MAXSULOTLAR JADVALI
        </h1>
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
              <th className="py-4 px-2 w-16 border-b bg-blue-600 text-white">
                <p className="w-16 text-center block font-sans text-sm font-normal leading-none text-white">
                  No
                </p>
              </th>
              <th className="py-4 px-2 border-b bg-blue-600 text-white">
                <p className="w-20 block font-sans text-sm antialiased font-normal leading-none text-white">
                  Nomi
                </p>
              </th>

              <th className="p-4 border-b bg-blue-600">
                <p className="w-16 block font-sans text-sm antialiased font-normal leading-none text-white">
                  Puli
                </p>
              </th>

              <th className="p-4 border-b bg-blue-600">
                <p className="text-end block font-sans text-sm antialiased font-normal leading-none text-white">
                  Actions
                </p>
              </th>
            </tr>
          </thead>

          {data &&
            data.map((item, index) => {
              return (
                <>
                  <tbody key={index}>
                    <th className="py-4 px-2 w-16 border-b border-blue-gray-50 text-white">
                      <p className="w-16 text-center block font-sans text-sm font-normal leading-none text-blue-gray-900">
                        {index + 1}
                      </p>
                    </th>
                    <th className="py-4 px-2 border-b border-blue-gray-50 text-white">
                      <p className="w-20 block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900">
                        {item.name}
                      </p>
                    </th>

                    <th className="p-4 border-b border-blue-gray-50">
                      <p className="w-16 block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900">
                        {item.price}
                      </p>
                    </th>

                    <th className="p-4 border-b border-blue-gray-50">
                      <p className="text-end block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900">
                        <span className="flex items-center justify-end gap-5">
                          <button
                            className=""
                            onClick={() => {
                              //   handleUpdate(item);
                            }}
                          >
                            <img src={EditBTn} alt="edit btn" />
                          </button>
                          <button
                            className=""
                            onClick={() => {
                              setUserId(item.id);
                              setOpenDeleteModal(true);
                            }}
                          >
                            <img src={DeleteBtn} alt="delete btn" />
                          </button>
                        </span>
                      </p>
                    </th>
                  </tbody>
                </>
              );
            })}
        </table>
        <Dialog
          open={openDeleteModal}
          size="xs"
          handler={() => setOpenDeleteModal(false)}
          onClose={() => setOpenDeleteModal(false)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <OutlineDeleteModal
            handleClose={() => setOpenDeleteModal(false)}
            deleteUser={() => deleteProduct(userId)}
          />
        </Dialog>
      </div>
    </>
  );
}

export default MaxsulotQoshish;
