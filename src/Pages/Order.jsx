import { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";

import {
  Card,
  CardHeader,
  Typography,
  CardBody,
} from "@material-tailwind/react";
import { AddProduct, CardUI, Pagination } from "../components";
import Loader from "../components/Loader";

function Order() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  async function getApi() {
    try {
      setLoader(true);
      const response = await fetch("https://custom.uz/products/order/api/");
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

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <Card className=" mt-2 rounded-md w-full">
          <CardHeader
            floated={false}
            shadow={false}
            className="rounded-none m-4 "
          >
            <div className="mb-2 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Orders
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col  gap-2 sm:flex-row">
                <AddProduct
                  title="Buyurtma"
                  api={"https://custom.uz/products/order/api/"}
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
                      api={"https://custom.uz/products/order/api/"}
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
      )}
    </>
  );
}
export default Order;
