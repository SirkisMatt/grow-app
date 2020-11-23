import React from 'react';
import ReactDOM from 'react-dom';
import AccountDetails from './AccountDetails';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AccountDetails/>, div);
  ReactDOM.unmountComponentAtNode(div);
});