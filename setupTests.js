// optional: configure or set up a testing framework before each test
// if you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// used for __tests__/testing-library.js
// learn more: https://github.com/testing-library/jest-dom
// import '@testing-library/jest-dom/extend-expect'

/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { mount, shallow } from 'enzyme';
// import renderer from 'react-test-renderer';

import { render } from '@testing-library/react';

import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
// import { Route, Switch, BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import fetch from 'jest-fetch-mock';

global.React = React;
global.ReactDOM = ReactDOM;
global.mount = mount;
global.shallow = shallow;
// global.renderer = renderer;
// global.Route = Route;
// global.Switch = Switch;
// global.BrowserRouter = BrowserRouter;
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};
global.fetch = fetch;

const mockElement = {
  src: '',
  id: '',
  async: '',
  addEventListener: jest.fn(),
  appendChild: jest.fn(),
  parentNode: {
    insertBefore: jest.fn(),
    removeChild: jest.fn(),
  },
};

global.document = {
  getElementById: jest.fn(id => mockElement),
  createElement: jest.fn(tag => mockElement),
  getElementsByTagName: jest.fn(tagName => [mockElement]),
  documentElement: {
    lang: 'en',
  },
};

global.window = {
  location: {
    hostname: 'localhost',
    pathname: '/',
    origin: 'localhost',
  },
  dataLayer: [],
  history: {
    pushStage: jest.fn(),
  },
  matchMedia: () => ({ matches: null }),
};

global.location = global.window.location;

global.navigator = {
  userAgent: 'node.js',
};
global.history = {};


global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
};

// eslint-disable-next-line import/prefer-default-export
export const logger = {
  // eslint-disable-next-line no-console
  error: console.error,
};

global.logger = logger;

const middlewares = [thunk];
const initialState = {
  search: {
    searchText: "",
    searchType: "user",
    state: "initial",
  },
  user: {},
  repository: {}
};
const mockStore = configureStore(middlewares);
global.store = mockStore(initialState);

Enzyme.configure({ adapter: new Adapter() });
global.Enzyme = Enzyme;


Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});