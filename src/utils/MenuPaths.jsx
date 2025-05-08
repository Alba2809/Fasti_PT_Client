import { MdInventory, MdOutlineHistoryEdu } from "react-icons/md";
import { FaCoins, FaCashRegister } from "react-icons/fa";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { Paths } from "./Paths";

export const MenuPaths = {
  gerente: [
    {
      name: "Productos",
      icon: <MdInventory color="#4675c1" size="1.5em" />,
      iconS: <MdInventory color="#608dd1" size="1.5em" />,
      to: Paths.products,
    },
    {
      name: "Compras",
      icon: <BiSolidPurchaseTag color="#4675c1" size="1.5em" />,
      iconS: <BiSolidPurchaseTag color="#608dd1" size="1.5em" />,
      to: Paths.purchases,
    },
    {
      name: "Ventas",
      icon: <FaCoins color="#4675c1" size="1.5em" />,
      iconS: <FaCoins color="#608dd1" size="1.5em" />,
      to: Paths.sales,
    },
    {
      name: "Logs",
      icon: <MdOutlineHistoryEdu color="#4675c1" size="1.5em" />,
      iconS: <MdOutlineHistoryEdu color="#608dd1" size="1.5em" />,
      to: Paths.logs,
    },
    {
      name: "Cortes de ventas",
      icon: <FaCashRegister color="#4675c1" size="1.5em" />,
      iconS: <FaCashRegister color="#608dd1" size="1.5em" />,
      to: Paths.salesCuts,
    },
  ],
  cajero: [
    {
      name: "Productos",
      icon: <MdInventory color="#4675c1" size="1.5em" />,
      iconS: <MdInventory color="#608dd1" size="1.5em" />,
      to: Paths.products
    },
    {
      name: "Ventas",
      icon: <FaCoins color="#4675c1" size="1.5em" />,
      iconS: <FaCoins color="#608dd1" size="1.5em" />,
      to: Paths.sales
    },
    {
      name: "Cortes de ventas",
      icon: <FaCashRegister color="#4675c1" size="1.5em" />,
      iconS: <FaCashRegister color="#608dd1" size="1.5em" />,
      to: Paths.salesCuts
    },
  ],
};
