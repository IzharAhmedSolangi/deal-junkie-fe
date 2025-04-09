import { useState } from "react";
import Auth from "../modals/Auth";
import PostProject from "../modals/PostProject";
import { getAccessToken } from "../../storage/storage";

function PostProjectButton() {
  const token = getAccessToken();
  const [isOpenAuthModal, setIsOpenAuthModal] = useState(false);
  const [authModalType, setAuthModalType] = useState(null);
  const [isOpenPostProjectModal, setIsOpenPostProjectModal] = useState(false);
  return (
    <>
      {token ? (
        <button
          className=" hover-slide-button rounded w-[120px] h-[40px] bg-primary text-[#003F63] text-center cursor-pointer hover:opacity-80"
          onClick={() => setIsOpenPostProjectModal(true)}
        >
          Post a Project
        </button>
      ) : (
        <button
          className=" hover-slide-button rounded w-[120px] h-[40px] bg-primary text-[#003F63] text-center cursor-pointer hover:opacity-80"
          onClick={() => {
            setIsOpenAuthModal(true);
            setAuthModalType("login");
          }}
        >
          Post a Project
        </button>
      )}
      <Auth
        isOpenModal={isOpenAuthModal}
        setIsOpenModal={setIsOpenAuthModal}
        authModalType={authModalType}
        setAuthModalType={setAuthModalType}
      />
      <PostProject
        isOpenModal={isOpenPostProjectModal}
        setIsOpenModal={setIsOpenPostProjectModal}
      />
    </>
  );
}

export default PostProjectButton;
