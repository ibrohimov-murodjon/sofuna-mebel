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
import { CirclesWithBar } from "react-loader-spinner";
import { Fragment } from "react";

const TABLE_HEAD = ["Maxsulot", "Narxi", "Soni", "Jami", "Function"];
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
    <Card className=" mt-2 w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none m-4 ">
        <div className="mb-2 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Maxsulotlar
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col  gap-2 sm:flex-row">
            <AddProduct api={"https://custom.uz/products/order/api/"} />
          </div>
        </div>
      </CardHeader>
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((item) => {
              return (
                <th
                  key={item}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {item}
                  </Typography>
                </th>
              );
            })}
          </tr>
        </thead>
        <Fragment className="mt-4 w-full min-w-max table-auto text-left">
          <tbody className="overflow-scroll ">
            {data.length > 0 ? (
              <>
                {data.map((product, index) => {
                  return (
                    <CardUI
                      key={crypto.randomUUID()}
                      user={product}
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
          </tbody>
        </Fragment>
      </table>
      <Pagination />
    </Card>
  );
}
export default Order;
