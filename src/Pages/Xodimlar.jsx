//Toastify
import "react-toastify/dist/ReactToastify.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { CirclesWithBar } from "react-loader-spinner";
import { Spinner } from "@material-tailwind/react";
import {
  Card,
  CardHeader,
  Input,
  CardBody,
  Tabs,
  TabsHeader,
  Tab,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import CardUI from "../components/CardUi";
import Pagination from "../components/Pagination";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Manager",
    value: "manager",
  },
  {
    label: "Worker",
    value: "worker",
  },
  {
    label: "Admin",
    value: "admin",
  },
];

const TABLE_HEAD = ["Ism Familya ", "Lavozimi", "Taxrirlash"];

function Xodimlar() {
  const [worker, setWorker] = useState([]);
  const [category, setCategory] = useState([]);
  // const [value, setValue] = useState({
  //   username: "",
  //   password: "",
  //   user_roles: "",
  // });
  // function handleUpdate(e, id) {
  // // console.log(id)
  //   e.preventDefault();
  //   fetch(`https://custom.uz/users/${id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json", // JSON formatida ma'lumot yuborish
  //     },
  //     body: JSON.stringify(value),
  //   })
  //     .then((res)=> console.log(res, 'succes updated'))
  //     .catch((error) => {
  //       console.error(error);
  //     });
  //     setModal(false)
  // }
  // function updateUser(user) {
  //   idMember = user.id;
  //   setModal(true);
  //   setValue({
  //     ...value,
  //     username: user.username,
  //     password: user.password,
  //     user_roles: user.user_roles,
  //   });
  // }

  // function deleteUser(id) {
  //   fetch(`https://custom.uz/users/${id}`, { method: "DELETE" })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setWorker(worker.filter((user) => user.id !== id));
  //       setCategory(category.filter((user) => user.id !== id));
  //       toast.success("Deleted User", {
  //         position: "top-right",
  //       });
  //     })
  //     .catch((error) => console.error("Error deleting user:", error));
  // }

  function categoryFilter(category) {
    setCategory(
      worker.filter((user) => {
        if (category == "all") return user.user_roles;
        else return user.user_roles == category;
      })
    );
  }
  function searchFn(word) {
    setCategory(
      worker.filter((user) => {
        return user.username.includes(word);
      })
    );
  }
  useEffect(() => {
    fetch("https://custom.uz/users/")
      .then((res) => res.json())
      .then((data) => {
        setWorker(data);
        setCategory(data);
      })
      .catch((error) => console.error("malumot olishta xatolik:", error));
  }, []);


  return (
    <Card className=" mt-2 w-full relative">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex flex-col items-center border-b-2 justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full p-4 md:w-max">
            <TabsHeader className="">
              {TABS.map(({ label, value }) => (
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
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <div className="overflow-scroll scrol">
        <div className="mt-10 w-full min-w-max table-auto  text-left">
          <div className="flex prdouct flex-col gap-3">
            {category.length > 0 ? (
              <>
                {category.map((el, index) => {
                  return (
                    <CardUI
                      api={"https://custom.uz/users/"}
                      key={crypto.randomUUID()}
                      user={el}
                      setUiData={setCategory}
                      uiData={category}
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
      </div>
      <Pagination />
    </Card>
  );
}
export default Xodimlar;
