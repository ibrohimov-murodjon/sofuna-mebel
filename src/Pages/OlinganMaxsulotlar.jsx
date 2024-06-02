import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  padding: 10px;
  background-color: white;
  margin: 10px;
  & > h3 {
    text-align: center;
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 15px;
  }
`;
const Card = styled.div`
  padding: 10px;
  border: 1px solid black;
  width: 24%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(217, 217, 217, 0.58);
  border: 1px solid white;
  border-radius: 17px;
  cursor: pointer;
  transition: all 0.5s;
  color: black;
  :hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

function OlinganMaxsulotlar() {
  const [data, setData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://custom.uz/products/worker-product-get/")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        console.log(data.products);
      });
  }, []);

  const handleCardClick = (id) => {
    navigate(`/olinganlar/${id}/`);
  };

  return (
    <Wrapper>
      <h3>Ombordan maxsulot olganlar ishchilar ro&apos;yhati</h3>
      <CardWrapper>
        {data &&
          data.map((el, index) => {
            return (
              <Card onClick={() => handleCardClick(el.id)} key={index}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p>{el.first_name}</p>
                  <p>{el.last_name}</p>
                </div>
                <h4>{el.products[0].created_at}</h4>
              </Card>
            );
          })}
      </CardWrapper>
    </Wrapper>
  );
}

export default OlinganMaxsulotlar;
