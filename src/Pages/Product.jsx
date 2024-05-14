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

const TABLE_HEAD = ["Maxsulot", "Narxi", "qty", "Jami", "", " "];

function Product() {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  async function getApi() {
    try {
      const response = await fetch("https://custom.uz/products/api/");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    getApi();
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
      <Card className=" w-full rounded-md mt-[-3px]">
        <CardHeader floated={false} shadow={false} className="rounded-none m-4">
          <div className="mb-2 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Maxsulotlar
              </Typography>
            </div>

            <div className="flex shrink-0 flex-col mb-2 mt-1 gap-2 sm:flex-row">
              <AddProduct
                getApi={getApi}
                api={"https://custom.uz/products/api/"}
              />
            </div>
          </div>
        </CardHeader>
        <span className="flex items-center px-10  bg-blue-gray-200 py-5 gap-x-[210px]">
          <p className="w-full max-w-[250px]">Mahsulot Nomi</p>
          <small className="flex items-center gap-14">
            <p>Narxi</p>
            <p>Soni</p>
            <p>Umumiy narxi</p>
          </small>
        </span>
        <CardBody className="overflow-scroll prdouct scrol px-0">
          <div className="mt-4 w-full min-w-max table-auto text-left">
            <div className="flex flex-col gap-3">
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
            </div>
          </div>
          {/* <table className="mt-4 w-full min-w-max table-auto text-left">
            <div>
              {data.map((product, index) => {
                return (
                  <CardUI
                    key={crypto.randomUUID()}
                    setUiData={setData}
                    uiData={data}
                    user={product}
                    api={"https://custom.uz/products/api/"}
                  />
                );
              })}
            </div>
          </table> */}
        </CardBody>
        <Pagination />
      </Card>
    </div>
  );
}

export default Product;
