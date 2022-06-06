import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './Components/Layout';
import { Gallery } from './Components/Gallery';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
      return (
       <Layout >
        <Route exact path='/' component={Gallery} />
      </Layout>
    );
  }
}
