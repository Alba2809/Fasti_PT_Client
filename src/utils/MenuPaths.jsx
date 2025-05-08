import { MdInventory, MdOutlineHistoryEdu } from "react-icons/md";
import { FaCoins, FaCashRegister } from "react-icons/fa";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { Paths } from "./Paths";

export const MenuPaths = {
  gerente: [
    {
      name: "Productos",
      icon: <MdInventory color="gray" size="1.5em" />,
      iconS: <MdInventory color="blue" size="1.5em" />,
      to: Paths.products,
    },
    {
      name: "Compras",
      icon: <BiSolidPurchaseTag color="gray" size="1.5em" />,
      iconS: <BiSolidPurchaseTag color="blue" size="1.5em" />,
      to: Paths.purchases,
    },
    {
      name: "Ventas",
      icon: <FaCoins color="gray" size="1.5em" />,
      iconS: <FaCoins color="blue" size="1.5em" />,
      to: Paths.sales,
    },
    {
      name: "Logs",
      icon: <MdOutlineHistoryEdu color="gray" size="1.5em" />,
      iconS: <MdOutlineHistoryEdu color="blue" size="1.5em" />,
      to: Paths.logs,
    },
    {
      name: "Cortes de ventas",
      icon: <FaCashRegister color="gray" size="1.5em" />,
      iconS: <FaCashRegister color="blue" size="1.5em" />,
      to: Paths.salesCuts,
    },
  ],
  cajero: [
    {
      name: "Productos",
      icon: <MdInventory color="gray" size="1.5em" />,
      iconS: <MdInventory color="blue" size="1.5em" />,
      to: Paths.products
    },
    {
      name: "Ventas",
      icon: <FaCoins color="gray" size="1.5em" />,
      iconS: <FaCoins color="blue" size="1.5em" />,
      to: Paths.sales
    },
    {
      name: "Logs",
      icon: <MdOutlineHistoryEdu color="gray" size="1.5em" />,
      iconS: <MdOutlineHistoryEdu color="blue" size="1.5em" />,
      to: Paths.logs
    },
    {
      name: "Cortes de ventas",
      icon: <FaCashRegister color="gray" size="1.5em" />,
      iconS: <FaCashRegister color="blue" size="1.5em" />,
      to: Paths.salesCuts
    },
  ],
};
