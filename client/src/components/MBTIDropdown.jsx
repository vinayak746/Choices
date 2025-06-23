import { allMBTITypes } from "../utils/mbtiUtils";

export default function MBTIDropdown({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 rounded text-black"
    >
      <option value="">Select MBTI</option>
      {allMBTITypes.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
}
