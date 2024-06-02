import React, { useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
  Dialog,
  Textarea,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import styled from "@emotion/styled";
import { formatCurrency } from "../utils/helpers";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddElement } from "../fetchMethods/AddMethod";

const Select = styled.select`
  &:focus {
    outline: none;
    border-color: #0e95d8;
  }
`;
const StyledOption = styled.option`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-top: 20px;
`;
function Sold() {
  const Api = `https://custom.uz/products/sold/`;
  const [open, setOpen] = React.useState(false);
  const [productName, setProductName] = useState("");
  const [productQty, setProductQty] = useState("");
  const [productPrice, setproductPrice] = useState("");
  const [productNameError, setProductNameError] = useState(false);
  const [productQtyError, setProductQtyError] = useState(false);
  const [companyProduct, setCompanyProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [buyurtmaBeruvchi, setBuyurtmaBeruvchi] = useState("");
  const [buyurtmachiCompany, setBuyurtmachiCompany] = useState("");
  const [soldData, setsoldData] = useState([]);
  const GetSoldFn = async () => {
    const req = await fetch(Api);
    const data = await req.json();
    setsoldData(data);
    return data;
  };
  const { data, isLoading } = useQuery({
    queryKey: ["sold"],
    queryFn: GetSoldFn,
  });

  console.log(data);

  const handleOpen = () => setOpen((cur) => !cur);

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (newOrder) => AddElement(newOrder, Api),
    onSuccess: () => {
      toast.success("Buyurtma qo'shildi");
      queryClient.invalidateQueries({
        queryKey: ["sold"],
      });
    },
    onError: () => toast.error("Buyurtma qo'shishda muammo"),
  });

  const handleSubmit = () => {
    if (!productName.trim().length > 0) {
      setProductNameError(true);
      return;
    } else {
      setProductNameError(false);
    }
    if (!productQty) {
      setProductQtyError(true);
      return;
    } else {
      setProductQtyError(false);
    }
    if (productName && productQty && selectedProduct) {
      const newOrder = {
        order: selectedProduct.id,
        qty: Number(productQty),
        price: Number(productPrice),
        STIR: buyurtmaBeruvchi,
        company_name: buyurtmachiCompany,
      };
      mutate(newOrder);
      setProductName("");
      setProductQty("");
      setproductPrice("");
      setSelectedProduct(null);
      setOpen(false);
    }
  };
  useEffect(() => {
    fetch("https://custom.uz/products/success-order/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCompanyProduct(data);
        setFilteredProducts(data);
      });
  }, []);

  const handleSearch = (searchTerm) => {
    if (searchTerm === "") {
      setFilteredProducts(companyProduct);
    } else {
      const filtered = companyProduct.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const selectProduct = (product) => {
    setSelectedProduct(product);
    setProductName(product.name);
    setFilteredProducts([]);
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "white",
        width: "99%",
        marginTop: "10px",
      }}
    >
      <div className="flex justify-end shrink-0 flex-col gap-2 sm:flex-row">
        <Button onClick={handleOpen} variant="gradient">
          Sotishga qo&apos;shish
        </Button>
      </div>
      <div>
        <h3 className="text-center font-bold text-2xl mt-5">
          SOTILGAN MAHSULOTLAR RO&apos;YXATI
        </h3>
      </div>
      <div className="relative flex flex-col w-full h-full text-gray-700 bg-white mt-6">
        <table className="text-left border-l-2 table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4 w-2 border-b bg-blue-600 text-white">
                <p className="block font-sans text-sm font-normal leading-none text-white">
                  No
                </p>
              </th>
              <th className="p-4 border-b bg-blue-600 text-white">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-white">
                  Name
                </p>
              </th>

              <th className="p-4 border-b bg-blue-600">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-white">
                  Soni
                </p>
              </th>

              <th className="p-4 border-b bg-blue-600">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-white">
                  Price
                </p>
              </th>
              <th className="p-4 border-b bg-blue-600">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-white">
                  Total price
                </p>
              </th>
              <th className="p-4 border-b bg-blue-600">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-white">
                  NDS Price
                </p>
              </th>

              <th className="p-4 border-b bg-blue-600">
                <p className="block font-sans text-center text-sm antialiased font-normal leading-none text-white">
                  Kompaniya
                </p>
              </th>
            </tr>
          </thead>

          <tbody>
            {soldData &&
              soldData.map((user, index) => {
                return (
                  <tr
                    className={`${index % 2 === 0 ? "bg-blue-50" : ""}`}
                    key={user.id}
                  >
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {index + 1}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {user.order.name}
                      </p>
                    </td>

                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {user.qty}
                      </p>
                    </td>

                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {formatCurrency(user.price)}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                        {formatCurrency(user.total_price)}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                        {formatCurrency(user.ndc_price)}
                      </p>
                    </td>

                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                        {user.company_name}
                      </p>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <Dialog
        size="sm"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[730px]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" className="text-center" color="blue-gray">
              Sotishga qo&apos;shish
            </Typography>
            <div className="flex items-start justify-center gap-x-10 w-full relative">
              <div className="flex items-start flex-col gap-2 w-full">
                <Typography className="-mb-2" variant="h6">
                  Mahsulot nomi
                </Typography>
                <Input
                  style={{ width: "100%" }}
                  value={productName}
                  onChange={(e) => {
                    setProductName(e.target.value);
                    handleSearch(e.target.value);
                  }}
                  required
                  label="Nomini kiriting"
                  size="sm"
                  error={productNameError}
                />
                {filteredProducts.length > 0 && productName !== "" && (
                  <ul className="shadow-xl w-full bg-white z-50 top-[80px] flex flex-col py-3 px-6 absolute ">
                    {filteredProducts.map((product) => (
                      <li
                        key={product.id}
                        onClick={() => selectProduct(product)}
                        style={{
                          cursor: "pointer",
                          padding: "8px 0",
                          borderBottom: "1px solid #ddd",
                          width: "100%",
                          margin: "0 auto",
                        }}
                      >
                        {product.name}
                      </li>
                    ))}
                  </ul>
                )}
                {filteredProducts.length === 0 && !selectedProduct && (
                  <ul className="shadow-xl w-full bg-white z-50 top-[80px] flex flex-col py-3 px-6 absolute">
                    <li>Afsuski, mahsulot topilmadi</li>
                  </ul>
                )}
                <Typography className="-mb-2" variant="h6">
                  Sonini kiriting
                </Typography>
                <Input
                  value={productQty}
                  onChange={(e) => setProductQty(e.target.value)}
                  required
                  label="Sonini kiriting"
                  type="number"
                  size="lg"
                  error={productQtyError}
                />
              </div>
            </div>
            <Typography className="-mb-2" variant="h6">
              Mahsulot narxini kiriting
            </Typography>
            <Input
              type="number"
              value={productPrice}
              onChange={(e) => setproductPrice(e.target.value)}
              label="Mahsulot tarifini kiriting"
            ></Input>
            <Typography className="-mb-2" variant="h6">
              Mahsulot sotilgan kompaniya STIR raqami
            </Typography>
            <Input
              value={buyurtmaBeruvchi}
              onChange={(e) => setBuyurtmaBeruvchi(e.target.value)}
              required
              maxLength="9"
              label="Buyurtma beruvchi"
              type="number"
              size="lg"
            />

            <Typography className="-mb-2" variant="h6">
              Mahsulot sotilgan kompaniya nomi
            </Typography>
            <Input
              value={buyurtmachiCompany}
              onChange={(e) => setBuyurtmachiCompany(e.target.value)}
              required
              label="Buyurtma beruvchi company"
              type="text"
              size="lg"
            />
            <Button
              variant="gradient"
              color="green"
              onClick={handleSubmit}
              fullWidth
            >
              Saqlash
            </Button>
          </CardBody>
        </Card>
      </Dialog>
    </div>
  );
}

export default Sold;
