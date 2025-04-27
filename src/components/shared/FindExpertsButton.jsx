import { NavLink } from "react-router-dom";
import { getAccessToken } from "../../storage/storage";
import { useContext, useState } from "react";
import Auth from "../modals/Auth";
import GlobalContext from "../../context/GlobalContext";

function FindExpertsButton() {
  const token = getAccessToken();
  const { userInfo } = useContext(GlobalContext);
  const [isOpenAuthModal, setIsOpenAuthModal] = useState(false);
  const [authModalType, setAuthModalType] = useState(null);

  return (
    <>
      {token && userInfo?.user?.role === "seller" && (
        <NavLink to="/find-jobs">
          <button className="hover-slide-button rounded w-[120px] h-[40px] bg-secondary text-white text-center cursor-pointer">
            Find Jobs
          </button>
        </NavLink>
      )}
      {token && userInfo?.user?.role === "buyer" && (
        <NavLink to="/find-experts">
          <button className="hover-slide-button rounded w-[120px] h-[40px] bg-secondary text-white text-center cursor-pointer">
            Find Experts
          </button>
        </NavLink>
      )}
      {!token && (
        <button
          className="hover-slide-button rounded w-[120px] h-[40px] bg-secondary text-white text-center cursor-pointer"
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
