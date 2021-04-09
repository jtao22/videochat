import React, {useContext} from 'react'
import {Button} from '@material-ui/core';
import {SC} from '../socket';


const Notif = () => {
    const {answer,calling,answered} = useContext(SC);
    return (
        <>
            {calling.isReceivingCall && !answered && (
                <div style={{display:'flex', justifyContent:'center'}}>
                    <h1>{calling.name} is calling!</h1>
                    <Button variant="contained" color="primary" onClick={answer}>Answer </Button>
                </div>
            )}
        </>
    )
}

export default Notif
