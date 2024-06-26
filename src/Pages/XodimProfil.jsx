import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../ui/Button";
import Tag from "../ui/Tag";
import Modal from "../ui/Modal";
import {EditWorkerProfile} from "../components";

const StyledTodayItem = styled.li`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  justify-content: space-between;
  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 2px solid var(--color-grey-100);
  width: 450px;
  &:first-child {
    border-top: 2px solid var(--color-grey-100);
  }
  @media screen and (max-width: 960px) {
    width: 100%;
    font-size: 1.1rem;
  }
`;

function XodimProfil({ onCloseModal }) {
  const { id } = useParams();
  const [users, setUsers] = useState(null);

  const getUser = () => {
    fetch(`https://custom.uz/users/${id}/`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };
 
  useEffect(() => {
    getUser();
  }, [id]);

  const handleEditClick = () => {
    if (!users) return; 
    onCloseModal("edit", users); 
  };
  if (!users) {
    return <div>Loading...</div>;
  }
  return (
    <div className="h-full bg-white overflow-auto m-5 min-h-[280px] max-h-screen pb-20 p-10">
      <div className="px-2 pt-10 lg:p-10">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {users?.image ? (
            <a href={`https://custom.uz/${users?.image}`} target="_blank">
              <img
                className="w-[200px] h-[200px] rounded-full relative object-cover"
                src={`https://custom.uz/${users?.image}`}
                alt=""
              />
            </a>
          ) : (
            <div className="w-[200px] h-[200px] rounded-full relative bg-[#f2f2f2]">
              <span
                role="img"
                aria-label="user"
                className="text-[150px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
              >
                <svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  data-icon="user"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path>
                </svg>
              </span>
            </div>
          )}

          <div className="flex flex-col gap-5">
            <p className="font-semibold text-3xl text-center lg:text-start">
              {users.first_name} {users.last_name}
            </p>
            <div className="flex flex-col gap-5">
              <Modal>
                <Modal.Open opens="edit">
                  <Button
                    size="small"
                    variation="primary"
                    onClick={handleEditClick}
                  >
                    Profilni tahrirlash
                  </Button>
                </Modal.Open>
                <Modal.Window name="edit">
                  <EditWorkerProfile
                    initialUserData={users}
                    onCloseModal={onCloseModal}
                    getUser={getUser}
                  />
                </Modal.Window>
              </Modal>
            </div>
            <Link className="flex flex-col gap-5" to="/">
              <Button size="small" variation="danger">
                Chiqish
              </Button>
            </Link>
          </div>
        </div>
        <div className="mt-[60px]  " style={{ width: "700px" }}>
          <StyledTodayItem>
            <span className="font-bold">Telefon raqami: </span>
            <span>{users.phone_number} </span>
          </StyledTodayItem>
          <StyledTodayItem>
            <span className="font-bold">Kasbi: </span>
            <span>{users.user_roles}</span>
          </StyledTodayItem>
          <StyledTodayItem>
            <span className="font-bold">Balans: </span>
            <Tag type="green">$ 10000</Tag>
          </StyledTodayItem>
        </div>
      </div>
    </div>
  );
}

export default XodimProfil;
