import { EntirProduct } from "../Functions/Function";
import { useForm } from "react-hook-form";
import { useState } from "react";
//! Material-tailwind-component
import { Button, Dialog, IconButton } from "@material-tailwind/react";

function AddProduct({ api }) {
  const [size, setSize] = useState(null);
  const handleOpen = (value) => setSize(value);
  const {
    handleSubmit,
    register,
    resetField,
  } = useForm();
  function AddProduct(data) {
    console.log(data);
    const { name, price, qty } = data;
    if (EntirProduct(name, price, qty, dollor_course)) {
      let product = {
        name,
        qty,
        price,
        dollor_course 
      };
      console.log(product);
      fetch(`${api}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Login error:", error);
        });
      resetField("name", { keepDirty: true });
      resetField("price", { keepDirty: true });
      resetField("qty", { keepDirty: true });
    }
  }
  return (
    <>
      <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
        <Button onClick={() => handleOpen("sm")} variant="gradient">
          + Add to card
        </Button>
      </div>

      <Dialog
        className="animateModal"
        open={size === "sm"}
        size={size || "md"}
        handler={handleOpen}
      >
        <span>
          <form
            className="form"
            onSubmit={handleSubmit(AddProduct)}
          >
            <span className="signup">Maxsulot qo'shish</span>
            <input
              {...register("name", { required: "not empty" })}
              type="text"
              placeholder="Maxsulot nomi"
              className="form--input"
            />
            <input
              {...register("price", { required: "not empty" })}
              type="number"
              placeholder="Maxsulot narxi"
              className="form--input"
            />
            <span className="flex items-center">
            <input
              {...register("qty", { required: "not Empty" })}
              type="number"
              placeholder="Mahsulot o'lchami"
              className="form--input"
            />
            <select >
              <option value="kg">kg</option>
              <option value="m">m</option>
              <option value="m/kv">m/kv</option>
            </select>
            </span>
            <input
              {...register("dollar_course", { required: "not Empty" })}
              type="number"
              placeholder="Dollar kursi"
              className="form--input"
            />
            <button className="border py-2 px-5 bg-green-500 " >
              Send
            </button>
          </form>
        </span>
      </Dialog>
    </>
  );
}

export default AddProduct;
