import React, { useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
  Dialog,
} from "@material-tailwind/react";
import { toast, ToastContainer } from "react-toastify";

function AddProduct({ api, getApi }) {
  const [open, setOpen] = React.useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQty, setProductQty] = useState("");
  const [productNameError, setProductNameError] = useState(false);
  const [productPriceError, setProductPriceError] = useState(false);
  const [productQtyError, setProductQtyError] = useState(false);

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

    if (productName && productPrice && productQty) {
      const product = {
        name: productName,
        qty: Number(productQty),
        price: Number(productPrice),
        dollor_course: Number(productPrice * productQty),
        total_price: Number(productPrice * productQty),
      };
      console.log(product);
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
          + Add to card
        </Button>
      </div>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" className="text-center" color="blue-gray">
              Mahsulot qo&apos;shish
            </Typography>

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

            <Button variant="gradient" onClick={handleSubmit} fullWidth>
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
