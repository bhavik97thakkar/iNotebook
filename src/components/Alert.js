
import React from 'react'

function Alert(props) {
    const capital = (word) => {
        if(word === "danger"){
            word = "error";
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <div style={{height:'50px'}}>
            {props.alert &&
                <div className={`alert alert-${props.alert.type}`} role="alert">
                    <b>{capital(props.alert.type)}</b> : {props.alert.msg}
                </div>}
        </div>


    ) 
}

export default Alert

