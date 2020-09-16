import { CssBaseline } from '@material-ui/core';
import { blue, pink } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import 'fontsource-roboto'; // TODO  Material-UI 默认的排版配置仅依赖于 300，400，500 和 700 的字体权重。
import React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import './App.css';
import Pages from './pages/Pages';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
  },
});

const App:React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {/* 你的应用组件的其他部分 */}
    <Router>
      <Pages />
    </Router>
  </ThemeProvider>
);

export default App;
