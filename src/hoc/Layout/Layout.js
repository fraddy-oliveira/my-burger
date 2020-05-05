import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from './../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from './../../components/Navigation/SideDrawer/SideDrawer';
import * as actions from '../../store/actions/index';

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
