import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { Paths } from "./utils/Paths";
import Login from "./pages/Login";
import AuthValidator from "./components/auth/AuthValidator";
import RolValidator from "./components/auth/RolValidator";
import { Roles } from "./utils/Roles";
import Product from "./pages/Product";
import Purchase from "./pages/Purchase";
import Sale from "./pages/Sale";
import Logs from "./pages/Logs";
import Welcome from "./pages/Welcome";
import SalesCut from "./pages/SalesCut";

function App() {
  const location = useLocation();

  // check if the user is authenticated and redirect to the login page if not
  // display the dashboard if the user is authenticated
  // created the routes for each page based on the user's role
  return (
    <Routes location={location} key={location.pathname}>
      <Route element={<AuthValidator />}>
        <Route element={<Dashboard />}>
          <Route path={Paths.main} element={<Welcome />} />
          
          {/* Multiple roles */}
          <Route
            element={<RolValidator roles={[Roles.cajero.name, Roles.gerente.name]} />}
          >
            <Route path={Paths.products} element={<Product />} />
            <Route path={Paths.sales} element={<Sale />} />
            <Route path={Paths.salesCuts} element={<SalesCut />} />
          </Route>

          {/* Gerente */}
          <Route
            element={<RolValidator roles={[Roles.gerente.name]} />}
          >
            <Route path={Paths.purchases} element={<Purchase />} />
            <Route path={Paths.logs} element={<Logs />} />
          </Route>

        </Route>
      </Route>
      <Route path={Paths.login} element={<Login />} />
    </Routes>
  );
}

export default App;
