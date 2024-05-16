import styled from "@emotion/styled";

const Button = styled.button`
transition: all 0.3s;
text-align: center;
display: flex;
justify-content: center;
align-items: center;

  &:hover {
    opacity: 0.8;
    transform: scale(1.1);
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
          transition: "all 0.3s",
        }}
      >
        {value}
      </Button>
    </div>
  );
}

export default index;
