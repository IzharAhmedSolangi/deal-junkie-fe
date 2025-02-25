/* eslint-disable react/prop-types */
import "../../styles/loaders.css";

export const Loader1 = ({ title }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="loader-1"></span>
      {title && (
        <span className="text-primary text-[15px] font-[600]">{title}</span>
      )}
    </div>
  );
};

export const Loader2 = ({ title }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="loader-2"></span>
      {title && (
        <span className="text-primary text-[15px] font-[600]">{title}</span>
      )}
    </div>
  );
};
