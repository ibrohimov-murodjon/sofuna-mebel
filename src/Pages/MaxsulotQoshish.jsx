import { useEffect, useRef, useState } from "react";
import { Dialog } from "@material-tailwind/react";
import styled from "@emotion/styled";
import { DeleteBtn, EditBTn } from "../assets";
import { toast } from "react-toastify";
import { Loader, OutlineDeleteModal } from "../components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteElement } from "../fetchMethods/DeleteMethod";
import { AddElement } from "../fetchMethods/AddMethod";
import OutlinedInput from "../components/OutlinedInput";
import { formatCurrency } from "../utils/helpers";
import FileInput from "../ui/FileInput";
import Button from "../ui/Button";

const FileForm = styled.div`
  border: 2px dashed var(--color-grey-300);
  padding: 20px;
  margin-top: 20px;
  a {
    text-decoration: underline;
    color: var(--color-indigo-700);
  }
`;

function MaxsulotQoshish() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const nameInputRef = useRef(null);
  const priceInputRef = useRef(null);
  const [userId, setUserId] = useState("");
  const [updateView, setUpdateView] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const setValueReset = () => {
    setPrice("");
    setName("");
    setUpdateView(false);
    setOpenAddModal(false);
    setOpenDeleteModal(false);
  };
  const API = "https://custom.uz/products/company-product/";
  const queryClient = useQueryClient();
  const getAddProductFn = async () => {
    const request = await fetch(API);
    let response = await request.json();
    return response.reverse();
  };
  const { data, isLoading } = useQuery({
    queryKey: ["addProducts"],
    queryFn: getAddProductFn,
  });
  const { mutate: deleteMutate } = useMutation({
    mutationFn: (id) => deleteElement(id, API),
    onSuccess: () => {
      toast.success("Masulot muaffaqiyatli o'chirildi");
      queryClient.invalidateQueries({
        queryKey: ["addProducts"],
      });
    },
    onError: () => toast.success("Mahsulot o'chirishdagi xatolik!"),
  });
  const { mutate: addMutate } = useMutation({
    mutationFn: (newData) => AddElement(newData, API),
    onSuccess: () => {
      toast.success("Malumot muaffaqiyatli qo'shildi");
      queryClient.invalidateQueries({
        queryKey: ["addProducts"],
      });
    },
    onError: () => toast.error("Malumot qo'shishdagi xatolik!"),
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFormData = new FormData();
    if (selectedFile) {
      newFormData.append("image", selectedFile);
    }
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
    newFormData.append("name", name);
    newFormData.append("price", price);
    // const newData = {
    //   price: price,
    //   name: name,
    // };
    fetch(API, {
      method: "POST",
      body: newFormData,
    })
      .then((response) => response.json())
      .then((data) => {
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setName("");
    setPrice("");
    setOpenAddModal(false);
    // addMutate(newFormData);
  };

  function handleFileChange(file) {
    setSelectedFile(file);
  }

  return (
    <>
      {isLoading && <Loader />}
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
              <OutlinedInput
                label="Maxsulot nomini kiriting"
                type="text"
                ref={nameInputRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Maxsulot nomi"
              />
              <br />
              <OutlinedInput
                label="Maxsulot narxini kiriting"
                ref={priceInputRef}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                placeholder="Maxsulot narxi"
              />
              <FileForm>
                <FileInput
                  id="avatar"
                  accept="pdf/*"
                  onChange={handleFileChange}
                  //   imgFileName={imgFileName}
                />
              </FileForm>

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
                  <Button size="small" variation="primary" type="submit">
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
            size="medium"
            variation="primary"
            type="submit"
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
                <p className="w-16 text-center block text-sm font-normal leading-none text-white">
                  No
                </p>
              </th>
              <th className="py-4 px-2 border-b bg-blue-600 text-white">
                <p className="w-20 block text-sm antialiased font-normal leading-none text-white">
                  Nomi
                </p>
              </th>

              <th className="p-4 border-b bg-blue-600">
                <p className="w-16 block text-sm antialiased font-normal leading-none text-white">
                  Puli
                </p>
              </th>

              <th className="p-4 border-b bg-blue-600">
                <p className="text-end block text-sm antialiased font-normal leading-none text-white">
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
                      <p className="w-16 text-center block text-sm font-normal leading-none text-blue-gray-900">
                        {index + 1}
                      </p>
                    </th>
                    <th className="py-4 px-2 border-b border-blue-gray-50 text-white">
                      <p className="w-20 block text-sm antialiased font-normal leading-none text-blue-gray-900">
                        {item.name}
                      </p>
                    </th>

                    <th className="p-4 border-b border-blue-gray-50">
                      <p className="w-16 block text-sm antialiased font-normal leading-none text-blue-gray-900">
                        {formatCurrency(item.price)}
                      </p>
                    </th>

                    <th className="p-4 border-b border-blue-gray-50">
                      <p className="text-end block text-sm antialiased font-normal leading-none text-blue-gray-900">
                        <span className="flex items-center justify-end gap-5">
                          <button
                            className=""
                            onClick={() => {
                              handleUpdate(item);
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
            deleteUser={() => deleteMutate(userId)}
          />
        </Dialog>
      </div>
    </>
  );
}
export default MaxsulotQoshish;
