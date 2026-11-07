import TopBar from "../topbar/TopBar"

export default function WebDetailsPage(){
    return(
        <>
        <TopBar />
            <div>
                <div style={{display:'flex', fontSize: "30px"}}>
                        <h1>Your Experience.</h1>
                        <h1 style={{color:"purple"}}>Your next best step.</h1>
                </div>
                
            </div>
        </>
    );
}