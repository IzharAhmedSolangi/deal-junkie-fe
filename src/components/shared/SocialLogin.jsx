import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { setAccessToken, setRefreshToken } from "../../storage/storage";
import { ButtonLoader2 } from "../shared/ButtonLoaders";
import { useLinkedIn } from "react-linkedin-login-oauth2";

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
        className="hover-slide-button w-full h-[40px] border text-[#344054] border-[#02174C33] hover:border-secondary hover:bg-secondary hover:text-white rounded flex justify-center items-center cursor-pointer"
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

export function LinkedInCallback() {
  const clientId = "77k6yhjmtae3uq";
  const redirectUri = `http://localhost:5173`;
  const { linkedInLogin } = useLinkedIn({
    clientId: clientId,
    redirectUri: redirectUri,
    onSuccess: (authCode) => {
      console.log({ authCode });
      if (window.opener) {
        window.opener.postMessage({ type: "LINKEDIN_AUTH", authCode }, "*");
      }

      setTimeout(() => {
        window.close(); // this works only if window was opened by window.open()
      }, 500);
    },
    scope: ["profile openid"],
  });
  return (
    <>
      <div
        className="bg-[#FFFFFF] w[90px] h-[40px] flex items-center justify-center rounded-[10px] cursor-pointer"
        onClick={linkedInLogin}
      >
        Verify LinkedIn
      </div>
    </>
  );
}
