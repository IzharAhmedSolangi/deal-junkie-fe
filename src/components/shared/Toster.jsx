import { toast } from "react-toastify";

export function SuccessToaster(title, message) {
  toast.success(
    <div>
      <strong>{title}</strong>
      <div>{message}</div>
    </div>,
    {
      position: "bottom-right",
      className: "toast-success-message",
      autoClose: 1500,
    }
  );
}

export function ErrorToaster(title, message) {
  toast.error(
    <div>
      <strong>{title}</strong>
      <div>{message}</div>
    </div>,
    {
      position: "bottom-right",
      className: "toast-error-message",
      autoClose: 1500,
    }
  );
}

export function InfoToaster(title, message) {
  toast.info(
    <div>
      <strong>{title}</strong>
      <div>{message}</div>
    </div>,
    {
      position: "bottom-right",
      className: "toast-info-message",
      autoClose: 1500,
    }
  );
}
