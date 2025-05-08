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
    <article className="w-full h-full bg-[#95bcf0] flex flex-col gap-y-5 border-r border-gray-200 shadow-md ">
      <h1 className="text-center text-2xl font-semibold">Menu</h1>

      <nav className="flex flex-col gap-y-2 flex-grow px-1 divide-y divide-white">
        {menuOptions.map((item) => (
          <li key={item.name} className="list-none pb-2">
            <MenuOption data={item} currentPath={currentPath} />
          </li>
        ))}
      </nav>

      <footer className="text-center text-sm flex flex-col items-center gap-y-3">
        <p className="uppercase">
          {user?.username} - {user?.role?.name}
        </p>
        <button
          className="rounded-full bg-[#4675c1] hover:bg-[#afd4ff] text-white text-lg flex items-center justify-center px-3 py-2 transition duration-300 ease-in-out hover:scale-105 cursor-pointer"
          onClick={logout}
        >
          <CgLogOut color="white" size="1.5em" />
          <span className="ml-2">Cerrar sesión</span>
        </button>
        <p>Copyright © 2025 by #</p>
      </footer>
    </article>
  );
}

export default Menu;
