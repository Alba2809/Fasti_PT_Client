import { Outlet } from "react-router-dom";
import Menu from "../components/Menu";

function Dashboard() {
  return (
    <div className="h-screen w-screen flex font-serif">
      <section className="max-w-[280px] min-w-[280px]">
        <Menu />
      </section>

      <section className="grow px-3 py-2 overflow-hidden">
        <Outlet />
      </section>
    </div>
  );
}

export default Dashboard;
