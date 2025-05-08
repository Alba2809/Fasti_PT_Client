import { useLayoutEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { MenuPaths } from "../utils/MenuPaths";
import { CgLogOut } from "react-icons/cg";
import MenuOption from "./MenuOption";

function Menu() {
  const { user, logout } = useAuthContext();

  const menuOptions = MenuPaths[user?.role?.name];
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useLayoutEffect(() => {
    setCurrentPath(window.location.pathname);
  }, [window.location.pathname]);

  return (
    <article className="w-full h-full bg-sky-200 flex flex-col gap-y-5 border-r border-gray-200 shadow-md">
      <h1 className="text-center text-2xl font-semibold">Menu</h1>

      <nav className="flex flex-col gap-y-2 flex-grow px-1">
        {menuOptions.map((item) => (
          <li key={item.name} className="list-none">
            <MenuOption data={item} currentPath={currentPath} />
          </li>
        ))}
      </nav>

      <footer className="text-center text-sm flex flex-col items-center gap-y-3">
        <p className="uppercase">
          {user?.username} - {user?.role?.name}
        </p>
        <button className="rounded-full bg-gray-200 hover:bg-gray-100 text-white text-lg flex items-center justify-center p-1 transition duration-300 ease-in-out hover:scale-110 cursor-pointer" onClick={logout}>
          <CgLogOut color="black" size="1.5em" />
        </button>
        <p>Copyright © 2023 by #</p>
      </footer>
    </article>
  );
}

export default Menu;
