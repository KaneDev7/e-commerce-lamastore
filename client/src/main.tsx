import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Layout from './Layout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './ui/pages/home/Home'
import Product from './ui/pages/product/Product'
import Products from './ui/pages/productDetails/Products'
import ContextProvider from './ui/context/ContextProvider'
import { Provider } from 'react-redux'
import configureStore from './infrastructure/store/store'
import { PersistGate } from 'redux-persist/integration/react'
import Login from './ui/pages/auth/Login'
import Register from './ui/pages/auth/Register'
import Panier from './ui/pages/cart/Panier'
import Commands from './ui/pages/commands/commandes'
import ForgotPassWord from './ui/pages/auth/ForgotPassWord'
import ResetPassword from './ui/pages/auth/ResetPassword'
import Informations from './ui/pages/auth/Information'
import Favoris from './ui/pages/favoris/Favoris'
import AdminLayout from './ui/pages/admin/adminLayout'
import AdminCommand from './ui/pages/admin/Admin.comamand'
import AdminProduct from './ui/pages/admin/Admin.product'
import AdminUsers from './ui/pages/admin/users/Admin.users'

const { store, persistor } = configureStore()

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'products/:id',
        element: <Products />,
      },
      {
        path: 'product/:id',
        element: <Product />
      },
      {
        path: 'panier',
        element: <Panier />
      },
      {
        path: 'commands',
        element: <Commands />
      },
      {
        path: 'infos',
        element: <Informations />
      },
      {
        path: 'favoris',
        element: <Favoris />
      },
      {
        path: 'login/:frompath/:id',
        element: <Login />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'forgotpassword',
        element: <ForgotPassWord />
      },
      {
        path: 'resetpassword/:code',
        element: <ResetPassword />
      },

      //ADMIN
      {
        path: '/admin',
        element: <AdminLayout />,
        children: [
          {
            path: '/admin',
            element: <AdminCommand />
          },
          {
            path: '/admin/products',
            element: <AdminProduct />
          },
          {
            path: '/admin/users',
            element: <AdminUsers />
          },
        ]
      },
    ]
  },

])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor} >
        <ContextProvider>
          <RouterProvider router={router} />
        </ContextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
