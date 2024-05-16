import { Dialog } from "@material-tailwind/react";
import OutlinedInput from "../components/OutlineInput";
import { useState } from "react";
import OutlineModal from "../components/OutlineModal/OutlineModal";
import Button from "../components/Button/Button";
import OutlineDeleteModal from "../components/OutlineDeleteModal/OutlineDeleteModal";
import OutlineAdUserModal from "../components/OutlineAdUserModal/OutlineAdUserModal";
import OutlineAdProductModal from "../components/OutlineAdProductModal/OutlineAdProductModal";

function Home() {
  const [openUserAdModal, setopenUserAdModal] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [isSuccess, setIsSucces] = useState(false);
  const [message, setMessage] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [size, setSize] = useState(null);

  const handleOpen = (value) => setSize(value);

  const addUsersFun = () => {
    setopenUserAdModal(true);
  };

  const deleteCloseFun = () => {
    setSize(null);
  };

  const [eskizValues, setEskizValues] = useState({
    email: "",
    emailError: false,
    secretKey: "",
    secretKeyError: false,
  });

  const handleEskizChange = (e) => {
    const { name, value } = e.target;
    setEskizValues((prevState) => ({
      ...prevState,
      [name]: value,
      [`${name}Error`]: false,
    }));
  };

  return (
    <>
      <Button width="130px" bgColor="black" value="Text" />
      <button onClick={() => handleOpen("sm")}>Open</button>

      <Dialog
        open={
          size === "xs" ||
          size === "sm" ||
          size === "md" ||
          size === "lg" ||
          size === "xl" ||
          size === "xxl"
        }
        size={size || "md"}
        onClose={() => deleteCloseFun()}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <OutlineAdProductModal
          handleClose={deleteCloseFun}
          selectedItem={selectedTemplate}
          updateFun={dataUpdate}
          setIsSucces={setIsSucces}
          setMessage={setMessage}
          setOpenSnackbar={setOpenSnackbar}
        />
      </Dialog>
    </>
  );
}
Home.propTypes = {};

export default Home;
