import { useRef, useState } from "react";
import styled from "@emotion/styled";
import CloseIcon from "../../assets/exit.svg";
import Button from "../Button/Button";
import OutlinedInput from "../OutlineInput";
import { toast, ToastContainer } from "react-toastify";

const MainWrapper = styled.div`
  position: relative;
  padding: 8px;
  .btn-part {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

const ModalWrapper = styled.div`
  background-color: aqua;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 20px;
  align-items: center;
`;

const ModalHeading = styled.h2`
  color: rgba(23, 23, 37, 1);
  font-size: 24px;
  font-weight: 600;
  line-height: 36px;
  letter-spacing: 0.10000000149011612px;
  text-align: center;
  margin-bottom: 20px;
`;

const CloseModal = styled.div`
  right: 15px;
  top: -17px;
  position: absolute;
  width: 35px;
  height: 35px;
  box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.15);
  padding: 5px;
  border-radius: 78px;
  cursor: pointer;
  z-index: 1;
  background-color: white;
`;

const CloseModalIcon = styled.img`
  width: 25px;
  height: 25px;
  position: absolute;
`;

const Select = styled.select`
  &:focus {
    outline: none;
    border-color: #0e95d8;
  }
`;

const StyledOption = styled.option`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-top: 20px;
`;

function OutlineAdUserModal({ handleClose }) {
  const selectRef = useRef("worker");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    phoneNumber: false,
    username: false,
    password: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  function validationFunction() {
    const newErrors = { ...errors };
    let isValid = true;

    if (!firstName.trim().length) {
      newErrors.firstName = true;
      isValid = false;
    } else {
      newErrors.firstName = false;
    }

    if (!lastName.trim().length) {
      newErrors.lastName = true;
      isValid = false;
    } else {
      newErrors.lastName = false;
    }

    if (!(phoneNumber.trim().length > 5)) {
      newErrors.phoneNumber = true;
      isValid = false;
    } else {
      newErrors.phoneNumber = false;
    }

    if (!username.trim().length) {
      newErrors.username = true;
      isValid = false;
    } else {
      newErrors.username = false;
    }

    if (!(password.trim().length > 4)) {
      newErrors.password = true;
      isValid = false;
    } else {
      newErrors.password = false;
    }

    setErrors(newErrors);
    return isValid;
  }

  function handleAddUser() {
    if (validationFunction()) {
      setIsLoading(true);
      const newUser = {
        username: username,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        user_roles: selectRef.current?.value,
        image: null,
        password: password,
      };
      fetch(`https://custom.uz/users/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      }).then((res) => res.json());
      handleClose()
        .then((data) => {
          toast.success(data.message, {
            position: "top-right",
            autoClose: 1500,
          });
          handleClose();
        })
        .catch((error) => {
          alert("error:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });

    } else {
      console.log("Form validation failed");
    }
  }


  return (
    <MainWrapper>
      <CloseModal onClick={handleClose}>
        <CloseModalIcon src={CloseIcon} />
      </CloseModal>
      <ModalWrapper>
        <ModalHeading>Hodim qo&apos;shish</ModalHeading>
        <form>
          <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
            <OutlinedInput
              label="Firstname"
              placeholder="Firstname"
              type="text"
              value={firstName}
              onChange={setFirstName}
              isError={errors.firstName}
            />
            <OutlinedInput
              label="Lastname"
              placeholder="Lastname"
              type="text"
              value={lastName}
              onChange={setLastName}
              isError={errors.lastName}
            />
          </div>
          <div
            style={{
              marginBottom: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <OutlinedInput
              label="Phone Number"
              placeholder="+998 (XX) XXX-XX-XX"
              type="tel"
              value={phoneNumber}
              onChange={setPhoneNumber}
              isError={errors.phoneNumber}
            />

            <label
              style={{
                color: "black",
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: "20px",
                textAlign: "left",
                marginBottom: "-10px",
                marginTop: "5px",
              }}
            >
              Hazmat turini tanlang
            </label>
            <Select
              style={{
                padding: "15px 10px",
                borderRadius: "7px",
                border: "1px solid #EBEAED",
              }}
              ref={selectRef}
            >
              <StyledOption value="worker">Worker</StyledOption>
              <StyledOption value="manager">Manager</StyledOption>
              <StyledOption value="admin">Admin</StyledOption>
            </Select>
            <OutlinedInput
              label="Username"
              placeholder="Username"
              type="text"
              value={username}
              onChange={setUsername}
              isError={errors.username}
            />
            <OutlinedInput
              label="Password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={setPassword}
              isError={errors.password}
            />
          </div>
        </form>
        <div className="btn-part">
          <div>
            <Button
              onClick={handleClose}
              width="130px"
              bgColor="#FF0000"
              value="Ortga"
            />
          </div>
          <div>
            <Button
              onClick={handleAddUser}
              width="130px"
              bgColor="#0E95D8"
              value="Qo'shish"
            />
          </div>
        </div>
      </ModalWrapper>

      <ToastContainer />
    </MainWrapper>
  );
}

export default OutlineAdUserModal;
