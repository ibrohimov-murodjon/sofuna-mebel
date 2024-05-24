import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Tabs,
  TabsHeader,
  Tab,
  Input,
} from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "../components/Loader";
import ProductTable from "../components/ProductTable";
import AddProductModal from "../components/AddProductModal";

const STATUS = [
  {
    label: "Barchasi",
    value: "all",
  },
  {
    label: "Maxsulot",
    value: "mahsulot",
  },
  {
    label: "Homashyo",
    value: "homashyo",
  },
  {
    label: "Tayyor",
    value: "finished_product",
  },
];
function Product() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
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
      setCategory(data);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getApi();
  }, []);

  function categoryFilter(category) {
    setCategory(
      data.filter((order) => {
        if (category == "all") return order.category;
        else return order.category == category;
      })
    );
  }
  function searchFn(word) {
    setCategory(
      data.filter((order) => {
        return order.name.toLowerCase().includes(word);
      })
    );
  }

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="MainProductWrapper ">
          <Card className="w-full rounded-md mt-[-3px]">
            <CardHeader floated={false} shadow={false} className="rounded-none">
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <Typography variant="h5" color="blue-gray">
                    Maxsulotlar
                  </Typography>
                </div>


                <div className="flex shrink-0 flex-col mb-2 mt-1 gap-2 sm:flex-row">
                  <AddProductModal
                    title="Ombor"
                    getApi={getApi}
                    api={"https://custom.uz/products/api/"}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Tabs value="all" className="w-full md:w-max">
                  <TabsHeader className="">
                    {STATUS.map(({ label, value }) => (
                      <Tab
                        onClick={() => categoryFilter(value)}
                        key={value}
                        value={value}
                      >
                        &nbsp;&nbsp;{label}&nbsp;&nbsp;
                      </Tab>
                    ))}
                  </TabsHeader>
                </Tabs>
                <div className="w-full md:w-72">
                  <Input
                    onChange={(e) => searchFn(e.target.value)}
                    label="Search"
                  />
                </div>
              </div>
            </CardHeader>
            <CardBody className="p-0 mt-8">
              <div className="text-left">
                <div className="flex flex-col">
                  {category.length > 0 ? (
                    <>
                      <ProductTable
                        key={crypto.randomUUID()}
                        setUiData={setCategory}
                        uiData={category}
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
          </Card>
        </div>
      )}
    </>
  );
}

export default Product;
