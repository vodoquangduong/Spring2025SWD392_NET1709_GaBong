import { FaSearch } from "react-icons/fa";
const SearchBox = ({
  placeholder = "Search",
  widthClass = "w-[300px]",
  className = "py-2 !text-sm",
  name = "name",
  value = "",
  onChange = () => {},
}) => {
  return (
    <div className={`relative ${widthClass}`}>
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <FaSearch size={18} className="dark:text-zinc-500" />
      </div>
      <input
        name={name}
        type="search"
        id="default-search"
        className={`!ps-10 bg-white dark:text-zinc-500 input-style ${className}`}
        placeholder={placeholder}
        onChange={onChange}
        required
        value={value}
      />
    </div>
  );
};

export default SearchBox;
