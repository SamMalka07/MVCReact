export const fetchProducts = () => fetch("/Product/ProductList");
export const fetchCustomers = () => fetch("/Customer/CustomerList");
export const fetchStores = () => fetch("/Store/StoreList");
export const fetchSales = () => fetch("/Sale/SalesList");

export const fetchSaleById = (id) => fetch(`/Sale/FindById/${id}`);
export const fetchProductById = (id) => fetch(`/Product/FindById/${id}`);
export const fetchCustomerById = (id) => fetch(`/Customer/FindById/${id}`);
export const fetchStoreById = (id) => fetch(`/Store/FindById/${id}`);
