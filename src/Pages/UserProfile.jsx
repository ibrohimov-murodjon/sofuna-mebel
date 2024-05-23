import styled from "styled-components";
import { Link } from "react-router-dom";
import EditWorkerProfile from "../features/worker/EditWorkerProfile";
import Button from "../ui/Button";
import Tag from "../ui/Tag";
import Modal from "../ui/Modal";
import Menus from "../ui/Menus";

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

function UserProfile({ onCloseModal }) {
  return (
    <>
      <div className="h-full bg-white overflow-auto m-5 min-h-[280px] max-h-screen pb-20 p-10">
        <div className="px-2 pt-10 lg:p-10">
          <div className="flex flex-col lg:flex-row items-center gap-10">
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
              <button
                type="button"
                className="absolute bottom-0 bg-[var(--color-brand-600)] rounded-md left-[50%] z-10 w-10 h-10 translate-y-[50%] translate-x-[-50%] cursor-pointer"
              >
                <label
                  className="absolute top-0 left-0 cursor-pointer w-10 h-10 z-10"
                  htmlFor="file-accept-123"
                ></label>
                <input
                  id="file-accept-123"
                  type="file"
                  accept="image/jpeg, image/png, image/jpg"
                  className="absolute hidden"
                />
                <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] scale-150">
                  <span role="img" aria-label="plus">
                    <svg
                      viewBox="64 64 896 896"
                      focusable="false"
                      data-icon="plus"
                      width="1em"
                      height="1em"
                      fill="#fff"
                      aria-hidden="true"
                    >
                      <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path>
                      <path d="M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8z"></path>
                    </svg>
                  </span>
                </span>
              </button>
            </div>
            <div className="flex flex-col gap-5">
              <p className="font-semibold text-3xl text-center lg:text-start">
                John Doe
              </p>
              <div className="flex flex-col gap-5">
                <Modal>
                  <Modal.Open opens="edit">
                    <Button size="small" variation="primary">
                      Profilni tahrirlash
                    </Button>
                  </Modal.Open>
                  <Modal.Window name="edit">
                    <EditWorkerProfile onCloseModal={onCloseModal} />
                  </Modal.Window>
                </Modal>
              </div>
              <Link to="/">
                <Button size="small" variation="danger">
                  Chiqish
                </Button>
              </Link>
            </div>
          </div>
          <div className="mt-[60px] ">
            <StyledTodayItem>
              <span className="font-bold">Ism: </span>
              <span>John</span>
            </StyledTodayItem>
            <StyledTodayItem>
              <span className="font-bold">Ism: </span>
              <span>John</span>
            </StyledTodayItem>
            <StyledTodayItem>
              <span className="font-bold">Balans: </span>
              <Tag type="green">$1,500</Tag>
            </StyledTodayItem>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
