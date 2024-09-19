import { useEffect, useState,createContext} from "react";
import "./index.css"


const MyContext=createContext();
export  function TaskManager({children}){
    const[taskContent,setTaskContent]=useState([
        'Notes',
        'Task',
        'Activities'])
        const[inputValue,setinputValue]=useState("")
        const[noteList,setNoteList]=useState([])
        const[activeView,setActiveView]=useState("")
      

    const NoteHandler=()=>{
        setTaskContent([]);
    setActiveView('Notes');
}
    const HandleChange=(event)=>{
        setinputValue(event.target.value)
    }
    const noteButton=()=>{
        if(inputValue.trim()!==''){
            setNoteList(prevNotes=>{
                const newData=[...noteList,inputValue]
                localStorage.setItem('noteList', JSON.stringify(newData));
                return newData;
            })
            setinputValue(""); 
        }

    }
  

//   useEffect(() => {
//     localStorage.setItem('noteList', JSON.stringify(noteList));
//   }, [noteList]);


    useEffect(() => {
        const storedNotes = localStorage.getItem('noteList');
        if (storedNotes) {
            setNoteList(JSON.parse(storedNotes));
        }
        // console.log(storedNotes);
      },[]);
   



    const TaskHandler=()=>{
        setTaskContent([]);
    setActiveView('Task');
    }

    const ActivitiesHandler=()=>{
        setTaskContent([]);
    setActiveView('Activities');
    }
    const noteDelte=(index)=>{
        // console.error("sandesh")
        const updatedNotes=noteList.filter((item,i)=>i!==index)
       setNoteList(updatedNotes);
       localStorage.setItem('noteList',JSON.stringify(updatedNotes))
       console.log(`noteList[${index}]`)
 
    }
    const handlebackButton=()=>{
        setActiveView("")
        setTaskContent(['Notes','Task','Activities'])
    }
    const clearAll=()=>{
        localStorage.removeItem('noteList')
    }

    return(

        <>
            <header>
<h1>Time is everything</h1>
        </header>
        <section className="task-list-container">
          

           
                {
                          taskContent.map((data,index)=>(
                            <article key={index}>
                                {/* <button className="task-button" onClick={data==='Notes'?NoteHandler:
                                    data==='Task'?TaskHandler:
                                    data==='Activities'?ActivitiesHandler:null
                                    }>{data}</button> */}
                                <button className="task-button" onClick={(data==='Notes'?NoteHandler:null)||
                                    (data==='Task'?TaskHandler:null)||
                                    (data==='Activities'?ActivitiesHandler:null)
                                    }>{data}</button>
                            </article>
                          ))
                }
                </section>
<div className="notes-task-activites">
{
                   activeView==='Notes' &&   (
                    <div className="notes-container">
                        <h3>Write important notes here</h3>
                    <div className="note-input-container">
                        <button className="button back-button" onClick={handlebackButton}>Back</button>
                    <input type="text" 
                placeholder="write something important"
                value={inputValue}
                onChange={HandleChange}></input>
                <button className="button add-button" onClick={noteButton}>Add</button>
                    </div>
                    <div className="clear-all">
                    <h4>Click here to clear all the save data</h4>
                        <button onClick={clearAll}>Clear All</button>
                    </div>
                    <div className="note-output-container">
                        {noteList.length===0?'There is no any notes here':<ol type="1">
                            {
                        noteList.map((item,index)=>
                            <li key={index}>{item}<i onClick={()=>noteDelte(index)} className="fas fa-trash"></i></li>
                       )}
                       </ol>}
                    </div>
             
                </div>
                   )
                  
                }

</div>

                {
                    <MyContext.Provider value={{activeView,setActiveView,taskContent,setTaskContent}}>
                        {children}
                    </MyContext.Provider>
                    
                }
                <div className="image-don">
  
</div>

              
          
        
        </>
    
        
     
        
    )
    
}
export default MyContext;



  /* <article>
                <button onClick={()=>NoteHandler()}>Notes</button>
            
            </article>
            <article>
                <button>Task</button>
            </article>
            <article>
                <button>Daily Activities</button>
            </article> */