import { useContext, useEffect, useState } from "react";
import MyContext from ".";
import { TaskManager } from ".";
// import "./index.css"

export default function Activities(){
    const{activeView,setActiveView,taskContent,setTaskContent}=useContext(MyContext);
    const[inputValue,setinputValue]=useState("")
    const[activitiesData,setactivitiesData]=useState([])
    const[isEditable,setIsEditable]=useState(false)
    const[currentText,setCurrentText]=useState()
    const[currentIndex,setCurrentIndex]=useState("")

    const handleChange=(event)=>{
        setinputValue(event.target.value)
    }

    const handleBackButton=()=>{
        setActiveView("")
        setTaskContent([
            'Notes',
            'Task',
            'Activities'
        ])
    }
    // setactivitiesData((predata)=>{
    //     const newData=[...predata,inputValue]
    //     localStorage.setItem('activities',JSON.stringify(newData))
    //     return newData;
    // })
    const activitiesAdder=()=>{
        if(inputValue.trim()!==""){
           setactivitiesData((prevData)=>{
            const newData=[...prevData,inputValue];
            localStorage.setItem('activities',JSON.stringify(newData));
            return newData;
           })
        }
        else{
            alert("Type something to add ")
        }
        // [...prevdata,inputValue]);
        //     localStorage.setItem('activities',JSON.stringify(activitiesData));

setinputValue("")
    }
    useEffect(()=>{
        const activitiesStorage=localStorage.getItem('activities');
        if(activitiesStorage){
            setactivitiesData(JSON.parse(activitiesStorage))
        }
        // console.log(activitiesData)

    },[])
    const handleEditText=(event)=>{
        setCurrentText(event.target.value)
    }

    const handleDelete=(index)=>{
        const updatedActivitiesData=activitiesData.filter((item,i)=>i!==index);
setactivitiesData(updatedActivitiesData);
localStorage.setItem('activities',JSON.stringify(updatedActivitiesData))
    }
    const handleEdit=(index)=>{
setCurrentIndex(index);
setIsEditable(prevstate=>!prevstate);
    }
    const handleAddText=()=>{
        if(currentText.trim()!==""){
            const updatedWords=[...activitiesData]
            console.log(updatedWords[currentIndex])
            updatedWords[currentIndex]=currentText
            setactivitiesData(updatedWords);
            localStorage.setItem('activities',JSON.stringify(updatedWords))
            setIsEditable(false)
            setCurrentText("")
        }
        else{
            alert("type something to change")
        }

    }

    const handleCancle=()=>{
        setIsEditable(false)
    }
    const clearAll=()=>{
        localStorage.removeItem('activities')
    }
    return(
        <>
          {
            activeView==='Activities'&&(
                <>
                <div className="activities-input-container">
                <h3>Todays activities</h3>
                <button className="button back-button" onClick={handleBackButton}>Back</button>
                <input type="text"
                value={inputValue}
                onChange={handleChange}
                ></input>
                <button className="button add-button" onClick={activitiesAdder}>Add</button>
              
                <div className="clear-all-notes">
                <h4>Click here to clear all the save data</h4>
                <button onClick={clearAll}>Clear All</button>
                </div>
                <div className="activities-output-container">
                    {activitiesData.length>0 ?(
                        <ol type="1">
                            {activitiesData.map((item,index)=><li key={index}>{item}
                                <i className="fas fa-trash"
                                onClick={()=>handleDelete(index)}></i>
                                <i className="fas fa-edit"
                                onClick={()=>handleEdit(index)}></i>
                            </li>)}
                        </ol>
                    ):<h4>There is no activities to show</h4>
                }
                </div>
                </div>
                <div className="editable-container">
                    {isEditable && (
                        <>
                        <div className="isEditable-container">
                        <h4>Sometime we make mistakes</h4>
                        <input type="text" 
                        value={currentText}
                        onChange={handleEditText}
                        />
                        <button className="button back-button"  onClick={handleCancle}>Cancle</button>
                        <button className="button add-button"  onClick={handleAddText}>Add</button>
                        </div>
                       
                        </>
                    )}
                </div>
                
                </>
            )
        }
        </>
      
    )
    
}