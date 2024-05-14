import styled from "@emotion/styled";
import React from "react";

const Button = styled.button`
  padding: 10px 20px;

  &:hover {
    box-shadow: 0 0 20px #6fc5ff50;
    transform: scale(1.05);
    opacity: 0.8;
  }
`;

function index({ value, onClick, bgColor, width }) {
  return (
    <div>
      <Button
        onClick={onClick}
        style={{
          width: width,
          padding: "10px 20px",
          backgroundColor: bgColor,
          color: "white",
          borderRadius: "10px",
          transition: "all 0.5s",
        }}
      >
        {value}
      </Button>
    </div>
  );
}

export default index;
