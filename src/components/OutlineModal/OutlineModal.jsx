import React from "react";
import { useRef, useState } from "react";
import styled from "@emotion/styled";
import CloseIcon from "../../assets/exit.svg";
import OutlinedInput from "../OutlineInput";

const MainWrapper = styled.div`
  position: relative;
  padding: 8px;
  .btn-part {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 40%;
    & > div {
      width: 100%;
    }
  }
`;

const Wrapper = styled.div`
  :last-child {
    padding-bottom: 24px;
  }

  & > p {
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    text-align: left;
    margin-bottom: 9px;
    margin-top: 24px;
    color: black;
    & > span {
      color: red;
    }
  }
`;

const ModalWrapper = styled.div`
  background-color: aqua;
  /* max-width: 400px; */
  /* width: 100%; */
  padding: 36px;
  display: flex;
  flex-direction: column;
  // gap: 24px;
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
`;

const CloseModal = styled.div`
  top: 0px;
  right: 15px;
  top: -10px;
  position: absolute;
  width: 26px;
  height: 26px;
  box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.15);
  padding: 5px;
  border-radius: 78px;
  cursor: pointer;
  z-index: 1;
  background-color: white;
`;

const CloseModalIcon = styled.img`
  width: 16px;
  height: 16px;
  position: absolute;
`;
const InputWrapper = styled.form`
  width: 100%;
`;

function OutlineModal({
  handleClose,
  selectedItem,
  setIsSucces,
  setMessage,
  setOpenSnackbar,
  updateFun,
}) {
  const modalRef = useRef(null);
  return (
    <>
      <MainWrapper ref={modalRef}>
        <CloseModal onClick={handleClose}>
          <CloseModalIcon src={CloseIcon}></CloseModalIcon>
        </CloseModal>

        <ModalWrapper>
          <ModalHeading>Yangi foydalanuvchi qo’shish</ModalHeading>
          <InputWrapper>
            <Wrapper>
              <p>
                Ism va Familiya <span>*</span>
              </p>
              <OutlinedInput
                type="text"
                errorMessage="Iltimos maydonni to'ldiring"
                placeholder="Nomi"
              />
            </Wrapper>

            <Wrapper>
              <p>
                Login <span>*</span>
              </p>
              <OutlinedInput
                type="text"
                errorMessage="Iltimos maydonni to'ldiring"
                placeholder="Nomi"
              />
            </Wrapper>
            <Wrapper>
              <p>
                Parol <span>*</span>
              </p>
              <OutlinedInput
                type="password"
                errorMessage="Iltimos maydonni to'ldiring"
                placeholder="Parol"
              />
            </Wrapper>
          </InputWrapper>
          <div className="btn-part">
            <div>
              <button>Ortga</button>
            </div>
            <div>
              <button>Saqlash</button>
            </div>
          </div>
        </ModalWrapper>
      </MainWrapper>
    </>
  );
}

export default OutlineModal;
