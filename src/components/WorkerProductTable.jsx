import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";
import { Dialog } from "@material-tailwind/react";

function WorkerProductTable({ setUiData, uiData, api }) {
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="relative flex flex-col w-full h-full text-gray-700 bg-white">
          <table className="text-left border-l-2 table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 w-2 border-b bg-blue-600 text-white">
                  <p className="block font-sans text-sm font-normal leading-none text-white">
                    No
                  </p>
                </th>
                <th className="p-4 border-b bg-blue-600 text-white">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-white">
                    Name
                  </p>
                </th>
                <th className="p-4 border-b bg-blue-600">
                  <p className="block font-sans text-center text-sm antialiased font-normal leading-none text-white">
                    O&apos;lchov
                  </p>
                </th>
                <th className="p-4 border-b bg-blue-600">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-white">
                    Soni
                  </p>
                </th>

                <th className="p-4 border-b bg-blue-600">
                  <p className="block font-sans text-sm text-left antialiased font-normal leading-none text-white">
                    Actions
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {uiData &&
                uiData.map((user, index) => {
                  return (
                    <tr
                      className={`${index % 2 === 0 ? "bg-blue-50" : ""}`}
                      key={user.id}
                    >
                      <td className="p-4 border-b border-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {index + 1}
                        </p>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {user.name?.charAt() + user.name?.slice(1)}
                        </p>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <p className="block font-sans text-center text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {user.measurement}
                        </p>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {user.qty}
                        </p>
                      </td>

                      <td className="p-4 border-b border-blue-gray-50">
                        <span onClick={handleOpen} className="bg-blue-800 text-white p-3 cursor-pointer">
                          Mahsulot Olish
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <div className="bg-white p-3  mx-auto w-full max-w-[730px] h-25     ">
            <input type="text" className="text-black border border-black p-2 w-full mb-2 d-block" placeholder="Miqdorni kiriting" />
            <button className="bg-blue-800 text-white p-2 w-full" >Yuborish</button>
        </div>
      </Dialog>
    </>
  );
}

export default WorkerProductTable;
