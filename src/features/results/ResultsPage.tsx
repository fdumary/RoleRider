import { Fragment, useEffect, useState } from "react";
import TopBar from "../topbar/TopBar";
import { Link } from "react-router-dom";

export default function ResultsPage(){
    const raw = localStorage.getItem("results");
    const json = raw? JSON.parse(raw): null;
    const skills = json.ai_response.candidate.strongest_skills;
    const [viewState, setViewState] = useState("Skills View");
    console.log(json);

    const handleOptionChosen = async(e: React.ChangeEvent<HTMLSelectElement>) => {
        setViewState(e.currentTarget.value);
        console.log(viewState);

    }
    const selectList = (
        <select value={viewState} style={{color:"black"}} onChange={handleOptionChosen}>
                <option value="Skills View">Skills View</option>
                <option value="Learning Pathway">Learning Pathway</option>
                <option value="Projects">Projects</option>
        </select>
    )
        return(
        <>
            <TopBar />
            <h2>{viewState}</h2>
            {selectList}
            {viewState === "Skills View" && <SkillsCard />}
            {viewState === "Learning Pathway" && <LearningPath />}
            {viewState === "Projects" && <Projects />}
        </>
        );
    
    
}
function SkillsCard(){
    const raw = localStorage.getItem("results");
    const json = raw? JSON.parse(raw): null;
    const skills = json.ai_response as SkillGapReport | null;
    console.log(skills);
    if(!skills) return null;
    return(
        <>
        <div style={{width: "45%", justifySelf: "center", marginTop: "50px"}}>
            <h1 style={{textAlign: "center", fontWeight: "bold", fontSize: "20px"}}>Skills List</h1>
            {skills.skill_gaps.map(({skill, current_level, target_level, gap, priority}) =>(
                <div key={skill} style={{alignSelf: "flex-start", marginTop: "20px"}}>
                    <h4 style={{textAlign: "center"}}>{skill}</h4>
                    <table style={{border: "2px solid black", width: "100%", tableLayout:"fixed", borderCollapse: "separate", borderSpacing: "10px 0"}}>
                        <tbody>
                        <tr>
                            <th style={{border: "2px solid black", overflowWrap: "anywhere"}}>Current Level</th>
                            <th style={{border: "2px solid black", overflowWrap: "anywhere"}}>Target Level</th>
                            <th style={{border: "2px solid black", overflowWrap: "anywhere"}}>Gap</th>
                            <th style={{border: "2px solid black", overflowWrap: "anywhere"}}>Priority</th>
                        </tr>
                        <tr>
                            <td style={{textAlign: "center", overflowWrap: "anywhere"}}>{(current_level == "not_demonstrated")? "None": current_level}</td>
                            <td  style={{textAlign: "center", overflowWrap: "anywhere"}}>{target_level}</td>
                            <td  style={{textAlign: "center", overflowWrap: "anywhere"}}>{gap}</td>
                            <td  style={{textAlign: "center", overflowWrap: "anywhere"}}>{priority}</td>
                    </tr>
                        </tbody>
                        
                    </table>
                </div>
            ))};
        </div>
        </>
    );
}

function LearningPath(){
    const raw = localStorage.getItem("results");
    const json = raw? JSON.parse(raw): null;
    return(
        <>
        <div style={{justifySelf: "center", width: "50%", textAlign: "center"}}>
            {json.ai_response.learning_path.stages.map((stage, i) =>(
                <Fragment key={stage.order}>
                    <h2 key={stage.order}>{stage.title}</h2>
                    <ul>
                        {stage.skills.map((skill, j) =>(
                            <li key={j}>{(skill ==";")? "": skill}</li>
                        ))};
                    </ul>
                    {stage.completion_criteria.map((comp, i) => (
                        <label key={i}><input type="checkbox" /> {comp} <br/></label>
                    ))}
                    <ul>
                        {stage.objectives.map((obj, i) => (
                        <li key={i}>{obj}</li>
                    ))}
                    </ul>
                    <div>
                        {stage.resources.map((res, i) =>(
                            <Fragment key={i}>
                                <a href={res.url} style={{textAlign:"center"}}>
                                    <h2 key={res.title}>{res.title}</h2>
                                </a>
                            </Fragment>
                            
                        ))}
                    </div>
                    
                    
                </Fragment>
                
                
            ))}
        </div>
        </>
    )
}

function Projects(){
    const raw = localStorage.getItem("results");
    const json = raw? JSON.parse(raw): null;
    return(
        <>
        <div style={{justifySelf: "center", width: "50%", textAlign: "center"}}>
            <h1 style={{fontSize: "50px", fontWeight: "bolder"}}>Projects</h1>
            {json.ai_response.projects.map((proj, i)=> (
                <Fragment key={i}>
                    <div style={{backgroundColor: "#3e3b3b", borderRadius: "20px", borderColor: "black", marginBottom: "20px"}}>

                    <h3 style={{fontSize: "30px", color: "black", fontWeight: "bold"}}>{proj.title}</h3>
                        <h4 style={{fontSize: "20px", fontWeight:"bold"}}>Descriptions</h4>
                        <p>{proj.description}</p>
                    
                    <h4 style={{fontSize: "20px", fontWeight:"bold"}}>Skills</h4>
                    <ul>
                        {proj.skills_developed.map((skill, i) => (
                            <li key={i}>{skill}</li>
                        ))}
                    </ul>
                   <h4>Technology Stack</h4> 
                    <ul>
                        {proj.technologies.map((tech, i)=>{
                            <li key={i}>{tech}</li>
                        })}
                    </ul>
                    <h4>Steps</h4>
                    <div>
                        {proj.implementation_steps.map((step, i) =>(
                            <p key={i}>Step {i} {step}</p>
                        ))}
                    </div>
                    </div>
                </Fragment>
            ))}
        </div>
        </>
    );
}

interface SkillGap{
    skill: string;
    importance: string;
    current_level: string;
    target_level: string;
    gap: string;
    priority: string;
    reason: string;
}

interface SkillGapReport{
    array: any;
    skill_gaps: SkillGap[];
}