import { useRef } from "react";
import styled from "@emotion/styled";
import CloseIcon from "../assets/exit.svg";
import Button from "./Button/Button";

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

function UserAddOrder({ handleClose, AddUser }) {
  const modalRef = useRef(null);
  return (
    <MainWrapper ref={modalRef}>
      <CloseModal onClick={handleClose}>
        <CloseModalIcon src={CloseIcon}></CloseModalIcon>
      </CloseModal>
      <ModalWrapper>
        <ModalHeading>Rosdan ham biriktirmoqchimisiz</ModalHeading>
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
              onClick={AddUser}
              width="130px"
              bgColor="#0E95D8"
              value="Qo'shish"
            />
          </div>
        </div>
      </ModalWrapper>
    </MainWrapper>
  );
}

export default UserAddOrder;
