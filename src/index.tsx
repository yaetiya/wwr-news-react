import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import theme from './theme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';


/*
TODO:
1? Сделать логику (редакс) получения данных пользователя по id
1.1? Сделать логику (редакс) получения постов по id автора
2. Подгрузка постов, когда до конца сколла страницы n (n = 600) пикс
3. Переделать дизайн страницы регистрации и авторизации

*/
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root'),
);