import Button from '@mui/material/Button';
import React from 'react';

const Sync = () => {
    const onClick = () => {
        console.log("click me")
    }
    return (
        <Button onClick={onClick}>Sync Data</Button>
    )

}
export default Sync