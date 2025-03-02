/* eslint-disable react/prop-types */
import "../../styles/switch.css";

function ToggleButton(props) {
  const { isOn, handleToggle } = props;
  return (
    <label className="switch">
      <input type="checkbox" checked={isOn} onChange={handleToggle} />
      <span className="slider"></span>
    </label>
  );
}

export default ToggleButton;
