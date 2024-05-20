import React, { useRef, useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
  Dialog,
  Textarea,
} from "@material-tailwind/react";
import { toast, ToastContainer } from "react-toastify";
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

function AddProduct({ api,title, getApi }) {
  const [open, setOpen] = React.useState(false);
  const productTypeRef = useRef("mahsulot");
  const productMeasurementRef = useRef("dona");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQty, setProductQty] = useState("");
  const [productDollarKurs, setProductDollarKurs] = useState("");
  const [buyurtmaBeruvchi, setBuyurtmaBeruvchi] = useState("");
  const [buyurtmaTasnifi, setBuyurtmaTasnifi] = useState("");
  const [productNameError, setProductNameError] = useState(false);
  const [productPriceError, setProductPriceError] = useState(false);
  const [productQtyError, setProductQtyError] = useState(false);
  const [productDollarKursError, setProductDollarKursError] = useState(false);
  const [buyurtmaBeruvchiError, setBuyurtmaBeruvchiError] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

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

    if (productName && productPrice && productQty && buyurtmaBeruvchi && productDollarKurs && api == 'https://custom.uz/products/order/api/' ) {
      const product = {
        name: productName,
        qty: Number(productQty),
        price: Number(productPrice),
        description:buyurtmaTasnifi,
        dollor_course:Number(productDollarKurs),
        order_name: buyurtmaBeruvchi,
        measurement: productMeasurementRef
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
          console.log(data);
          toast.success(data.message, {
            position: "top-right",
            autoClose: 1500,
          });
          getApi();
        })
        .catch((error) => {
          console.error("Login error:", error);
        });
      setProductName("");
      setProductPrice("");
      setProductQty("");
      setOpen(false);
    }else if (productName && productPrice && productQty && productDollarKurs && api == 'https://custom.uz/products/api/' ) {
      const product = {
        name: productName,
        qty: Number(productQty),
        price: Number(productPrice),
        description:buyurtmaTasnifi,
        dollor_course:Number(productDollarKurs),
        order_name: buyurtmaBeruvchi,
        measurement: productMeasurementRef
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
          console.log(data);
          toast.success(data.message, {
            position: "top-right",
            autoClose: 1500,
          });
          getApi();
        })
        .catch((error) => {
          console.error("Login error:", error);
        });
      setProductName("");
      setProductPrice("");
      setProductQty("");
      setOpen(false);
    }
  };

  return (
    <>
      <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
        <Button onClick={handleOpen} variant="gradient">
          {title}ga qo'shish
        </Button>
      </div>
      <Dialog
        size='lg'
        // style={{width:'500pxx'}}
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[730px]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" className="text-center" color="blue-gray">
              {title} qo&apos;shish
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
            <div className="flex items-start flex-col gap-2 w-80">
            <Typography className="-mb-2" variant="h6">
              {title} beruvchi(STIR)
            </Typography>
            <Input
              value={buyurtmaBeruvchi}
              onChange={(e) => setBuyurtmaBeruvchi(e.target.value)}
              required
              label="Buyurtma beruvchi"
              type="number"
              size="lg"
              error={buyurtmaBeruvchiError}
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
                width: '320px',
                padding: "13px 10px",
                marginTop:'3px',
                borderRadius: "7px",
                border: "1px solid #EBEAED",
              }}
              ref={productMeasurementRef}
            >
              <StyledOption value="kg">Kilogram</StyledOption>
              <StyledOption value="m">Metr</StyledOption>
              <StyledOption value="m/2">Metr/kvadrat</StyledOption>
            </Select>
            {title == 'Ombor' ? <><label
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
                width: '320px',
                padding: "13px 10px",
                marginTop:'3px',
                borderRadius: "7px",
                border: "1px solid #EBEAED",
              }}
              ref={productTypeRef}
            >
              <StyledOption value="mahsulot">Mahsulot</StyledOption>
              <StyledOption value="homashyo">Homashyo</StyledOption>
            </Select></> : null}
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
            <Typography className="-mb-2" variant="h6">
              Mahsulot tarifini kiriting
            </Typography>
            <Textarea label="Mahsulot tarifini kiriting"></Textarea>
            <Button variant="gradient" color="green" onClick={handleSubmit} fullWidth>
              Saqlash
            </Button>
          </CardBody>
        </Card>
      </Dialog>
      <ToastContainer />
    </>
  );
}

export default AddProduct;
