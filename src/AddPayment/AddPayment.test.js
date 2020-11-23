import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import AddPayment from './AddPayment';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <AddPayment />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});