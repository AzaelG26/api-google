import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./routes/Signup.tsx";
import Dashboard from "./routes/Dashboard.tsx";
import Login from "./routes/Login.tsx";
import ProtectedRoute from './routes/protectedRoute.tsx'
import {AuthProvider} from "./auth/AuthProvider.tsx";
import HomeLayout from "./layouts/HomeLayout.tsx";

const router = createBrowserRouter([
    {

        path:'/',
        element: <HomeLayout/>
    },{
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
