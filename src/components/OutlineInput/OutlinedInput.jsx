import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { forwardRef } from "react";

const Content = styled.div`
  input {
    width: 100%;
    color: black;
    height: 48px;
    border: ${(props) =>
      props.isError ? "1px solid #FC5A5A" : "1px solid #EBEAED"};
    border-radius: 5px;
    background-color: ${(props) =>
      props.bgColor ? props.bgColor : "transparent"};
    padding-left: 15px;
    font-size: 14px;
    transition: 0.3s ease;
    &::placeholder {
      color: #84818a;
    }
    &:focus {
      outline: none;
      border-color: #0e95d8;
    }
  }
  .errorMessage {
    color: #fc5a5a;
    margin-left: 13px;
    margin-top: 3px;
    font-size: 12px;
  }
`;

const OutlinedInput = forwardRef(function OutlinedInput(
  {
    id,
    type,
    value,
    onChange,
    placeholder,
    isError,
    bgColor,
    label,
    onPaste,
    returnValue,
    ...props
  },
  ref
) {
  return (
    <Content bgColor={bgColor} isError={isError} onPaste={onPaste}>
      <label
        style={{
          color: "black",
          fontSize: "14px",
          fontWeight: "500",
          lineHeight: "20px",
          textAlign: "left",
        }}
        htmlFor={id ? id : "id-input"}
      >
        {label}
      </label>
      <input
        id={id ? id : "id-input"}
        type={type}
        value={value}
        {...props}
        onChange={(e) => {
          returnValue ? onChange(e) : onChange(e.target.value);
        }}
        // onChange={(e) => {
        //   onChange(e);
        // }}
        placeholder={placeholder}
        ref={ref}
      />
    </Content>
  );
});
OutlinedInput.displayName = "Input";

OutlinedInput.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
  bgColor: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  onPaste: PropTypes.func,
  disabled: PropTypes.bool,
  isError: PropTypes.bool,
};

export default OutlinedInput;
