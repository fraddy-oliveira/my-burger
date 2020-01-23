import React from 'react'
import classes from './BurgerControls.css'
import BurgerControl from './BuildControl/BuildControl'

const controls = [
    { label: "Meat", type: "meat" },
    { label: "Cheese", type: "cheese" },
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" }
]

const builderControls = props => {
    return (
        <div className={classes.BurgerControls}>
            {
                controls.map(ingred => (
                    <BurgerControl
                        key={ingred.type}
                        label={ingred.label}
                        type={ingred.type}
                        addIngredient={props.addIngredient}
                        removeIngredient={props.removeIngredient}
                    />
                ))
            }
        </div>
    )
}

export default builderControls;