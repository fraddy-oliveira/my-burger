import React from 'react'
import Logo from './../../Logo/Logo'
import NavigationItems from './../NavigationItems/NavigationItems'
import Aux from './../../../hoc/Aux'
import Backdrop from './../../UI/Backdrop/Backdrop'

import classes from './SideDrawer.css'

const sideDrawer = (props) => {

    let sideDrawerClasses = [classes.SideDrawer]

    if (props.show) {
        sideDrawerClasses.push(classes.Open)
    } else {
        sideDrawerClasses.push(classes.Close)
    }

    return (
        <Aux>
            <Backdrop show={props.show} close={props.close} />
            <div className={sideDrawerClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    )
}

export default sideDrawer;