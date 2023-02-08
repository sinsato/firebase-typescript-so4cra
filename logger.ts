'use strict';

///////////////////////////////////
// Rudimentary logger impl that outputs
// to the JS console and to <pre> tag
// in demo app.
//
// It is not doing anything interesting
// and is superfluous to understanding
// the security model. Check out the
// security rules and functions code
// commentary to grok the functionality.
//
// ♡ Firebase
///////////////////////////////////

let parentElement = null;
let queue = [];
const configParms = {element: '#log', type: 'div', insertPoint: 'beforeend' /* use afterbegin for descending */ };

if( document.readyState === 'loading' ) {
  document.addEventListener("DOMContentLoaded", ready);
} 
else {
  ready();
}

function ready() {
  //log('logger ready');
  parentElement = document.querySelector(configParms.element);
  queue.forEach(t => enqueue(t[0], t[1]));
  queue.length = 0;
}

function enqueue(text, isError=false) {
  if( parentElement ) {
    const el = createEl(text, isError);
    parentElement.insertAdjacentElement(configParms.insertPoint, el);
  }
  else {
    queue.push([text, isError]);
  }
}

function isObject(x) {
  return typeof x === 'object' && x;
};

function stringifyArgs(args) {
  let s = '';
  args.forEach(v => s += stringify(v) + ' ');
  return s;
}

function stringify(txt) {
  if( isObject(txt) ) {
    return JSON.stringify(txt);
  }
  else if( typeof txt !== 'string' ) {
    return txt + '';
  }
  return txt;
}

function createEl(text, isError) {
  const el = document.createElement(configParms.type);
  el.textContent = text;
  el.classList.add('log');
  if( isError ) el.classList.add('error');
  return el;
}

export function config(props) {
  Object.keys(props).forEach(k => configParms[k] = props[k]);
  if( parentElement && props.hasOwnProperty('element') ) {
    parentElement = document.querySelector(configParms.element);
  }
}

export function debug(...args) {
  console.log.apply(console, args);
}

export function log(...args) {
  console.log.apply(console, args);
  enqueue(stringifyArgs(args));
}

export function error(...args) {
  console.error.apply(console, args);
  enqueue(stringifyArgs(args), true);
}

export default {
  log: log, error: error, debug: debug, config: config
}
