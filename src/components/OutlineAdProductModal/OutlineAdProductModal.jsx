import React from "react";
import { useRef, useState } from "react";
import styled from "@emotion/styled";
import CloseIcon from "../../assets/exit.svg";
import Button from "../Button/Button";
import OutlinedInput from "../OutlineInput";

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

  margin-top: 20px;
`;

function OutlineAdProductModal({ handleClose }) {
  const modalRef = useRef(null);
  return (
    <MainWrapper ref={modalRef}>
      <CloseModal onClick={handleClose}>
        <CloseModalIcon src={CloseIcon}></CloseModalIcon>
      </CloseModal>
      <ModalWrapper>
        <ModalHeading>Mahsulot qo'shish</ModalHeading>
        <form>
          <div
            style={{
              marginBottom: "20px",
              width: "440px",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <OutlinedInput label="Nomi" placeholder="Nomi" type="tel" />
            <OutlinedInput label="Narxi" placeholder="Narxi" type="number" />

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
              O'lchov birligini tanlang
            </label>

            <Select
              style={{
                padding: "15px 10px",
                borderRadius: "7px",
                border: "1px solid #EBEAED",
              }}
            >
              <StyledOption>O&apos;lchov birligini tanlang</StyledOption>
              <StyledOption>Kg</StyledOption>
              <StyledOption>Dona</StyledOption>
              <StyledOption>Litr</StyledOption>
              <StyledOption>Metr</StyledOption>
              <StyledOption>Kvadrat</StyledOption>
            </Select>
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
            <Button width="130px" bgColor="#0E95D8" value="O'chirish" />
          </div>
        </div>
      </ModalWrapper>
    </MainWrapper>
  );
}

export default OutlineAdProductModal;
