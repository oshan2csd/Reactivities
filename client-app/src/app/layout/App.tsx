import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container} from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid'



function App() {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);//initial state is undefined
  const [editMode, setEditMode] = useState(false);//state variable for editing


  //client-app is running on port 3000
  //here it is trying to send a GET request from a different port (different domain)
  //Browser security will stop this
  //To allow that we need to add CORS support in Startup.cs class (to whitelist new port or domain)
  //In Configure() and ConfigureServices()
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
    .then( response => {
      setActivities(response.data);
    })
    .catch(error => console.log(error))//optional
  }, [])

  function handleSelectActivity(id:string){
    setSelectedActivity(activities.find(x => x.id === id));
    setEditMode(false);
  }

  function handleCancelActivity(){
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string){
    id ? handleSelectActivity(id) : handleCancelActivity();
    setEditMode(true);
  } 

  function handleFormClose(){
    setEditMode(false);
  }

  function handleDeleteActivity(id:string){
    setActivities([...activities.filter(x => x.id !== id)]);    
  }

  function handleCreateOrEditActivity(activity: Activity){
    //using a conditional operator ? : to check if id exists
    activity.id ?
      setActivities([...activities.filter(x => x.id !== activity.id), activity])//remove edited activity and add it as new activity (with new values, but same id) 
      //: setActivities([...activities, activity]);//new activity, need to assign an id as below
      : setActivities([...activities, {...activity, id: uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity);
  }


  return (
    <>
      <NavBar openForm1={handleFormOpen}/>
      <Container style={{marginTop:'7em'}}>
        <ActivityDashboard 
          activities={activities} 
          selectedActivity = {selectedActivity}
          selectActivity = {handleSelectActivity}
          cancelSelectActivity = {handleCancelActivity}
          editMode = {editMode}
          openForm = {handleFormOpen}
          closeForm = {handleFormClose}
          createOrEdit = {handleCreateOrEditActivity}
          deleteActivity = {handleDeleteActivity}
        />
      </Container>        
    </>
  );
}

export default App;
