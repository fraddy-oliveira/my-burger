import React, { Component } from 'react'
import Aux from './../../hoc/Aux'
import classes from './Layout.css'
import Toolbar from './../Navigation/Toolbar/Toolbar'
import SideDrawer from './../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {

    state = {
        openSideDrawer: false
    }

    closeSideDrawerHandler = () => {
        this.setState({ openSideDrawer: false })
    }

    toggleSideDrawerHandler = () => {
        this.setState((prevState) => {
            return { openSideDrawer: !prevState.openSideDrawer }
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar toggleSideDrawer={this.toggleSideDrawerHandler} />
                <SideDrawer show={this.state.openSideDrawer} close={this.closeSideDrawerHandler} />
                <main className={classes.container} >
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;