import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Users from './Users.jsx';
import UpdateUser from './UpdateUser.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/users",
    element: <Users></Users>,
    loader: () => fetch('https://user-management-system-server-ashy.vercel.app/users')
  },
  {
    path: "/users/:id",
    element: <UpdateUser></UpdateUser>,
    loader: ({ params }) => fetch(`https://user-management-system-server-ashy.vercel.app/users/${params.id}`)
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
