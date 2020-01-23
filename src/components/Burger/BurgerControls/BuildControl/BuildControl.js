import React from 'react'
import classes from './BuildControl.css'

const builderControl = props => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label} >{props.label}</div>
            <button
                className={classes.Less}
                onClick={() => props.removeIngredient(props.type)}>Less</button>
            <button
                className={classes.More}
                onClick={() => props.addIngredient(props.type)}>More</button>
        </div>
    )
}

export default builderControl;