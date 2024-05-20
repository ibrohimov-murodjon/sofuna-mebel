import {
  Card,
  CardHeader,
  Typography,
  CardBody,
} from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";
import { AddProduct, CardUI, Pagination } from "../components";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "../components/Loader";

function Product() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  async function getApi() {
    try {
      setLoader(true);
      const response = await fetch("https://custom.uz/products/api/");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setData(data);
      setLoader(false);
    } catch (error) {
      setLoader(false);
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
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="MainProductWrapper">
          <Card className=" w-full px-4 rounded-md mt-[-3px]">
            <CardHeader
              floated={false}
              shadow={false}
              className="rounded-none m-4"
            >
              <div className="mb-2 flex items-center justify-between gap-8">
                <div>
                  <Typography variant="h5" color="blue-gray">
                    Maxsulotlar
                  </Typography>
                </div>

                <div className="flex shrink-0 flex-col mb-2 mt-1 gap-2 sm:flex-row">
                  <AddProduct
                    title='Ombor'
                    getApi={getApi}
                    api={"https://custom.uz/products/api/"}
                  />
                </div>
              </div>
            </CardHeader>
            <CardBody className="overflow-scroll mt-[-30px] prdouct scrol px-0">
              <div className="mt-4 w-full min-w-max table-auto text-left">
                <div className="flex flex-col gap-3">
                  {data.length > 0 ? (
                    <>
                      <CardUI
                        key={crypto.randomUUID()}
                        setUiData={setData}
                        uiData={data}
                        api={"https://custom.uz/products/api/"}
                      />
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
        </div>
      )}
    </>
  );
}

export default Product;
