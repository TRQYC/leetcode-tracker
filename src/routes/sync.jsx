
import Button from '@mui/material/Button';

const Sync = props => {
    const onClick = () => {
        
        console.log("click me")
    }
    return (
        <Button onClick={onClick}>Sync Data</Button>
    )

}
export default Sync