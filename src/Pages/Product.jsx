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
import { useSelector } from "react-redux";
import WorkerProductTable from "../components/WorkerProductTable";
import { useQuery } from "@tanstack/react-query";
import { DatePicker } from "../components";

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
  const [filteredData, setFilteredData] = useState([]);
  const [category, setCategory] = useState([]);
  const role = useSelector((state) => state.userToken.role);
  const fetchProductData = async () => {
    const response = await fetch("https://custom.uz/products/api/");
    const data = await response.json();
    setCategory(data);
    setFilteredData(data);
    return data;
  };
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
  function handleFilterData(filteredData) {
    setFilteredData(filteredData);
  }
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductData,
  });
  return (
    <>
      {isLoading ? (
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
            <DatePicker filterDateData={handleFilterData} />
            <CardBody className="p-0 mt-8">
              <div className="text-left">
                <div className="flex flex-col">
                  {category.length > 0 ? (
                    <>
                      {role == "worker" ? (
                        <WorkerProductTable
                          key={crypto.randomUUID()}
                          setUiData={setCategory}
                          uiData={category}
                          api={"https://custom.uz/products/api/"}
                        />
                      ) : (
                        <ProductTable
                          key={crypto.randomUUID()}
                          setUiData={setCategory}
                          uiData={category}
                          api={"https://custom.uz/products/api/"}
                        />
                      )}
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
