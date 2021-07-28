import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

export default observer(function ActivityDashboard(){
    
    const {activityStore} = useStore();
    const {selectedActivity, editMode, loadActivities, activityRegistry} = activityStore; //destructuring required properties
  
    useEffect(() => {
        if(activityRegistry.size <= 1) loadActivities();
    },[loadActivities, activityRegistry.size])

    if(activityStore.loadingInitial) return <LoadingComponent />

 
    return(
        <Grid>
            <Grid.Column width='10'>    
                <ActivityList />  
            </Grid.Column>            
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&//react tries to load details component at the same time as Dashboard, at that time there is no items in the activities array, just use '&&' to make right part of it execute only if selectedActivity is not null or undefined 
                <h2>Activity Filters</h2>}
                {editMode &&
                <ActivityForm />}
            </Grid.Column>
        </Grid>
    )
})