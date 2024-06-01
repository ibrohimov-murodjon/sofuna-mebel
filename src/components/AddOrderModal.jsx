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
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
function AddProduct({ api }) {
  const [open, setOpen] = React.useState(false);
  const [productMeasurement, setProductMeasurement] = useState("kg");
  const [productName, setProductName] = useState("");
  const [productQty, setProductQty] = useState("");
  const [buyurtmaTasnifi, setBuyurtmaTasnifi] = useState("");
  const [productNameError, setProductNameError] = useState(false);
  const [productQtyError, setProductQtyError] = useState(false);
  const [measurement, setMeasurement] = useState([]);
  const [companyProduct, setCompanyProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpen = () => setOpen((cur) => !cur);
  const notify = () => toast.success("Amaliyot muvofaqiyatli bo'ldi");

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (newOrder) => AddElement(newOrder, api),
    onSuccess: () => {
      toast.success("Buyurtma qo'shildi");
      queryClient.invalidateQueries({
        queryKey: ["orders"],
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
        name: selectedProduct.name,
        qty: Number(productQty),
        description: buyurtmaTasnifi,
        measurement: productMeasurement,
      };
      mutate(newOrder);
      setProductName("");
      setProductQty("");
      setBuyurtmaTasnifi("");
      setSelectedProduct(null);
      setOpen(false);
    }
  };
  // fetch company product data
  useEffect(() => {
    fetch("https://custom.uz/products/company-product/")
      .then((response) => response.json())
      .then((data) => {
        setCompanyProduct(data);
        setFilteredProducts(data);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    fetch("https://custom.uz/products/measurement/")
      .then((res) => res.json())
      .then((result) => setMeasurement(result));
  }, []);

  const handleSearch = (searchTerm) => {
    if (searchTerm === "") {
      setFilteredProducts(companyProduct); // Show all products if search input is empty
    } else {
      const filtered = companyProduct.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const selectProduct = (product) => {
    setSelectedProduct(product);
    setProductName(product.name); // Set product name in the input
    setFilteredProducts([]); // Clear filtered products
  };


  return (
    <>
      <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
        <Button onClick={handleOpen} variant="gradient">
          Buyurtma qo&apos;shish
        </Button>
      </div>
      <Dialog
        size="lg"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[730px]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" className="text-center" color="blue-gray">
              Buyurtma qo&apos;shish
            </Typography>
            <div className="flex items-start justify-center gap-x-10 w-full">
              <div className="flex items-start flex-col gap-2 w-80">
                <Typography className="-mb-2" variant="h6">
                  Mahsulot nomi
                </Typography>
                <Input
                  value={productName}
                  onChange={(e) => {
                    setProductName(e.target.value);
                    handleSearch(e.target.value); // Trigger search as user types
                  }}
                  required
                  label="Nomini kiriting"
                  size="lg"
                  error={productNameError}
                />
                {filteredProducts.length > 0 ? (
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {filteredProducts.map((product) => (
                      <li
                        key={product.id}
                        onClick={() => selectProduct(product)}
                        style={{
                          cursor: "pointer",
                          padding: "8px 0",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        {product.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No product data found</p>
                )}
                <label
                  style={{
                    color: "black",
                    fontSize: "17px",
                    fontWeight: "600",
                    lineHeight: "20px",
                    textAlign: "left",
                    marginBottom: "-10px",
                    marginTop: "5px",
                  }}
                >
                  O'lchov birligini tanlang
                </label>
                <Select
                  style={{
                    width: "320px",
                    padding: "13px 10px",
                    marginTop: "3px",
                    borderRadius: "7px",
                    border: "1px solid #EBEAED",
                  }}
                  onChange={(e) => setProductMeasurement(e.target.value)}
                >
                  {measurement.map((meas) => {
                    return (
                      <StyledOption key={crypto.randomUUID()} value={meas.id}>
                        {meas.name}
                      </StyledOption>
                    );
                  })}
                </Select>
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
              Mahsulot tarifini kiriting
            </Typography>
            <Textarea
              onChange={(e) => setBuyurtmaTasnifi(e.target.value)}
              label="Mahsulot tarifini kiriting"
            ></Textarea>
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
    </>
  );
}

export default AddProduct;
