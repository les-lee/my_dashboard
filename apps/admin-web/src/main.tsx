import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider, App as AntApp } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { GlobalMessageProvider } from './components/GlobalMessageProvider';
import 'antd/dist/reset.css';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <AntApp>
        <GlobalMessageProvider>
          <RouterProvider router={router} />
        </GlobalMessageProvider>
      </AntApp>
    </ConfigProvider>
  </React.StrictMode>,
);
