import { Dialog } from "@material-tailwind/react";
import OutlinedInput from "../components/OutlineInput";
import { useState } from "react";
import OutlineModal from "../components/OutlineModal/OutlineModal";
import Button from "../components/Button/Button";

function Home() {
  const [openUserAdModal, setopenUserAdModal] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [isSuccess, setIsSucces] = useState(false);
  const [message, setMessage] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const addUsersFun = () => {
    setopenUserAdModal(true);
  };

  const deleteCloseFun = () => {
    setopenUserAdModal(false);
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
      {/* <OutlinedInput
        placeholder="Secret key"
        name="secretKey"
        value={eskizValues.secretKey}
        onChange={handleEskizChange}
        isError={eskizValues.secretKeyError}
        errorMessage={"Maydonni to'ldiring"}
      /> */}

      <Button width="130px" bgColor="black" value="Text" />
      <button onClick={addUsersFun}>Open</button>
      <Dialog
        open={openUserAdModal}
        onClose={() => setopenUserAdModal(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          with: "700px",
        }}
      >
        <OutlineModal
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
