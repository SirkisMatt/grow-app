import React from 'react';
import ReactDOM from 'react-dom';
import AddGoalCard from './AddGoalCard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddGoalCard/>, div);
  ReactDOM.unmountComponentAtNode(div);
});