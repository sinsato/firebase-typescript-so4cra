import './style.css';
import logger from './logger';
import config from './config';
import * as firebase from "firebase/app";
import 'firebase/firestore';

// Initialize Firebase
logger.log('Initializing Firebase');
firebase.initializeApp(config);

//const doc = firebase.firestore().doc('path/to/document');
//const db = firebase.database().ref('path/to/document');

//doc.set({foo: 'bar'}).then(() => logger.log('success')).catch(e => logger.error(e));