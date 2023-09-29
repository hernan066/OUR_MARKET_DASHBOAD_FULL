import Dashboard2 from "pages/dashboard2";
import RequireAuth from "./RequireAuth";
import Dashboard1 from "pages/dashboard";
import Dashboard3 from "pages/dashboard3";
import ListUsers from "pages/users/list-users";
import CreateNewUser from "pages/users/new-user";
import EditUser from "pages/users/edit-user";
import EditPasswordUser from "pages/users/change-password";
import Products from "pages/products";
import ProductDetail from "pages/products/product/product-detail";
import NewCategory from "pages/products/category/category-create";
import EditCategory from "pages/products/category/category-edit";
import CreateProduct from "pages/products/product/product-create";
import CreateOfert from "pages/products/ofert/ofert-create";
import EditOfert from "pages/products/ofert/ofert-edit";
import EditProduct from "pages/products/product/product-edit";

const routes = [
  //dashboard
  {
    route: "/dashboard/totales",
    component: (
      <RequireAuth>
        <Dashboard1 />
      </RequireAuth>
    ),
  },
  {
    route: "/dashboard/reparto",
    component: (
      <RequireAuth>
        <Dashboard2 />
      </RequireAuth>
    ),
  },
  {
    route: "/dashboard/cajones_de_pollo",
    component: (
      <RequireAuth>
        <Dashboard3 />
      </RequireAuth>
    ),
  },
  /* usuario  */
  {
    route: "/usuarios/lista",
    component: (
      <RequireAuth>
        <ListUsers />
      </RequireAuth>
    ),
  },
  {
    route: "/usuarios/nuevo",
    component: (
      <RequireAuth>
        <CreateNewUser />
      </RequireAuth>
    ),
  },
  {
    route: "/usuarios/editar/:id",
    component: (
      <RequireAuth>
        <EditUser />
      </RequireAuth>
    ),
  },
  {
    route: "/usuarios/editar/password/:id",
    component: (
      <RequireAuth>
        <EditPasswordUser />
      </RequireAuth>
    ),
  },

  /* Productos */

  {
    route: "/productos",
    component: (
      <RequireAuth>
        <Products />
      </RequireAuth>
    ),
  },
  {
    route: "/productos/nuevo",
    component: (
      <RequireAuth>
        <CreateProduct />
      </RequireAuth>
    ),
  },
  {
    // este edita producto, oferta y stock
    route: "/productos/detalle/:id",
    component: (
      <RequireAuth>
        <ProductDetail />
      </RequireAuth>
    ),
  },

  {
    route: "/productos/categoria/nueva",
    component: (
      <RequireAuth>
        <NewCategory />
      </RequireAuth>
    ),
  },
  {
    route: "/productos/categoria/editar/:id",
    component: (
      <RequireAuth>
        <EditCategory />
      </RequireAuth>
    ),
  },

  /* Ofertas */

  {
    route: "/productos/ofertas/nueva",
    component: (
      <RequireAuth>
        <CreateOfert />
      </RequireAuth>
    ),
  },
  {
    route: "/productos/ofertas/editar/:id",
    component: (
      <RequireAuth>
        <EditOfert />
      </RequireAuth>
    ),
  },
];

export default routes;
