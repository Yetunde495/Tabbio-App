import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import '../src/css/dependencies.css';
import '../src/css/components.css';
import { AppProvider } from './context/AppContext.tsx';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import 'react-datepicker/dist/react-datepicker.css';
import "react-phone-number-input/style.css";
import App from './App.tsx';

const queryClient = new QueryClient();

// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <App />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </AppProvider>
  </React.StrictMode>
);
