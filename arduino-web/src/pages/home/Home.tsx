import {
  Box, ButtonBase, createStyles, GridList, GridListTile, makeStyles, Theme, colors,
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
    width: '100%',
    // height: 450,
  },
  button: {
    width: '100%',
    height: '100%',
    color: '#fff',
    fontSize: theme.typography.h2.fontSize,
  },
}));

const apps = [
  {
    Icon: SettingsBluetoothIcon,
    name: '蓝牙',
    link: '/bluetooth',
  },
  {
    Icon: SettingsBluetoothIcon,
    name: '蓝牙2',
    link: '/bluetooth',
  },
  {
    Icon: SettingsBluetoothIcon,
    name: '蓝牙3',
    link: '/bluetooth',
  },
  {
    Icon: SettingsBluetoothIcon,
    name: '蓝牙4',
    link: '/bluetooth',
  },
];

const Home = () => {
  const history = useHistory();
  const classes = useStyles();
  const { common, ...color } = colors;
  const colorsValues = Object.values(color);
  console.log(colorsValues);
  return (
    <Box>
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        {apps.map((app, index) => (
          <GridListTile key={app.name} cols={[1, 2, 2, 1][index % 4]}>
            <ButtonBase
              focusRipple
              className={classes.button}
              style={{
                background: colorsValues[index % colorsValues.length]['700'],
              }}
              onClick={() => {
                history.push(app.link);
              }}
            >
              <app.Icon fontSize="inherit" />
            </ButtonBase>
          </GridListTile>
        ))}
      </GridList>
    </Box>
  );
};
export default Home;
