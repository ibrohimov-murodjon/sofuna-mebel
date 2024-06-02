import React, { useState } from "react";
import styled from "styled-components";

const FileInput = styled.input.attrs({ type: "file" })`
  display: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.label`
  font-size: 1rem;
  padding: 0.8rem 1.2rem;
  margin-right: 1.2rem;
  border-radius: var(--border-radius-sm);
  border: none;
  color: var(--color-brand-50);
  background-color: var(--color-brand-600);
  cursor: pointer;
  transition: color 0.2s, background-color 0.2s;

  &:hover {
    background-color: var(--color-brand-700);
  }
`;

const FileLink = styled.a`
  font-size: 1rem;
  color: var(--color-brand-primary);
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: var(--color-brand-primary-dark);
  }
`;

const FileInputComponent = ({ onChange, imgFileName }) => {
  const [fileName, setFileName] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const shortFilename =
      file.name.slice(0, 5) + (file.name.length > 5 ? "..." : "");
    const fileExtension = file.name.split(".").pop().toLowerCase(); // Get extension in lowercase
    setFileName(`${shortFilename}.${fileExtension}`);
    onChange(file);
  };

  return (
    <ButtonContainer>
      <FileInput id="file-input" accept="image/*" onChange={handleFileChange} />
      <Button htmlFor="file-input">
        {fileName || "Rasmni yuklang"}
      </Button>
      {/* {fileName && (
        <FileLink href={`https://custom.uz/${imgFileName}`} target="_blank">
          {fileName}
        </FileLink>
      )} */}
    </ButtonContainer>
  );
};

export default FileInputComponent;
