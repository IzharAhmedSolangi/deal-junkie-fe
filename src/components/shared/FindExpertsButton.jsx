import { NavLink } from "react-router-dom";
import { getAccessToken } from "../../storage/storage";
import { useState } from "react";
import Auth from "../modals/Auth";

function FindExpertsButton() {
  const token = getAccessToken();
  const [isOpenAuthModal, setIsOpenAuthModal] = useState(false);
  const [authModalType, setAuthModalType] = useState(null);

  return (
    <>
      {token ? (
        <NavLink to="/find-jobs">
          <button className="rounded w-[120px] h-[40px] bg-secondary text-white text-center cursor-pointer hover:opacity-80">
            Find Experts
          </button>
        </NavLink>
      ) : (
        <button
          className="rounded w-[120px] h-[40px] bg-secondary text-white text-center cursor-pointer hover:opacity-80"
          onClick={() => {
            setIsOpenAuthModal(true);
            setAuthModalType("login");
          }}
        >
          Find Experts
        </button>
      )}
      <Auth
        isOpenModal={isOpenAuthModal}
        setIsOpenModal={setIsOpenAuthModal}
        authModalType={authModalType}
        setAuthModalType={setAuthModalType}
      />
    </>
  );
}

export default FindExpertsButton;
