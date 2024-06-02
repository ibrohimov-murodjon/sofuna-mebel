import React, { useState, useEffect } from "react";
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
import { EditBTn } from "../assets";
import { GetMeasurement } from "../hooks/GetMeasurement";
import {useMutation, useQueryClient } from '@tanstack/react-query'
import { UpdateElement } from "../fetchMethods/UpdateMethod";
 


const Select = styled.select`
  &:focus {
    outline: none;
    border-color: #0e95d8;
  }
  width: 320px;
  padding: 13px 10px;
  margin-top: 3px;
  border-radius: 7px;
  border: 1px solid #ebeaed;
`;

const StyledOption = styled.option`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-top: 20px;
  width: 300px !important;
`;

const OrderUpdateModal = ({ product }) => {
  const API = 'https://custom.uz/products/order/api/'
  const productId = product.id;
  const { measurementName } = GetMeasurement(product.measurement);
  const [open, setOpen] = useState(false);
  const [productMeasurement, setProductMeasurement] = useState(measurementName);
  const [productName, setProductName] = useState(product.name);
  const [productQty, setProductQty] = useState(product.qty);
  const [buyurtmaTasnifi, setBuyurtmaTasnifi] = useState(product.description);
  const [productNameError, setProductNameError] = useState(false);
  const [productQtyError, setProductQtyError] = useState(false);
  const [measurement, setMeasurement] = useState([]);
  const handleOpen = () => setOpen(!open);
  const queryClient = useQueryClient()
  const {mutate: updateMutate} = useMutation({
    mutationFn: ( updateElement) => UpdateElement(updateElement, API, productId),
    onSuccess: () => {
      toast.success("Muaffaqiyatli o'zgartirildi")
      queryClient.invalidateQueries({
        queryKey:["orders"]
      })
    },
    onError: () => toast.error("Amalyot muaffiqiyatsiz!")
  })
  const handleSubmit = () => {
    if (!productName.trim()) {
      setProductNameError(true);
      return;
    }
    setProductNameError(false);

    if (!productQty) {
      setProductQtyError(true);
      return;
    }
    setProductQtyError(false);

    const updatedProduct = {
      name: productName,
      qty: Number(productQty),
      description: buyurtmaTasnifi,
      measurement: productMeasurement || 'eb65c09d-013e-4019-a0c0-d3328a765cd9',
    };
    updateMutate(updatedProduct)
  };

  useEffect(() => {
    fetch("https://custom.uz/products/measurement/")
      .then((res) => res.json())
      .then((result) => setMeasurement(result));
  }, []);

  return (
    <>
      <button onClick={handleOpen}>
        <img src={EditBTn} alt="edit btn" />
      </button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[730px]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" className="text-center" color="blue-gray">
              Buyurtmani Tahrirlash
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
                  onChange={(e) => setProductMeasurement(e.target.value)}
                >
                  {measurement.map((meas) => (
                    <StyledOption key={meas.id} value={meas.id}>
                      {meas.name}
                    </StyledOption>
                  ))}
                </Select>
                <Typography className="-mb-2" variant="h6">
                  Sonini kiriting
                </Typography>
                <Input
                  value={productQty}
                  onChange={(e) => setProductQty(e.target.value)}
                  required
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
              value={buyurtmaTasnifi}
              onChange={(e) => setBuyurtmaTasnifi(e.target.value)}
            />
            <Button variant="gradient" color="blue" onClick={handleSubmit}>
              Saqlash
            </Button>
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
};

export default OrderUpdateModal;
