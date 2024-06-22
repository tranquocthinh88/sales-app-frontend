import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { CssBaseline } from "@mui/material";
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { theme } from "./theme.tsx";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard.tsx";
import AdminLayout from './layouts/admin/AdminLayout.tsx';
import Product from './pages/admin/products/Product.tsx';
import CreateProduct from './pages/admin/products/CreateProduct.tsx';
import UpdateProduct from './pages/admin/products/UpdateProduct.tsx';
import { Category } from '@mui/icons-material';
import UserLayout from './layouts/users/UserLayout.tsx';
import Provider from './pages/admin/providers/Provider.tsx';
import Home from './pages/users/home/Home.tsx';
import ProductDetail from './pages/users/product/ProductDetail.tsx';
import Cart from './pages/users/cart/Cart.tsx';
import { store } from './redux-toolkit/stores/store.ts';
import { Provider as ProviderRedux } from 'react-redux'

const router = createBrowserRouter([
    {
        path: '/admin/dashboard',
        element: <AdminLayout><Dashboard /></AdminLayout>
    },
    {
        path: '/admin/product',
        element: <AdminLayout><Product /></AdminLayout>
    },
    {
        path: '/admin/product/create',
        element: <AdminLayout><CreateProduct /></AdminLayout>
    },
    {
        path: '/admin/product/update/:id',
        element: <AdminLayout><UpdateProduct /></AdminLayout>
    },
    {
        path: '/admin/product/category',
        element: <AdminLayout><Category /></AdminLayout>
    },
    {
        path: '/admin/product/provider',
        element: <AdminLayout><Provider /></AdminLayout>
    },
    {
        path: '/home',
        element: <UserLayout><Home /></UserLayout>
    },
    {
        path: '/products/:id',
        element: <UserLayout><ProductDetail /></UserLayout>
    },
    {
        path: '/cart',
        element: <UserLayout><Cart /></UserLayout>
    },
    {
        path: '/',
        element: <Navigate to={"/home"}></Navigate>
    
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ProviderRedux store={store}>
            <CssVarsProvider theme={theme}>
                <CssBaseline />
                <RouterProvider router={router} />
            </CssVarsProvider>
        </ProviderRedux>
    </React.StrictMode>,
)