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

function AddProduct({ api, getApi }) {
  const [open, setOpen] = React.useState(false);
  const [productMeasurement, setProductMeasurement] = useState("kg");
  const [productName, setProductName] = useState("");
  const [productQty, setProductQty] = useState("");
  const [buyurtmaTasnifi, setBuyurtmaTasnifi] = useState("");
  const [productNameError, setProductNameError] = useState(false);
  const [productQtyError, setProductQtyError] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const notify = () => toast.success("Amaliyot muvofaqiyatli bo'ldi");
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
    if (
      productName &&
      productQty &&
      api == "https://custom.uz/products/order/api/"
    ) {
      const product = {
        name: productName,
        qty: Number(productQty),
        description: buyurtmaTasnifi,
        measurement: productMeasurement,
      };
      fetch(`https://custom.uz/products/order/api/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          notify();
          getApi();
        })
        .catch((error) => {
          alert("Login error:", error);
        });
      setProductName("");
      setProductQty("");
      setOpen(false);
    }
  };

  return (
    <>
      <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
        <Button onClick={handleOpen} variant="gradient">
          Buyurtma qo'shish
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
                  onChange={(e) => setProductName(e.target.value)}
                  required
                  label="Nomini kiriting"
                  size="lg"
                  error={productNameError}
                />
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
                  <StyledOption value="363b771f-93e7-4dbf-bf46-223f821fb6bd">
                    Kilogram
                  </StyledOption>
                  <StyledOption value="4bd57802-e02c-4fb5-976d-3a2e4a9c9d8b">
                    Dona
                  </StyledOption>
                  <StyledOption value="e89b538c-a32c-4c7d-9495-8e9f6761b683">
                    Metr
                  </StyledOption>
                  <StyledOption value="1c926322-849a-4098-8999-be7ef0a1d198">
                    Metr/kvadrat
                  </StyledOption>
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
