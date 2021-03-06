import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import DashboardNav from './DashboardNav';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <DashboardNav />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});