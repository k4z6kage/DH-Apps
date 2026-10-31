/**
 * index.js
 * Entry point aplikasi. File ini mendaftarkan komponen root (App)
 * ke React Native AppRegistry agar bisa dijalankan di Android & iOS.
 */
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
