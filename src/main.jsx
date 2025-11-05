import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ThoughtList from './components/thoughtList.jsx';
import Create from './components/createThought.jsx';
import MyThoughts from './components/MyThoughts.jsx';
import { Provider } from 'react-redux';
import ThoughtStore from './store/store.js';
import Auth from './Auth.jsx';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx'; // ✅ Import this
import VoiceEntry from './components/VoiceEntry.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
    children: [
      { path: "", element: <Signup /> },
      { path: "login", element: <Login /> },
    ],
  },
  {
    // ✅ Protected routes
    path: "/dashboard",
    element: <ProtectedRoute />, // protect this
    children: [
      {
        path: "",
        element: <App />, // Main layout inside dashboard
        children: [
          { path: "", element: <ThoughtList /> },
          { path: "create", element: <Create /> },
          { path: "my-thoughts", element: <MyThoughts /> },
          { path: "voice-create", element: <VoiceEntry /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={ThoughtStore }>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>
);
