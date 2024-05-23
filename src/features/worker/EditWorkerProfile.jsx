import React from "react";
import OutlinedInput from "../../components/OutlineInput";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";

function EditWorkerProfile({ onCloseModal }) {
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Heading as="h3">Profilni tahrirlash</Heading>
      <br />
      <form action="" className="flex flex-col" onSubmit={onSubmit}>
        <OutlinedInput label="Ism" placeholder="Ism" type="text" />
        <br />
        <OutlinedInput label="Familya" placeholder="Familya" type="text" />
        <br />
        <OutlinedInput
          label="Telefon Raqam"
          placeholder="Telefon Raqam"
          type="text"
        />
        <br />
        <OutlinedInput label="Parol" placeholder="Parol" type="password" />
        <br />
        <div className="flex items-center gap-6 ml-auto">
          <Button size="small" variation="secondary" onClick={onCloseModal}>
            Bekor qilish
          </Button>
          <Button size="small" variation="primary">
            Saqlash
          </Button>
        </div>
      </form>
    </>
  );
}

export default EditWorkerProfile;
