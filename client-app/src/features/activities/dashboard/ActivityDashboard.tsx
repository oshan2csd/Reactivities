import { observer } from 'mobx-react-lite';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

export default observer(function ActivityDashboard(){
    
    const {activityStore} = useStore();
    const {selectedActivity, editMode} = activityStore; //destructuring required properties
    return(
        <Grid>
            <Grid.Column width='10'>    
                <ActivityList />  
            </Grid.Column>            
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&//react tries to load details component at the same time as Dashboard, at that time there is no items in the activities array, just use '&&' to make right part of it execute only if selectedActivity is not null or undefined 
                <ActivityDetails />}
                {editMode &&
                <ActivityForm />}
            </Grid.Column>
        </Grid>
    )
})