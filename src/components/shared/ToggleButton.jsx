/* eslint-disable react/prop-types */
import "../../styles/switch.css";

function ToggleButton(props) {
  const { isOn, handleToggle, label } = props;
  return (
    <div className="flex items-center gap-2">
      <p className="font-[500] text-[14px] text-[#6F7487]">{label && label}</p>
      <label className="switch">
        <input type="checkbox" checked={isOn} onChange={handleToggle} />
        <span className="slider"></span>
      </label>
    </div>
  );
}

export default ToggleButton;
