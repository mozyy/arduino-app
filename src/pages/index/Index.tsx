import {
  Box,
  Checkbox, createStyles, makeStyles, Theme,
} from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsBluetoothIcon from '@material-ui/icons/SettingsBluetooth';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab';
import 'fontsource-roboto'; // TODO  Material-UI 默认的排版配置仅依赖于 300，400，500 和 700 的字体权重。
import React, { useState } from 'react';
import {
  Route, Switch,
  useHistory,
} from 'react-router-dom';
import Home from '../home/Home';
import NotFound from '../notFound/NotFound';

const useStyles = makeStyles((themes: Theme) => createStyles({
  root: {
    height: 380,
    transform: 'translateZ(0px)',
    flexGrow: 1,
  },
  speedDial: {
    position: 'absolute',
    bottom: themes.spacing(2),
    right: themes.spacing(2),
  },
}));

const actions = [
  // { icon: <FileCopyIcon />, name: 'Copy' },
  // { icon: <SaveIcon />, name: 'Save' },
  { icon: <ExitToAppIcon />, name: '退出', to: '/login' },
  { icon: <SettingsBluetoothIcon />, name: '蓝牙', to: '/bluetooth' },
  { icon: <AppsIcon />, name: '所有应用', to: '/' },
];

const Pages:React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/bluetooth">
          <Checkbox checked />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>

      <SpeedDial
        ariaLabel="actions"
        className={classes.speedDial}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => {
              history.push(action.to);
              setOpen(false);
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default Pages;
