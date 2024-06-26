import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  Input,
  Spinner,
  Tab,
  Tabs,
  TabsHeader,
} from "@material-tailwind/react";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
} from "@material-tailwind/react";
import { AddOrderModal, DatePicker, Loader, OrderTable, } from "../components";
import { ToastContainer } from "react-toastify";

const STATUS = [
  {
    label: "Barchasi",
    value: "all",
  },
  {
    label: "Aktivmas",
    value: "NO_ACTIVE",
  },
  {
    label: "Jarayonda",
    value: "PENDING",
  },
  {
    label: "Bajarilgan",
    value: "SUCCESSFULLY",
  },
];
function Order() {
  const queryClient = useQueryClient();
  const [category, setCategory] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const fetchOrderData = async () => {
    const response = await fetch(
      "https://custom.uz/products/order-measurement/"
    );
    let data = await response.json();
    data = data.reverse()
    setCategory(data);
    setFilteredData(data);
    return data;
  };
  function handleFilterData(filteredData) {
    // Update the filteredData state with the received data
    setFilteredData(filteredData);
  }
  function categoryFilter(category) {
    setFilteredData(
      data.filter((order) => {
        console.log(order);
        if (category == "all") return order.status;
        else return order.status == category;
      })
    );
  }

  function searchFn(word) {
    setFilteredData(
      data.filter((order) => {
        return order.name.toLowerCase().includes(word);
      })
    );
  }
  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrderData,
    // onSuccess: () => {
    //   queryClient.invalidateQueries({
    //     queryKey:['orders'],
    //   })
    // }
  });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Card className=" mt-2 rounded-md w-full relative">
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
                <AddOrderModal api="https://custom.uz/products/order/api/" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Tabs value="all" className="w-full p-4 md:w-max">
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
                  // icon={< className="h-5 w-5" />}
                />
              </div>
            </div>
          </CardHeader>
          <div className="fixed right-[28%] top-[20.7%] z-[100] w-[21%]">
            <DatePicker
              data={category}
              filterDateData={handleFilterData}
              api={"https://custom.uz/products/order/filter-date/"}
            />
          </div>
          <CardBody className="p-0">
            <div className=" w-full min-w-max table-auto text-left">
              <div className="flex flex-col gap-3">
                {category.length > 0 ? (
                  <>
                    <OrderTable
                      key={crypto.randomUUID()}
                      setUiData={setCategory}
                      uiData={category}
                      api={"https://custom.uz/products/order/api/"}
                      filteredData={filteredData}
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
      )}
      <ToastContainer/>
    </>
  );
}
export default Order;
