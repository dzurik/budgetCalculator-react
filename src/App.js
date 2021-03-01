import React, { Suspense, useEffect, useCallback } from 'react';

import classes from './App.module.scss';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Overview from './containers/Overview/Overview';
import Spinner from './components/UI/Spinner/Spinner';

import Layout from './hoc/Layout/Layout';
import { useDispatch } from 'react-redux';
import * as actions from './store/actions/index';

const Transactions = React.lazy(() => {
  return import('./containers/Transactions/Transactions');
});

const App = (props) => {
  const dispatch = useDispatch();

  const onFirstRun = useCallback(() => dispatch(actions.initiateSetup()), [dispatch]);

  useEffect(() => {
    onFirstRun();
  }, [onFirstRun]);

  return (
    <div className={classes.App}>
      <Layout>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path="/transactions" render={(props) => <Transactions {...props} />} />
            <Route path="/" render={(props) => <Overview {...props} />} />

            <Redirect to="/" />
          </Switch>
        </Suspense>
      </Layout>
    </div>
  );
};

export default withRouter(App);
