import { Button } from '@/components/ui/Button';
import { ArrowRight, Icon, LayersIcon, Margin } from 'lucide-react';
import {useState, useEffect} from 'react';
import { Link, NavLink } from 'react-router-dom';
export default function TopBar(){
    const[status, setStatus] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const handleGuestLogin = async(e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        try{
            const response = await fetch("/api/auth/guest", {
                method: "POST",
                body: ""
            });
            const data = await response.json();
            setStatus("Successful Guest Login")
            setIsLoggedIn(true);
            sessionStorage.setItem("isLoggedIn", "true");
            sessionStorage.setItem("access_token", data["access_token"]);
            window.location.reload();
            

        }catch(error){
            setStatus('Error with Guest Login');
            setIsLoggedIn(false);
        }
    }
    return(
        <>
            <div style={{display: 'flex', gap:"10px", justifyContent:'space-between'}}>
                            <div style = {{display: 'flex', gap:'5px'}}>
                                <LayersIcon/>
                                <h1 style={{fontSize: "20px"}}>RoleRider</h1>
                            </div>
                            
                            <div style={{display: 'flex', gap:"25px"}}>
                                <NavLink to='/' style = {({isActive}) => ({
                                    backgroundColor: isActive ? '#349eff' : 'darkgray',
                                    color: isActive ? "white": "black",
                                    padding: "10px",
                                    borderRadius: "5px",
                                })}>Home</NavLink>
                                <NavLink to ="/detailpage" style = {({isActive}) => ({
                                    backgroundColor: isActive ? '#349eff' : 'darkgray',
                                    color: isActive ? "white": "black",
                                    padding: "10px",
                                    borderRadius: "5px",
                                })}>How it Works</NavLink>
                            </div>
                            {
                                !(sessionStorage.getItem("isLoggedIn") == "true") ?(
                                    <form onSubmit={handleGuestLogin}>
                                        <Button type="submit">Continue as Guest</Button>
                                    </form>
                                ): (
                                    <p style={{borderColor:"black", borderWidth: "5px", borderRadius:"15px", padding:"5px", backgroundColor:"darkgray"}}>Guess session</p>
                                )
                            }
                </div>
        </>
    )
}