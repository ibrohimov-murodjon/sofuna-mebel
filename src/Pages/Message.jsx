import { useEffect } from "react";
import { useState } from "react";
import { Orderimg, Productimg } from "../assets";
import { IoSend, IoOptions } from "react-icons/io5";
import { Button, Dialog } from "@material-tailwind/react";
import { Fragment } from "react";
import OutlineDeleteModal from "../components/OutlineDeleteModal/OutlineDeleteModal";
function Message() {
  const [users, setUsers] = useState([]);
  const [messageUI, setMessageUi] = useState([]);
  const [message, setMessage] = useState([]);
  const [headMessage, setHeadMessage] = useState([]);
  const [size, setSize] = useState(null);
  const handleOpen = (value) => setSize(value);
  const [orderData, setOrderData] = useState([]);
  const [orderMes, setOrderMes] = useState({})
  const [textMes, setTextMes] = useState('')
  const [workerMes, setWorkerMes] = useState('')
  // const [orderMes, setOrderMes] = useState({})
  const messageData = {
    sender: "c8af4463-936f-4d8e-a384-d06e1f92ec91",
    worker: workerMes,
    order: orderMes,
    text: textMes,
  };
  console.log(messageData);
  useEffect(() => {
    fetch("https://custom.uz/users/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setUsers(data);
      })
      .catch((error) => console.error("malumot olishta xatolik:", error));
  }, []);
  useEffect(() => {
    fetch("https://custom.uz/products/message_send/api/")
      .then((res) => res.json())
      .then((data) => {
        setMessage(data);
      })
      .catch((error) => console.error("malumot olishta xatolik:", error));
  }, []);
  useEffect(() => {
    fetch("https://custom.uz/products/order/api/")
      .then((res) => res.json())
      .then((data) => {
        setOrderData(data);
      })
      .catch((error) => console.error("Malumot olish hato", error));
  }, []);

  function createMessage(id) {
    setMessageUi(
      message.filter((me) => {
        if (me.worker == id) {
          return me;
        }
      })
    );
    setHeadMessage(
      users.filter((user) => {
        if (user.id == id) {
          return user;
        }
      })
    );
  }
  function submitMessage(params) {
    fetch(`https://custom.uz/products/message/api/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  }

  function selectOrder(orderId) {
    let aa = orderData.filter(order => {
      return order.id == orderId
    } )
    const [order] = aa
    setOrderMes(order)
  }


  return (
    <div className="flex items-start gap-x-2 mt-2">
      {/* LEFT_SECTION */}
      <div
        className={`w-full min-w-[250px] max-w-[250px] min-h-[80vh]  h-[85vh] overflow-y-auto flex rounded-md flex-col gap-y-3  px-5 bg-white  pt-4 scroll-m-1 box-border`}
      >
        {users.map((e) => {
          return (
            <Fragment key={crypto.randomUUID()}>
              <div
                className="messageItem flex border  w-[100%] gap-x-3 p-2 "
                key={crypto.randomUUID()}
                onClick={() => {
                  createMessage(e.id),
                  setWorkerMes(e.id)
                }}
              >
                <small className="flex w-full p-2 justify-between">
                  <p>
                    {e.username.charAt().toUpperCase() + e.username.slice(1)}
                  </p>

                  <p>
                    {e.user_roles.charAt().toUpperCase() +
                      e.user_roles.slice(1)}
                  </p>
                </small>
              </div>
            </Fragment>
          );
        })}
      </div>
      {/* RIGHT_SECTION */}
      <div className="flex flex-col justify-between min-h-[80vh] flex-grow h-[85vh] overflow-y-auto">
        {/* header-message */}
        <div className="bg-blue-400 px-3 py-1 flex rounded  items-center justify-between">
          <span className="flex items-center gap-4">
            <img src={headMessage.length > 0 ? headMessage[0]?.image : users[0]?.image} alt="user img" className="w-8 h-8 rounded-full" />
            <small className="flex flex-col ">
              <p className="text-[18px] text-white">
                {headMessage.length > 0
                  ? headMessage[0]?.username
                  : users[0]?.username}
              </p>
              <p className="text-white">
                {headMessage.length > 0
                  ? headMessage[0]?.user_roles
                  : users[0]?.user_roles}
              </p>
            </small>
          </span>
        </div>
        {/* MAIN */}
        <div className="h-[70vh] overflow-y-auto relative mt-2">
          {messageUI.length > 0 ? (
            <div className="flex flex-col gap-y-2 items-end">
              {messageUI.map((e) => {
                console.log(e);
                return (
                  <p
                    className="bg-blue-500 text-white flex items-center w-fit px-4 py-1 rounded-xl"
                    key={crypto.randomUUID()}
                  >
                    {e.text}
                  </p>
                );
              })}
            </div>
          ) : (
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[40px]">
              Message yet😕
            </div>
          )}
        </div>
        {/* footer-message */}
        <span className="flex justify-around items-center bg-blue-gray-200 border-[#6bb9df] border-[3px] gap-x-2 p-3 rounded-md">
          <small className="flex items-center gap-x-2">
            <button onClick={() => handleOpen("sm")}>
              <img className="w-7 h-7" src={Orderimg} />
            </button>
          </small>
          <input
            className="border-[2px] bg-inherit outline-none flex-grow border-none pl-2 "
            placeholder="Send your message"
            type="text"
            onChange={(e) =>  setTextMes(e.target.value)}
          />
          <button onClick={() => submitMessage()}>
            <IoSend className="w-6 h-6" />
          </button>
        </span>
      </div>
      <Dialog
        className="flex items-center  w-full"
        open={size === "sm"}
        size={size || "md"}
        handler={handleOpen}
      >
        <span className=" flex items-center justify-center flex-wrap gap-3 px-4 py-4 ">
          {orderData.map((order) => {
            return (
              <div
                key={crypto.randomUUID()}
                onClick={() => {
                  selectOrder(order.id);
                }}
                className="text-center bg-blue-500 text-white w-32 border px-3 py-2 hover:scale-105"
              >
                <p>{order.name}</p>
              </div>
            );
          })}
        </span>
      </Dialog>
    </div>
  );
}

export default Message;
