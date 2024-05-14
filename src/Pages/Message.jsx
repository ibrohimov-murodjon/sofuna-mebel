import { useEffect } from "react";
import { useState } from "react";
import { Orderimg, Productimg } from "../assets";
import { IoSend, IoOptions } from "react-icons/io5";
import { Button, Dialog } from "@material-tailwind/react";
import { Fragment } from "react";
function Message() {
  const [users, setUsers] = useState([]);
  const [messageUI, setMessageUi] = useState([]);
  const [message, setMessage] = useState([]);
  const [headMessage, setHeadMessage] = useState([]);
  const [size, setSize] = useState(null);
  const handleOpen = (value) => setSize(value);
  const [orderData, setOrderData] = useState([]);
  const messageData = {
    sender: "",
    worker: "",
    order: null,
    text: "",
  };
  useEffect(() => {
    fetch("https://custom.uz/users/")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.error("malumot olishta xatolik:", error));
  }, []);
  useEffect(() => {
    fetch("https://custom.uz/products/message_send/api/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMessage(data);
      })
      .catch((error) => console.error("malumot olishta xatolik:", error));
  }, []);
  useEffect(() => {
    fetch("https://custom.uz/products/order/api/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrderData(data);
      })
      .catch((error) => console.error("Malumot olish hato", error));
  }, []);

  function createMessage(id) {
    setMessageUi(
      message.filter((me) => {
        console.log(me.worker == id);
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

  function hendalClick(e) {
    messageData.order = e;
  }


  return (
    <div className="flex  items-start gap-x-2 mt-2">
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
                onClick={() => createMessage(e.id)}
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
          <button>
            <IoOptions />
          </button>
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
          />
          <button onClick={() => submitMessage()}>
            <IoSend className="w-6 h-6" />
          </button>
        </span>
      </div>
      <Dialog
        className="animateModal"
        open={size === "sm"}
        size={size || "md"}
        handler={handleOpen}
      >
        <span>
          {orderData.map((order) => {
            return (
              <div
                key={crypto.randomUUID()}
                onClick={() => {
                  hendalClick(order.id);
                }}
                className="border"
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
