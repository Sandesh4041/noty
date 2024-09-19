import logo from './logo.svg';
import './App.css';
import {TaskManager} from './component/taskManager';
import Tasks from './component/taskManager/task';
import Activities from './component/taskManager/activities';



function App() {
  return (
<TaskManager>
<Tasks/>
<Activities/>
</TaskManager>
  )

}
export default App;
