import 'fontsource-roboto'; // TODO  Material-UI 默认的排版配置仅依赖于 300，400，500 和 700 的字体权重。
import React from 'react';
import {
  Route, Switch,
} from 'react-router-dom';
import Index from './index/Index';
import SignIn from './login/SignIn';

const Pages:React.FC = () => (
  <Switch>
    <Route path="/login">
      <SignIn />
    </Route>
    <Route path="/">
      <Index />
    </Route>
  </Switch>
);

export default Pages;
