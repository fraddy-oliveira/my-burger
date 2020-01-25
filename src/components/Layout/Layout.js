import React from 'react'
import Aux from './../../hoc/Aux'
import classes from './Layout.css'
import Toolbar from './../Navigation/Toolbar/Toolbar'

const layout = props => {
    return (
        <Aux>
            <Toolbar />
            <main className={classes.container} >
                {props.children}
            </main>
        </Aux>
    )
}

export default layout;