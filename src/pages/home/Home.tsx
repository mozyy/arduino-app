import {
  Box, ButtonBase, createStyles, GridList, GridListTile, makeStyles, Theme,
} from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import SettingsBluetoothIcon from '@material-ui/icons/SettingsBluetooth';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
}));

const apps = [
  {
    icon: <SettingsBluetoothIcon />,
    name: '蓝牙',
  },
  {
    icon: <SettingsBluetoothIcon />,
    name: '蓝牙2',
  },
  {
    icon: <SettingsBluetoothIcon />,
    name: '蓝牙3',
  },
  {
    icon: <SettingsBluetoothIcon />,
    name: '蓝牙4',
  },
];

const Home = () => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <Box>
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        {apps.map((app, index) => (
          <GridListTile key={app.name} cols={[1, 2, 2, 1][index % 4]}>
            <ButtonBase
              focusRipple
            >
              {app.icon}
            </ButtonBase>
          </GridListTile>
        ))}
      </GridList>
    </Box>
  );
};
export default Home;
