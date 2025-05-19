/* eslint-disable react/prop-types */
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { setAccessToken, setRefreshToken } from "../../storage/storage";
import { ButtonLoader2 } from "../shared/ButtonLoaders";
import useCurrentUser from "../../services/common/useCurrentUser";
import { ErrorToaster } from "./Toster";
import { FaLinkedin } from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_API_URL;
const redirectUri = import.meta.env.VITE_REDIRECT_URL;
const linkedInClientID = import.meta.env.VITE_LINKEDIN_CLIENT_ID;

export function LinkedInVerification({ setIsLinkedInVerified, setFieldValue }) {
  const [loading, setLoading] = useState(false);

  // LinkedIn OAuth configuration
  const scope = encodeURIComponent("openid profile email");
  const state = Math.random().toString(36).substring(2, 15);

  const handleLinkedInClick = () => {
    setLoading(true);

    // Calculate center position for popup
    const width = 600;
    const height = 700;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const linkedInAuthUrl =
      `https://www.linkedin.com/oauth/v2/authorization?` +
      `response_type=code` +
      `&client_id=${linkedInClientID}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&state=${state}` +
      `&scope=${scope}`;

    // Open popup with the LinkedIn auth URL
    const popup = window.open(
      linkedInAuthUrl,
      "linkedin-auth",
      `width=${width},height=${height},left=${left},top=${top},` +
        `toolbar=no,location=yes,directories=no,status=no,menubar=no,` +
        `scrollbars=yes,resizable=no,copyhistory=no`
    );

    // Poll for authorization code in the popup's URL
    const pollTimer = setInterval(() => {
      try {
        // Check if popup is still open
        if (!popup || popup.closed) {
          clearInterval(pollTimer);
          setLoading(false);
          return;
        }
        // Try to access the popup's URL
        const currentUrl = popup.location.href;
        // Check if URL contains the auth code
        if (currentUrl.includes("code=")) {
          clearInterval(pollTimer);

          // Extract the code from URL
          const urlParams = new URLSearchParams(popup.location.search);
          const authCode = urlParams.get("code");
          if (authCode) {
            popup.close();
            axios
              .post(`${BASE_URL}/api/accounts/linkedin-login/`, {
                auth_code: authCode,
              })
              .then((response) => {
                setLoading(false);
                if (response.data.email_verified) {
                  setIsLinkedInVerified(true);
                  setFieldValue("profile_picture", response.data.picture);
                } else {
                  ErrorToaster(
                    "Error",
                    "Your linkedIn account is not verified"
                  );
                }
              })
              .catch((error) => {
                setLoading(false);
                ErrorToaster("Error", error?.response?.data?.message);
              });
          }
        }
      } catch (error) {
        console.log({ error });
      }
    }, 500);
  };

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={handleLinkedInClick}
        className="text-gray-700 text-center hover:text-secondary cursor-pointer flex justify-center items-center"
        disabled={loading}
      >
        {loading ? (
          <ButtonLoader2 />
        ) : (
          <div className="flex gap-1 justify-center items-center">
            <FaLinkedin className="flex-shrink-0" />
            <span className="text-[16px] font-semibold">Verify LinkedIn</span>
          </div>
        )}
      </button>
    </div>
  );
}

export function GoogleLogin({ handleClose }) {
  const [loading, setLoading] = useState(false);
  const { getCurrentUser } = useCurrentUser();

  const Login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setLoading(true);
      axios
        .post(`${BASE_URL}/api/accounts/google-login/`, {
          token: codeResponse.access_token,
        })
        .then((response) => {
          setLoading(false);
          setAccessToken(response.data.access_token);
          setRefreshToken(response.data.refresh_token);
          getCurrentUser(response.data.access_token);
          handleClose();
        })
        .catch((error) => {
          setLoading(false);
          ErrorToaster("Error", error?.response?.data?.message);
        });
    },
    onError: (error) => {
      ErrorToaster("Error", error?.response?.data?.message);
    },
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
