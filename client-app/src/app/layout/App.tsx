import React, { useEffect, useState } from 'react';
import { Container} from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid'
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';



function App() {

  const {activityStore} = useStore();

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);//initial state is undefined
  const [editMode, setEditMode] = useState(false);//state variable for editing
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);//for submit edit/create 
  
  /**
   * client-app is running on port 3000
   * here it is trying to send a GET request from a different port (different domain)
   * Browser security will stop this
   * To allow that we need to add CORS support in Startup.cs class (to whitelist new port or domain)
   * In Configure() and ConfigureServices()
   */

  /**
   * Below code can be simplified further
   * So it is commented
   */

  /**
   useEffect(() => {
     axios.get<Activity[]>('http://localhost:5000/api/activities')
     .then( response => {
       setActivities(response.data);
     })
     .catch(error => console.log(error))//optional
   }, [])
   */


  /**
   * The Equievalent of above code
   * Most of above work done in agent.ts
   */
  useEffect(() => {
    agent.Activities.list()
    .then(response => {
      
      //Take out Date part (from Date String)
      let activities: Activity[] = [];
      response.forEach(acti => {
        acti.date = acti.date.split('T')[0];
        activities.push(acti);
      })
      setActivities(activities);
      setLoading(false);
    })
    .catch(error => console.log(error))//optional
  },[])

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
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)]); 
      setSubmitting(false);
    })
     
  }

  function handleCreateOrEditActivity(activity: Activity){
    setSubmitting(true);
    if(activity.id){
      agent.Activities.update(activity)
      .then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity]);//remove edited activity and add it as new activity (with new values, but same id) 
        setSubmitting(false);
        setSelectedActivity(activity);
        setEditMode(false);
      })      
    }else{
      activity.id = uuid();//Assign an Unique Id to new activity 
      agent.Activities.create(activity)
      .then(() => {
        setActivities([...activities, activity]);
        setSubmitting(false);
        setSelectedActivity(activity);
        setEditMode(false);
      })
    }    
    
  }


  /**
   * Before painting the UI (NavBar, Dashboard etc..)
   * Check status of loading and display if required   
   */
  if(loading) return <LoadingComponent />


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
          submitting = {submitting}
        />
      </Container>        
    </>
  );
}

export default observer(App);
