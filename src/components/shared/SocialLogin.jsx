import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { setAccessToken, setRefreshToken } from "../../storage/storage";
import { ButtonLoader2 } from "../shared/ButtonLoaders";

export function SocialLogin() {
  const BASE_URL = "";
  const [loading, setLoading] = useState(false);

  const Login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setLoading(true);
      axios
        .post(`${BASE_URL}/api/login-with-google/`, {
          access_token: codeResponse.access_token,
        })
        .then((response) => {
          setLoading(false);
          setAccessToken(response.data.access);
          setRefreshToken(response.data.refresh);
          window.location.href = "/";
        })
        .catch((error) => {
          setLoading(false);
        });
    },
    onError: (error) => {},
  });

  return (
    <>
      <button
        onClick={() => Login()}
        className="w-full h-[40px] border text-[#344054] border-[#02174C33] hover:border-secondary hover:bg-secondary hover:text-white rounded flex justify-center items-center cursor-pointer"
      >
        {loading ? (
          <ButtonLoader2 />
        ) : (
          <div className="flex gap-2 justify-center items-center">
            <FcGoogle />
            <span className="text-[16px] font-semibold">
              Continue with Google
            </span>
          </div>
        )}
      </button>
    </>
  );
}
