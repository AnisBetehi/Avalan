import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import{Wrapper} from './userDataUpdate.jsx';
import { store } from './store';
import {Provider} from 'react-redux';





ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <Wrapper>
            <App />
        </Wrapper>
      </Provider>
    </React.StrictMode>,
  document.getElementById('root')
);

