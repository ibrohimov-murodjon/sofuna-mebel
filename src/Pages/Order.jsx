import React, { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";

import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Select,
  Option,
} from "@material-tailwind/react";
import { AddProduct, CardUI, Pagination } from "../components";
function Order() {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://custom.uz/products/order/api/")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Malumot olish hato", error));
  }, []);
  function filterFn(type) {
    setData(
      data.sort((a, b) => {
        if (typeof a[type] == "string") {
          return a[type].localeCompare(b[type]);
        } else {
          return b[type] - a[type];
        }
      })
    );
  }
  return (
    <Card className=" mt-2 rounded-md w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none m-4 ">
        <div className="mb-2 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Orders
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col  gap-2 sm:flex-row">
            <AddProduct api={"https://custom.uz/products/order/api/"} />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll mt-[-30px] prdouct scrol px-0">
        <div className="mt-4 w-full min-w-max table-auto text-left">
          <div className="flex flex-col gap-3">
            {data.length > 0 ? (
              <>
                {data.map((order, index) => {
                  return (
                    <CardUI
                      key={crypto.randomUUID()}
                      user={order}
                      setUiData={setData}
                      uiData={data}
                      api={"https://custom.uz/products/order/api/"}
                    />
                  );
                })}
              </>
            ) : (
              <div className="loaderWrapper">
                <Spinner className="h-12 w-12" />
              </div>
            )}
          </div>
        </div>
      </CardBody>
      <Pagination />
    </Card>
  );
}
export default Order;
