import React from "react";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Option,
  Select,
} from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";
import { AddProduct, CardUI, Pagination } from "../components";
import { useState } from "react";
import { useEffect } from "react";
import { Fragment } from "react";

const TABLE_HEAD = ["Maxsulot", "Narxi", "Soni", "Jami",'Function'];

function Product() {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://custom.uz/products/api/")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Product ditn't added", error));
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
    <div className="MainProductWrapper">
      <Card className=" w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none m-4">
          <div className="mb-2 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Maxsulotlar
              </Typography>
            </div>

            <div className="flex shrink-0 flex-col mb-2 mt-1 gap-2 sm:flex-row">
              <AddProduct api={"https://custom.uz/products/api/"} />
            </div>
          </div>
        </CardHeader>
        <table className="w-full min-w-max table-auto text-left" >
        <thead>
         <tr>
          {TABLE_HEAD.map(item => {
            return(
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
            )
          })}
         </tr>
        </thead>
          <React.Fragment >
            <tbody >
              {data.length > 0 ? (
                <>
                  {data.map((product, index) => {
                    return (
                      <CardUI
                        key={crypto.randomUUID()}
                        user={product}
                        setUiData={setData}
                        uiData={data}
                        api={"https://custom.uz/products/api/"}
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
          </React.Fragment>
        </table>
        <Pagination />
      </Card>
    </div>
  );
}

export default Product;
