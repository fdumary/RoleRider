import { Button } from '@/components/ui/Button';
import { ArrowRight, Icon, LayersIcon, Margin } from 'lucide-react';
import {useState, useEffect} from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import TopBar from '@/features/topbar/TopBar';

function LandingPage(){
    
    return(
        <>
            <TopBar/>
            
            {sessionStorage.getItem("isLoggedIn") == "true" ?
                (
                    <div style={{justifySelf:'center', marginTop:"50px"}}>
                        <AssessmentBlock/>
                    </div>
                ):
                (
                    <div style={{justifySelf:'center', marginTop:"50px"}}>
                        <p>Not Logged In</p>
                    </div>
                )
            }
            
        </>
    )
}

function AssessmentBlock(){
    const [selectedJob, setSelectedJob] = useState("");
    const [fileData, setFileData] = useState(new FormData());
    const [fileUploaded, setFileUploaded] = useState(false);
    const navigate = useNavigate();
    const onJobSelect = async(e: React.ChangeEvent<HTMLSelectElement>) => {
        if(e.target.value != "Choose a job"){
            setSelectedJob(`${e.target.value}`);
        }else{
            setSelectedJob("");
        }
    }
    const onFileUploaded = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(!file) return;
        const formData = new FormData();
        formData.append('file', file);
        setFileData(formData);
        setFileUploaded(true);

        
    }

    const onResumeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = sessionStorage.getItem("access_token");
        fileData.append("job_description", selectedJob);
        try{
            const response = await fetch('/api/resumes/upload', {
                method: 'POST',
                body: fileData,
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            localStorage.setItem("results", JSON.stringify(data))
            navigate('/resultpage', { replace: true });
            console.log("Successful Resume upload");
        }catch(error){
            console.log("ERROR WITH RESUME POST");
        }
    }
    return(
        <>
            <div style={{position: 'relative', display: 'inline-block'}}>
                <select id='job' name='Choose a job' defaultValue="Choose a job" style={{color:"black", marginRight: "20px"}} onChange={onJobSelect}>
                    <option value="Choose a job">Choose a job</option>
                    <option value="Junior Backend Developer">Junior Backend Developer</option>
                    <option value="Junior Frontend Developer">Junior Frontend Developer</option>
                    <option value="Junior Full-Stack Developer">Junior Full-Stack Developer</option>
                    <option value="Junior Data Analyst">Junior Data Analyst</option>
                    <option value="Junior QA Engineer / Tester">Junior QA Engineer / Tester</option>
                </select>

                <input type='file' accept="application/pdf" onChange={onFileUploaded}/>
            </div>
            <div>
                
                    {
                        (!fileUploaded || selectedJob == "")?(
                            <form>
                                <Button type='button' style={{backgroundColor: 'gray'}}>Submit</Button>
                            </form>
                        ):
                        (
                            <form onSubmit={onResumeSubmit}>
                                <Button type='submit' style={{backgroundColor: 'blue'}}>Submit</Button>
                            </form>
                        )
                    }
                    
                
            </div>
            
            
        </>
    )
}
export default LandingPage;