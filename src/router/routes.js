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
import ListSuppliers from "pages/suppliers/list-suppliers";
import CreateNewSupplier from "pages/suppliers/create-suppliers";
import EditSupplier from "pages/suppliers/edit-suppliers";
import StockMain from "pages/productsLots";
import CreateProductsLots from "pages/productsLots/create-productsLots";
import EditProductsLots from "pages/productsLots/edit-productsLots";
import ListClients from "pages/clients/list-clients";
import CreateSimpleClient from "pages/clients/create-simple-client";
import EditClient from "pages/clients/edit-clients";
import DetailsClients from "pages/clients/details-clients";
import DetailClientProduct from "pages/clients/details-clients-products";
import ListClientAddress from "pages/clientsAddress/list-clientAddress";
import CreateNewClientAddress from "pages/clientsAddress/create-clientAddress";
import EditClientAddress from "pages/clientsAddress/edit-clientAddress";
import LocationsPage from "pages/locations";
import ListOrders from "pages/orders/order-list";
import ListOrdersActive from "pages/orders/order-active";
import ListOrdersUnpaid from "pages/orders/order-unpaid";
import OrderDetails from "pages/orders/order-datails";
import OrderCreate from "pages/orders/order-create";
import OrderLocalCreate from "pages/orders/order-local-create";
import OrderEdit from "pages/orders/order-edit";
import ListDistributors from "pages/distributor/list-distributors";
import CreateNewDistributor from "pages/distributor/create-distributors";
import EditDistributor from "pages/distributor/edit-distributors";
import ListDeliveryTruck from "pages/deliveryTruck/list-deliveryTruck";
import CreateDeliveryTruck from "pages/deliveryTruck/create-deliveryTruck";
import EditDeliveryTruck from "pages/deliveryTruck/edit-deliveryTruck";
import DetailsDeliveryTruck from "pages/deliveryTruck/details-deliveryTruck";
import ListDeliveryZone from "pages/deliveryZone/list-deliveryZone";
import CreateNewDeliveryZone from "pages/deliveryZone/create-deliveryZone";
import EditDeliveryZone from "pages/deliveryZone/edit-deliveryZone";
import ListDeliverySubZone from "pages/deliverySubZone/list-deliverySubZone";
import CreateNewSubDeliveryZone from "pages/deliverySubZone/create-deliverySubZone";
import EditDeliverySubZone from "pages/deliverySubZone/edit-deliverySubZone";
import ProductsSellByRange from "pages/reports/reportByRange";
import CreateNewExpenses from "pages/expenses/new-expenses";
import ListExpenses from "pages/expenses/list-expenses";
import EditExpenses from "pages/expenses/edit-expenses";

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

  /* Proveedores */

  {
    route: "/productos/proveedores/lista",
    component: (
      <RequireAuth>
        <ListSuppliers />
      </RequireAuth>
    ),
  },
  {
    route: "/productos/proveedores/nuevo",
    component: (
      <RequireAuth>
        <CreateNewSupplier />
      </RequireAuth>
    ),
  },
  {
    route: "/productos/proveedores/editar/:id",
    component: (
      <RequireAuth>
        <EditSupplier />
      </RequireAuth>
    ),
  },

  /* Stock */

  {
    route: "/productos/stock/lista",
    component: (
      <RequireAuth>
        <StockMain />
      </RequireAuth>
    ),
  },
  {
    route: "/productos/stock/nuevo",
    component: (
      <RequireAuth>
        <CreateProductsLots />
      </RequireAuth>
    ),
  },
  {
    route: "/productos/stock/editar/:id",
    component: (
      <RequireAuth>
        <EditProductsLots />
      </RequireAuth>
    ),
  },

  /* Clientes */

  {
    route: "/clientes/lista",
    component: (
      <RequireAuth>
        <ListClients />
      </RequireAuth>
    ),
  },
  {
    route: "/clientes/nuevo",
    component: (
      <RequireAuth>
        <CreateSimpleClient />
      </RequireAuth>
    ),
  },

  {
    route: "/clientes/editar/:id",
    component: (
      <RequireAuth>
        <EditClient />
      </RequireAuth>
    ),
  },
  {
    route: "/clientes/detalle/:id",
    component: (
      <RequireAuth>
        <DetailsClients />
      </RequireAuth>
    ),
  },
  {
    route: "/clientes/detalle/producto/:id",
    component: (
      <RequireAuth>
        <DetailClientProduct />
      </RequireAuth>
    ),
  },
  /* Direcciones clientes */
  {
    route: "/clientes/direcciones/lista",
    component: (
      <RequireAuth>
        <ListClientAddress />
      </RequireAuth>
    ),
  },
  {
    route: "/clientes/direcciones/nuevo",
    component: (
      <RequireAuth>
        <CreateNewClientAddress />
      </RequireAuth>
    ),
  },
  {
    route: "/clientes/direcciones/editar/:id",
    component: (
      <RequireAuth>
        <EditClientAddress />
      </RequireAuth>
    ),
  },
  {
    route: "/clientes/localizacion",
    component: (
      <RequireAuth>
        <LocationsPage />
      </RequireAuth>
    ),
  },

  /* Ordenes */
  {
    route: "/ordenes/lista",
    component: (
      <RequireAuth>
        <ListOrders />
      </RequireAuth>
    ),
  },
  {
    route: "/ordenes/lista/activas",
    component: (
      <RequireAuth>
        <ListOrdersActive />
      </RequireAuth>
    ),
  },
  {
    route: "/ordenes/lista/impagas",
    component: (
      <RequireAuth>
        <ListOrdersUnpaid />
      </RequireAuth>
    ),
  },
  {
    route: "/ordenes/detalle/:id",
    component: (
      <RequireAuth>
        <OrderDetails />
      </RequireAuth>
    ),
  },
  {
    route: "/ordenes/nueva",
    component: (
      <RequireAuth>
        <OrderCreate />
      </RequireAuth>
    ),
  },
  {
    route: "/ordenes/nueva-local",
    component: (
      <RequireAuth>
        <OrderLocalCreate />
      </RequireAuth>
    ),
  },
  {
    route: "/ordenes/editar/:id",
    component: (
      <RequireAuth>
        <OrderEdit />
      </RequireAuth>
    ),
  },
  /* Distribuidoras */
  {
    route: "/distribucion/distribuidoras/lista",
    component: (
      <RequireAuth>
        <ListDistributors />
      </RequireAuth>
    ),
  },
  {
    route: "/distribucion/distribuidoras/nueva",
    component: (
      <RequireAuth>
        <CreateNewDistributor />
      </RequireAuth>
    ),
  },
  {
    route: "/distribucion/distribuidoras/editar/:id",
    component: (
      <RequireAuth>
        <EditDistributor />
      </RequireAuth>
    ),
  },
  /* Repartidores */
  {
    route: "/distribucion/repartidores/lista",
    component: (
      <RequireAuth>
        <ListDeliveryTruck />
      </RequireAuth>
    ),
  },
  {
    route: "/distribucion/repartidores/nuevo",
    component: (
      <RequireAuth>
        <CreateDeliveryTruck />
      </RequireAuth>
    ),
  },
  {
    route: "/distribucion/repartidores/editar/:id",
    component: (
      <RequireAuth>
        <EditDeliveryTruck />
      </RequireAuth>
    ),
  },
  {
    route: "/distribucion/repartidores/detalle/:id",
    component: (
      <RequireAuth>
        <DetailsDeliveryTruck />
      </RequireAuth>
    ),
  },
  /* Zonas reparto */
  {
    route: "/distribucion/zonas/lista",
    component: (
      <RequireAuth>
        <ListDeliveryZone />
      </RequireAuth>
    ),
  },
  {
    route: "/distribucion/zonas/nueva",
    component: (
      <RequireAuth>
        <CreateNewDeliveryZone />
      </RequireAuth>
    ),
  },
  {
    route: "/distribucion/zonas/editar/:id",
    component: (
      <RequireAuth>
        <EditDeliveryZone />
      </RequireAuth>
    ),
  },
  /* Sub Zonas reparto */
  {
    route: "/distribucion/sub-zonas/lista",
    component: (
      <RequireAuth>
        <ListDeliverySubZone />
      </RequireAuth>
    ),
  },
  {
    route: "/distribucion/sub-zonas/nueva",
    component: (
      <RequireAuth>
        <CreateNewSubDeliveryZone />
      </RequireAuth>
    ),
  },
  {
    route: "/distribucion/sub-zonas/editar/:id",
    component: (
      <RequireAuth>
        <EditDeliverySubZone />
      </RequireAuth>
    ),
  },
  /* Reportes */
  /* {
    route: "/reportes/productos-vendidos-por-dia",
    component: (
      <RequireAuth>
        <ProductsSellByDay />
      </RequireAuth>
    ),
  }, */
  {
    route: "/reportes/productos-vendidos-por-rango",
    component: (
      <RequireAuth>
        <ProductsSellByRange />
      </RequireAuth>
    ),
  },
  // Expenses
  {
    route: "/gastos/nuevo",
    component: (
      <RequireAuth>
        <CreateNewExpenses />
      </RequireAuth>
    ),
  },
  {
    route: "/gastos/lista",
    component: (
      <RequireAuth>
        <ListExpenses />
      </RequireAuth>
    ),
  },
  {
    route: "/gastos/editar/:id",
    component: (
      <RequireAuth>
        <EditExpenses />
      </RequireAuth>
    ),
  },
];

export default routes;
