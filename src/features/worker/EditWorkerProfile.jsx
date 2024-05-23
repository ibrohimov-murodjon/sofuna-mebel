import { useState } from "react";
import styled from "@emotion/styled";
import OutlinedInput from "../../components/OutlineInput";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";

const FileForm = styled.div`
  border: 2px dashed var(--color-grey-300);
  padding: 20px;
  margin-top: 20px;
  a {
    text-decoration: underline;
    color: var(--color-indigo-700);
  }
`;
function EditWorkerProfile({ onCloseModal, initialUserData, getUser }) {
  const [formData, setFormData] = useState(initialUserData || {});
  const [selectedFile, setSelectedFile] = useState(null);
  const imgFileName = selectedFile?.name;
  function handleFileChange(file) {
    setSelectedFile(file);
  }
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const newFormData = new FormData();
    if (selectedFile) {
      newFormData.append("image", selectedFile);
    }
    newFormData.append("first_name", formData.first_name);
    newFormData.append("last_name", formData.last_name);
    newFormData.append("phone_number", formData.phone_number);
    newFormData.append("username", formData.username);
    fetch(`https://custom.uz/users/${formData.id}/`, {
      method: "PUT",
      body: newFormData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        onCloseModal();
        getUser();
        //  toast.success("Javobingiz yuborildi ", { position: "top-center" });
      })
      .catch((error) => {
        //  toast.error("Javobingiz yuborilmadi ", { position: "top-center" });
        console.error("Error:", error);
      });
    //    .finally(() => setLoading(false));
  };
  return (
    <>
      <Heading as="h3">Profilni tahrirlash</Heading>
      <br />
      <form action="" className="flex flex-col" onSubmit={onSubmit}>
        {formData && (
          <>
            <OutlinedInput
              label="Ism"
              placeholder="Ism"
              type="text"
              name="first_name"
              value={formData.first_name || ""} // Set default value from user data
              onChange={(e) => handleChange(e)}
            />
            <br />
            <OutlinedInput
              label="Familya"
              placeholder="Familya"
              type="text"
              name="last_name"
              value={formData.last_name || ""} // Set default value from user data
              onChange={(e) => handleChange(e)}
            />
            <br />
            <OutlinedInput
              label="Username"
              placeholder="Username"
              type="text"
              name="username"
              value={formData.username || ""} // Set default value from user data
              onChange={(e) => handleChange(e)}
            />
            <br />
            <OutlinedInput
              label="Telefon Raqam"
              placeholder="Telefon Raqam"
              type="text"
              name="phone_number"
              value={formData.phone_number || ""} // Set default value from user data
              onChange={(e) => handleChange(e)}
            />
            <br />
            <FileForm>
              <FileInput
                id="avatar"
                accept="pdf/*"
                onChange={handleFileChange}
                imgFileName={imgFileName}
              />
            </FileForm>
          </>
        )}
        <br />
        <div className="flex items-center gap-6 ml-auto">
          <Button size="small" variation="secondary" onClick={onCloseModal}>
            Bekor qilish
          </Button>
          <Button size="small" variation="primary" type="submit">
            Saqlash
          </Button>
        </div>
      </form>
    </>
  );
}

export default EditWorkerProfile;
