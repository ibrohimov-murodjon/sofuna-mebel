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

function AddOrderModal({ api, title, getApi }) {
  const [open, setOpen] = React.useState(false);
  const [productType, setProductType] = useState("mahsulot");
  const [productMeasurement, setProductMeasurement] = useState("kg");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQty, setProductQty] = useState("");
  const [productDollarKurs, setProductDollarKurs] = useState("");
  const [buyurtmaBeruvchi, setBuyurtmaBeruvchi] = useState("");
  const [payment, setPayment] = useState("");
  const [buyurtmachiCompany, setBuyurtmachiCompany] = useState("");
  const [productNameError, setProductNameError] = useState(false);
  const [productPriceError, setProductPriceError] = useState(false);
  const [productQtyError, setProductQtyError] = useState(false);
  const [paymentError, setPaymentError] = useState(false);
  const [productDollarKursError, setProductDollarKursError] = useState(false);
  const [buyurtmaBeruvchiError, setBuyurtmaBeruvchiError] = useState(false);
  const [buyurtmachiCompanyError, setBuyurtmachiCompanyBeruvchiError] =
    useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const notify = () => toast.success("Amaliyot muvofaqiyatli bo'ldi");
  const handleSubmit = () => {
    if (!productName.trim().length > 0) {
      setProductNameError(true);
      return;
    } else {
      setProductNameError(false);
    }
    if (!productPrice) {
      setProductPriceError(true);
      return;
    } else {
      setProductPriceError(false);
    }
    if (!productQty) {
      setProductQtyError(true);
      return;
    } else {
      setProductQtyError(false);
    }
    if (!payment) {
      setPaymentError(true);
      return;
    } else {
      setPaymentError(false);
    }
    if (!buyurtmaBeruvchi) {
      setBuyurtmaBeruvchiError(true);
      return;
    } else {
      setBuyurtmaBeruvchiError(false);
    }
    if (!productDollarKurs) {
      setProductDollarKursError(true);
      return;
    } else {
      setProductDollarKursError(false);
    }
    if (!buyurtmachiCompany) {
      setBuyurtmachiCompanyBeruvchiError(true);
      return;
    } else {
      setBuyurtmachiCompanyBeruvchiError(false);
    }
    if (
      productName &&
      productPrice &&
      productQty &&
      productDollarKurs &&
      api == "https://custom.uz/products/api/"
    ) {
      const product = {
        name: productName,
        qty: Number(productQty),
        price: Number(productPrice),
        dollor_course: Number(productDollarKurs),
        description: "yaxshi",
        measurement: productMeasurement,
        category: productType,
        payment: payment,
      };
      fetch(`${api}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((data) => {
          notify();
          getApi();
        })
        .catch((error) => {
          console.error("Login error:", error);
        });
      setProductName("");
      setProductPrice("");
      setProductQty("");
      setOpen(false);
    } else {
      console.log(1212121);
    }
  };


  return (
    <>
      <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
        <Button onClick={handleOpen} variant="gradient">
          Omborga qo'shish
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
              Omborga qo&apos;shish
            </Typography>
            <div className="flex items-start justify-center gap-x-10 w-full">
              <div className="flex items-start flex-col gap-2 w-80">
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
                  Buyurtma turini tanlang
                </label>
                <Select
                  style={{
                    width: "320px",
                    padding: "13px 10px",
                    marginTop: "3px",
                    borderRadius: "7px",
                    border: "1px solid #EBEAED",
                  }}
                  onChange={(e) => setProductType(e.target.value)}
                >
                  <StyledOption value="mahsulot">Mahsulot</StyledOption>
                  <StyledOption value="homashyo">Homashyo</StyledOption>
                  <StyledOption value="finished_product">
                    Tayyor mahsulot
                  </StyledOption>
                </Select>
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
                  <StyledOption value="kg">Kilogram</StyledOption>
                  <StyledOption value="m">Metr</StyledOption>
                  <StyledOption value="m/2">Metr/kvadrat</StyledOption>
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
                <Typography className="-mb-2" variant="h6">
                  Maxsulot narxi
                </Typography>
                <Input
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  required
                  label="Narx kiriting"
                  type="number"
                  size="lg"

                  error={productPriceError}
                />
              </div>
              <div className="flex items-start flex-col gap-2 w-80">
                <Typography className="-mb-2" variant="h6">
                  {title} beruvchi(STIR)
                </Typography>
                <Input
                  value={buyurtmaBeruvchi}
                  onChange={(e) => setBuyurtmaBeruvchi(e.target.value)}
                  required
                  maxLength="9"
                  label="Buyurtma beruvchi"
                  type="number"
                  size="lg"
                  error={buyurtmaBeruvchiError}
                />

                <Typography className="-mb-2" variant="h6">
                  Mahsulot oluvchi companiya nomi
                </Typography>
                <Input
                  value={buyurtmachiCompany}
                  onChange={(e) => setBuyurtmachiCompany(e.target.value)}
                  required
                  label="Buyurtma beruvchi company"
                  type="text"
                  size="lg"
                  error={buyurtmachiCompanyError}
                />

                <Typography className="-mb-2" variant="h6">
                  Qilingan to'lov
                </Typography>
                <Input
                  value={payment}
                  onChange={(e) => setPayment(e.target.value)}
                  required
                  label="Qilingan to'lov"
                  size="lg"
                  error={paymentError}
                />
                <Typography className="-mb-2" variant="h6">
                  Dollar kursi
                </Typography>
                <Input
                  value={productDollarKurs}
                  onChange={(e) => setProductDollarKurs(e.target.value)}
                  required
                  label="Dollar kursini kiriting"
                  type="number"
                  size="lg"
                  error={productDollarKursError}
                />
              </div>
            </div>

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

export default AddOrderModal;
