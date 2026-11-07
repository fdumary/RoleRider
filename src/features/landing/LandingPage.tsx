import { Button } from '@/components/ui/Button';
import { ArrowRight, Icon, LayersIcon, Margin } from 'lucide-react';
import {useState} from 'react';
import { Link, NavLink } from 'react-router-dom';

function LandingPage(){
    const[status, setStatus] = useState('');
    const handleGuestLogin = async() =>{
        try{
            const response = await fetch("/api/auth/guest", {
                method: "POST",
                body: ""
            });
            const data = await response.json();
            setStatus("Guest Login Successful");

        }catch(error){
            setStatus('Error with Guest Login');
        }
    }
    return(
        <>
            <div style={{display: 'flex', gap:"10px", justifyContent:'space-between'}}>
                <div style = {{display: 'flex', gap:'5px'}}>
                    <LayersIcon/>
                    <h1>RoleRider</h1>
                </div>
                
                <div style={{display: 'flex', gap:"25px"}}>
                    <NavLink to='/' style = {({isActive}) => ({
                        backgroundColor: isActive ? '#349eff' : 'transparent',
                        color: isActive ? "white": "black",
                        padding: "10px",
                        borderRadius: "5px",
                    })}>Home</NavLink>
                    <NavLink to ="/">How it Works</NavLink>
                </div>
                <form onSubmit={handleGuestLogin}>
                    <Button rightIcon=<ArrowRight/> type="submit">Continue as Guest</Button>
                </form>
                
                
            </div>
        </>
    )
}

function guestLogin(){

}
export default LandingPage;