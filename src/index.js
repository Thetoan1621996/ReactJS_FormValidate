import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactForm from "./Component/reactForm/ReactForm";
// cấu hình redux
import { Provider } from "react-redux";
import {store} from './redux/configStore'
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<ReactForm />}></Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
