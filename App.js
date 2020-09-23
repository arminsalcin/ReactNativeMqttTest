/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {SafeAreaView, Text, StatusBar} from 'react-native';

import MQTT from 'sp-react-native-mqtt';

const cloudMqttOptions = {
  host: 'm16.cloudmqtt.com', // host, url od brokera
  port: 13727, // port, pazi neki brokeri imaju tls security itd..
  user: 'armin', //username od brokera ( namjestena auth na brokeru)
  pass: 'secret', //pass od brokera ( namjestena auth na brokeru)
};

const App: () => React$Node = () => {
  const [data, setData] = useState();

  MQTT.createClient({
    ...cloudMqttOptions,
    clientId: 'any id you want', // bilo koji id mora biti unique
    auth: true, // setaj ovo na false ako nemas authentikacije na brokeru
  })
    .then(function (client) {
      client.on('closed', function () {
        console.log('mqtt.event.closed');
      });

      client.on('error', function (msg) {
        console.log('mqtt.event.error', msg);
      });

      client.on('message', function (msg) {
        console.log('mqtt.event.message', msg);
        setData(msg.data);
      });

      client.on('connect', function () {
        console.log('connected');
        client.subscribe('/data', 0);
      });

      client.connect();
    })
    .catch(function (err) {
      console.log(err);
    });

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text>{data}</Text>
      </SafeAreaView>
    </>
  );
};

export default App;
