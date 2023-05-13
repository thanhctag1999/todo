import React from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { useStore } from "./app/index";
import Schedule from "./components/Schedule/Schedule";
import Sidebar from "./components/Sidebar/Sidebar";
import AddMeeting from "./features/AddMeeting/AddMetting";
import Add from "./features/AddTask/Add";
import NotFound from "./features/NotFound/NotFound";
import Today from "./features/Today/Today";

function App() {
  const [state] = useStore();
  return (
    <div className="app">
      <BrowserRouter>
        <ProSidebarProvider>
          <Sidebar />
        </ProSidebarProvider>
        <div className="container">
          <Routes>
            <Route path="/" element={<Today />} />
            <Route path="/add" element={<Add />} />
            <Route path="/addMeeting" element={<AddMeeting />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Schedule isAddMeeting={state} />
      </BrowserRouter>
    </div>
  );
}

export default App;
