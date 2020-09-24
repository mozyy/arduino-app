import {
  Box, Button, createStyles, makeStyles, Theme, Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import BluetoothIcon from '@material-ui/icons/Bluetooth';

const useStyles = makeStyles((theme: Theme) => createStyles({
  button: {
    margin: theme.spacing(1),
  },
}));

const Bluetooth = () => {
  const classes = useStyles();
  const [device, setDevice] = useState<BluetoothDevice>();
  // const [chosenHeartRateService, setChosenHeartRateService] =
  // useState<BluetoothRemoteGATTService>();
  const [error, setError] = useState<Error>();
  const [logs, setLogs] = useState<string[]>([]);
  const devices = {};
  const oo:any[] = [];
  const getK = (d:any, dd:any) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const k in d) {
      if (k in d) {
        if (typeof d[k] === 'object') {
          // eslint-disable-next-line no-param-reassign
          dd[k] = {};
          if (oo.includes(d[k])) {
            // eslint-disable-next-line no-continue
            continue;
          } else {
            oo.push(d[k]);
            getK(d[k], dd[k]);
          }
        } else {
          // eslint-disable-next-line no-param-reassign
          dd[k] = d[k];
        }
      }
    }
  };
  getK(device, devices);

  const connectBluetooth = () => {
    function parseHeartRate(data: DataView) {
      const flags = data.getUint8(0);
      const rate16Bits = flags & 0x1;
      const result: {
        heartRate?: number,
        contactDetected?:boolean,
        energyExpended?:number,
        rrIntervals?:number[]
      } = { };
      let index = 1;
      if (rate16Bits) {
        result.heartRate = data.getUint16(index, /* littleEndian= */true);
        index += 2;
      } else {
        result.heartRate = data.getUint8(index);
        index += 1;
      }
      const contactDetected = flags & 0x2;
      const contactSensorPresent = flags & 0x4;
      if (contactSensorPresent) {
        result.contactDetected = !!contactDetected;
      }
      const energyPresent = flags & 0x8;
      if (energyPresent) {
        result.energyExpended = data.getUint16(index, /* littleEndian= */true);
        index += 2;
      }
      const rrIntervalPresent = flags & 0x10;
      if (rrIntervalPresent) {
        const rrIntervals = [];
        for (; index + 1 < data.byteLength; index += 2) {
          rrIntervals.push(data.getUint16(index, /* littleEndian= */true));
        }
        result.rrIntervals = rrIntervals;
      }
      return result;
    }
    function handleBodySensorLocationCharacteristic(
      characteristic:BluetoothRemoteGATTCharacteristic,
    ) {
      if (characteristic === null) {
        console.log('Unknown sensor location.');
        return Promise.resolve();
      }
      return characteristic.readValue()
        .then((sensorLocationData) => {
          const sensorLocation = sensorLocationData.getUint8(0);
          switch (sensorLocation) {
            case 0: return 'Other';
            case 1: return 'Chest';
            case 2: return 'Wrist';
            case 3: return 'Finger';
            case 4: return 'Hand';
            case 5: return 'Ear Lobe';
            case 6: return 'Foot';
            default: return 'Unknown';
          }
        }).then((location) => console.log(location));
    }

    function onHeartRateChanged(event:Event) {
      const characteristic = event.target as BluetoothRemoteGATTCharacteristic;
      console.log(characteristic);
      if (characteristic.value) {
        console.log(parseHeartRate(characteristic.value));
      }
    }

    function handleHeartRateMeasurementCharacteristic(
      characteristic:BluetoothRemoteGATTCharacteristic,
    ) {
      return characteristic.startNotifications()
        .then(() => {
          characteristic.addEventListener('characteristicvaluechanged',
            onHeartRateChanged);
        });
    }

    navigator.bluetooth.requestDevice({
      // filters: [{ services: ['battery_service'] }],
      acceptAllDevices: true,
    }).then((dev) => {
      console.log(`名称: ${dev.name}`);
      console.log(`id: ${dev.id}`);
      console.log(`connected: ${dev.gatt?.connected}`);
      console.log(dev);
      setDevice(dev);
      if (dev.gatt) {
        return dev.gatt.connect();
      }
      return Promise.reject(new Error('没有dev.gatt'));
      // 在此处实现设备调用
    })
      .then((server) => {
        console.log(1111111, server);
        setLogs((l) => ([...l, `connected success server: ${server.device.name}`]));
        return server.getPrimaryService('battery_service');
      })
      .then((service) => {
        console.log('service:', service);
        setLogs((l) => ([...l, `get primary service: ${service.device.name}`]));
        return Promise.all([
          service.getCharacteristic('body_sensor_location')
            .then(handleBodySensorLocationCharacteristic),
          service.getCharacteristic('heart_rate_measurement')
            .then(handleHeartRateMeasurementCharacteristic),
        ]);
      })
      .catch((err) => {
        console.log(`出现错误： ${err}`);
        setError(err);
      });
  };

  return (
    <Box style={{ whiteSpace: 'pre-wrap' }}>
      <Typography variant="h2">
        Bluetooth
      </Typography>
      <div style={{ whiteSpace: 'pre-wrap' }}>
        device:
        <br />
        {JSON.stringify(devices, null, 2)}
      </div>
      <div>
        error:
        {error?.message}
        {JSON.stringify(error)}
      </div>
      <div>
        logs:
        <br />
        {logs.join('\n')}
      </div>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<BluetoothIcon />}
        onClick={connectBluetooth}
      >
        蓝牙
      </Button>
    </Box>
  );
};

export default Bluetooth;
