import { useContext, useEffect, useState } from "react";
import TaskManager from ".";
import MyContext from ".";
// import "./index.css"

export default function Tasks() {
  const { activeView, setActiveView,taskContent,setTaskContent} = useContext(MyContext);
  const [inputValue, setinputValue] = useState("");
  const [inputList, setInputList] = useState([]);
  // const [isChecked,setIsChecked]=useState(false)
  const[checkedList,setCheckedList]=useState([])
  const[checkListData,setCheckedListData]=useState([])
  const[inputListIndex,setInputListIndex]=useState("")


  // for editable state 
  const[editText,setEditText]=useState("")
  const[isEditable,setIsEditable]=useState(false)



  const handleChange = (event) => {
        setinputValue(event.target.value);
    
  
  };
  const handleBack=()=>{
    setActiveView("")
    setTaskContent([
        'Notes',
        'Task',
        'Activities'
    ])
  
  }
  const listAdder = () => {
      if(inputValue.trim()!==''){
          setInputList((preValue) => {
            const newData=[...preValue,inputValue]
            localStorage.setItem('checkListItems',JSON.stringify(newData))
            return newData;
          });
          setCheckedList((precheck)=>[...precheck,false])
          
        }
        setinputValue("")
    
  };
// const myPromise=new Promise((resolve,reject)=>{
//   const sucess=true;
//   if(sucess){
//     resolve(localStorage.setItem('checkListItems',JSON.stringify(inputList)))
//   }
//   else{
//     reject("operation failed")
//   }
// })


  const taskDelete=(index)=>{
    const deletedTask=inputList[index]
    const updatedInputList=inputList.filter((item,i)=>i!==index)
setInputList(updatedInputList);
localStorage.setItem('checkListItems',JSON.stringify(updatedInputList))
if(checkListData.includes(deletedTask)){
  const updatedListData=checkListData.filter((i)=>i!==deletedTask)
  setCheckedListData(updatedListData)
  localStorage.setItem('checked',JSON.stringify(updatedListData))
}

  }

  const handelCheckbox=(event,index,item)=>{
 const isChecked =event.target.checked;
 setCheckedList((prevlist)=>{
  const newList=[...prevlist];
  newList[index]=isChecked;
  return newList;
 })
 if(isChecked){
   setCheckedListData((predata)=>{
    const checkedData=[...predata,item];
    localStorage.setItem('checked',JSON.stringify(checkedData))
    return checkedData;
   });
  // console.log(`checked item: ${index} ${item}`);
 }
 else{
  localStorage.removeItem('checked')
  setCheckedListData(checkListData.filter((listData,i)=>listData!==item));
  // console.log(`remove: ${index} ${item}`);
 };
  }
  useEffect(() => {
    // console.log( checkListData);
  }, [checkListData]);
// useEffect(()=>{
//   localStorage.setItem('checkListItems',JSON.stringify(inputList))
// },[inputList])

useEffect(()=>{
  const checkedStorage=localStorage.getItem('checked')
  const taskStorage=localStorage.getItem('checkListItems')
  if(taskStorage){
    setInputList(JSON.parse(taskStorage))
    // console.log(taskStorage);
  }
  if(checkedStorage){
    setCheckedListData(JSON.parse(checkedStorage))
  }
  

},[])
const handleEdit=(event)=>{

    setEditText(event.target.value)
 

}

const taskEdit=(index)=>{
setIsEditable(prevState=>!prevState)
setInputListIndex(index);
}
const handleEditConfirm=()=>{
  if(editText.trim()!==""){
console.log(editText)
console.log(inputList[inputListIndex]);
const updatedWords=[...inputList];
const previousData=inputList[inputListIndex];
updatedWords[inputListIndex]=editText;
localStorage.setItem('checkListItems',JSON.stringify(updatedWords))
setInputList(updatedWords);
  }
  

setIsEditable(false)
setEditText('');
setInputListIndex(null);
}

const handleCancle=()=>{
  setIsEditable(false)
  setEditText('');
  setInputListIndex(null);
}
const clearAll=()=>{
  localStorage.removeItem('checkListItems')
  localStorage.removeItem('checked')
}

  return (
    <>
      {activeView === "Task" && (
        <>
        <div className="task-container">
        <h3>Write important Task here</h3>
      
          <div className="task-input-container">
            <button className="button back-button" onClick={handleBack}>Back</button>
            <input
              type="text"
              placeholder="write something.."
              value={inputValue}
              onChange={handleChange}
            />
            <button className="button add-button" onClick={listAdder}>Add</button>
          </div>
          <div className="clear-all-task">
            <h4>Click here to clear all the save data</h4>
            <button onClick={clearAll}>Clear All</button>
          </div>
          <div className="task-output-container">
            {inputList.length > 0 ? (
              <ol type="1">
                {inputList.map((item, index) => (
                  <li key={index}>
                    <input type="checkbox"
                    checked={checkListData.includes(item)}
                    // value={isChecked}
                    onChange={(event)=>handelCheckbox(event,index,item)}
                    ></input>
                    {item}
                    <i
                      onClick={() => taskDelete(index)}
                      className="fas fa-trash"
                    ></i>
                    <i
                    onClick={()=>taskEdit(index)}
                    className="fas fa-edit"
                    ></i>
                  </li>
                ))}
              </ol>
            ) : (
              "There is no task to show"
            )}
          </div>
          <div className="checked-container">
         {checkListData.length>0 &&(
          <>
        
          <h3>Completed task</h3>
          <ol type="1">{
          checkListData.map((listData,index)=>
            <li key={index}>{listData}</li> )}
             </ol>
             </>
         )
         }
          </div>
          </div>
          <div className="editable-container">
           {isEditable &&(
            <>
            <div className="isEditable-container">
            <h3>Everybody makes mistake</h3>
             <input type="text"
             value={editText}
             onChange={handleEdit}
             />
             <button className="button back-button"  onClick={handleCancle}>Cancle</button>
             <button className="button add-button"  onClick={handleEditConfirm}>Done</button>
            </div>
         
            </>
           
           ) } 
          </div>
        </>
      )}
    </>
  );
}
