import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./routes/Signup.tsx";
import Dashboard from "./routes/Dashboard.tsx";
import Login from "./routes/Login.tsx";
import ProtectedRoute from './routes/protectedRoute.tsx'
import {AuthProvider} from "./auth/AuthProvider.tsx";
import HomeLayout from "./layouts/HomeLayout.tsx";
import MenPage from "./pages/men.tsx";
import Home from "./pages/Home.tsx";
import Women from "./pages/women.tsx";
import Children from "./pages/children.tsx";
import Cart from "./pages/Cart.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout />,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/men',
                element: <MenPage />,
            },
            {
                path: 'women',
                element: <Women />,
            },
            {
                path: 'children',
                element: <Children />,
            },
                path: '/cart',
                element: <Cart/>
            }
        ],
    },
    {
        path:'/login',
        element: <Login/>
    },
    {
        path: '/signup',
        element: <Signup/>
    },
    {
        path: '/',
        element: <ProtectedRoute />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            },
        ]
    }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router}/>
        </AuthProvider>
    </React.StrictMode>
);
