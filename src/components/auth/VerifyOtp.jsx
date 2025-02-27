/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ButtonLoader1 } from "../shared/ButtonLoaders";

/* eslint-disable react/prop-types */
function VerifyOtp(props) {
  const { setAuthModalType, forgotEmail } = props;
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    const value = element.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text");
    setError(null);
    if (pasteData.length === 4 && /^\d+$/.test(pasteData)) {
      const newOtp = pasteData.split("");
      setOtp(newOtp);
      newOtp.forEach((digit, idx) => {
        if (inputRefs.current[idx]) {
          inputRefs.current[idx].value = digit;
        }
      });
      inputRefs.current[5].focus();
    } else {
      e.preventDefault();
      setError("Please paste a valid 4-digit OTP code.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length < 4) {
      setError("Please enter the complete 4-digit code.");
    } else {
      setError(null);
      setLoading(true);
      await axios
        .post(`${BASE_URL}/api/accounts/verify-otp/`, {
          email: forgotEmail,
          code: otpCode,
        })
        .then((response) => {
          setLoading(false);
          setAuthModalType("reset-password");
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };

  const [countdown, setCountdown] = useState(300);

  useEffect(() => {
    if (countdown <= 0) return;

    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handleResendCode = async () => {
    await axios
      .post(`${BASE_URL}/api/accounts/resend-otp/`, { email: forgotEmail })
      .then((response) => {
        setCountdown(300);
      })
      .catch((error) => {});
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full">
        <form onSubmit={handleSubmit} className="w-full">
          <h1 className="font-[600] text-[32px] text-secondary">
            Enter OTP Code
          </h1>
          <p className="font-[500] text-[16px] text-[#6F7487]">
            Please enter the one-time password (OTP) you received on your email
            to change your password.
          </p>
          <div className="w-full mt-4">
            {/* OTP Input Fields */}
            <div className="mt-4">
              <div className="flex items-center gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder="0"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={index === 0 ? handlePaste : null}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="w-[25%] h-20 rounded text-secondary border border-[#02174C33] text-center text-xl focus:outline-none focus:border-secondary"
                  />
                ))}
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            <button
              className="bg-secondary cursor-pointer hover:opacity-80 w-full h-[40px] text-white rounded mt-6 flex justify-center items-center"
              type="submit"
              disabled={loading}
            >
              {loading ? <ButtonLoader1 /> : "Verify"}
            </button>
          </div>
        </form>
        <p className="text-gray-600 mt-4 text-[15px]">
          Didn’t received any code?{" "}
          {countdown <= 0 ? (
            <button
              onClick={handleResendCode}
              className="text-[#202224] hover:text-primary  font-semibold cursor-pointer"
            >
              Resend
            </button>
          ) : (
            <span className="text-[#202224] font-semibold">
              {formatTime(countdown)}
            </span>
          )}
        </p>
      </div>
    </>
  );
}

export default VerifyOtp;
