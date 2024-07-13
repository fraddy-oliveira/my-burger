import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from './../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from './../../components/Navigation/SideDrawer/SideDrawer';
import { ENABLED } from '../../utils/constants';

class Layout extends Component {
  state = {
    openSideDrawer: false,
  };

  closeSideDrawerHandler = () => {
    this.setState({ openSideDrawer: false });
  };

  toggleSideDrawerHandler = () => {
    this.setState(prevState => {
      return { openSideDrawer: !prevState.openSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar
          toggleSideDrawer={this.toggleSideDrawerHandler}
          isAuthenticated={this.props.isAuthenticated}
        />
        <SideDrawer
          show={this.state.openSideDrawer}
          close={this.closeSideDrawerHandler}
          isAuthenticated={this.props.isAuthenticated}
        />
        <main className={classes.container}>{this.props.children}</main>
        {process.env.REACT_APP_FEATURE_WEB_ANALYTICS === ENABLED && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon='{"token": "282767a0e3024803a5f4a24b93460591"}'
          ></script>
        )}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
