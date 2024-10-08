// client/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import CssBaseline from '@mui/material/CssBaseline'; // 引入CssBaseline
import './styles/App.css'; // 引入自定义样式

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <CssBaseline /> {/* 应用MUI的CSS基础样式 */}
    <App />
  </Provider>
);
