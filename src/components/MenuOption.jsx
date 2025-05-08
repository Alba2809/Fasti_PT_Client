import { Link } from "react-router-dom";

// this component displays a menu option with the icon, the name, and the path
function MenuOption({ data, currentPath }) {
  return (
    <Link
      to={data.to}
      className={`flex flex-row gap-x-3 items-center p-2 rounded-md hover:bg-sky-100 ${
        currentPath === data.to ? "bg-gray-100" : ""
      }`}
    >
      {currentPath === data.to ? data.iconS : data.icon}
      <span>{data.name}</span>
    </Link>
  );
}

export default MenuOption;
