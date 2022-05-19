import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from "./page/Login";
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@mui/system";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Frame from "./page/Frame";
import path from "./resource/Path";

const theme = createTheme({
    palette: {
        primary: {
            main: `#d259a1`
        }
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
      <BrowserRouter>
          <Routes>
              <Route path={path.routing.auth} element={(<Login />)} />
              <Route path={path.routing.frame} element={(<Frame />)} />
          </Routes>
      </BrowserRouter>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
