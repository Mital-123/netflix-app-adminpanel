import React from 'react'

function ButtonCom(props) {
    return (
        <>
            <button type='button' className="bg-info button_main button--aylen button--border-thin button--round-s fw-bold py-2 px-3 rounded-2" onClick={props.onClick}>{props.btn}</button>
        </>
    )
}

export default ButtonCom