import React from 'react'
import { RiAddCircleFill } from 'react-icons/ri'

function ButtonCom(props) {
    return (
        <>
            <button type='button' className="bg-info button_main button--aylen button--border-thin button--round-s fw-bold py-2 px-3 rounded-2" onClick={props.onClick}> <RiAddCircleFill className='fs-5 me-1' />{props.btn}</button>
        </>
    )
}

export default ButtonCom