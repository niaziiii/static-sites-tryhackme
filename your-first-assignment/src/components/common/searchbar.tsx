import { useState } from "react";
import { useGameContext } from "../../context/context";
import { CheckPointKey } from "../../utils/utils";

interface SearchBarProps {
  onEnter: (value: string) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({ onEnter }) => {
  const { state } = useGameContext();
  const { allowedAction } = state;
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (!inputValue.trim()) {
        setError("Please enter a URL.");
      } else {
        try {
          // Attempt to create a URL instance to validate the URL
          new URL(inputValue);
          onEnter(inputValue);
          setError(null); // Clear the error if it was previously set
        } catch (error) {
          setError("Please enter a valid URL.");
        }
      }
    }
  };
  return (
    <>
      <div className="flex items-center gap-1">
        {/* <BsBrowserEdge className="text-green text-xl" /> */}
        <input
          type="text"
          className={`${inpStyle} bg-white w-[18rem] px-2 text-thm ${
            allowedAction === CheckPointKey.PasswordManagerUrl
              ? "highlight"
              : ""
          }`}
          placeholder={error || "Type a URL"}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      {error && <div className="text-red">{error}</div>}
    </>
  );
};

export default SearchBar;
const inpStyle = "bg-gray rounded-xl outline-none border-none";
