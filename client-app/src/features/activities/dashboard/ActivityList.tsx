import { observer } from 'mobx-react-lite';
import  { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function ActivityList(){

    const {activityStore} = useStore();
    const {activitiesByDate, deleteActivity, loading} = activityStore
    
    //Setting loading icon just for the deleting button
    const [target, setTarget] = useState('');

    //Note: All mouse events coming from SyntheticEvent 
    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id:string){
        if(window.confirm("Do you want to delete this activity?")){
            setTarget(e.currentTarget.name);
            deleteActivity(id);
        }
    }

    return(
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'> {activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button 
                                    //onClick={() => selectActivity(activity.id)} 
                                    as={Link} to={`/activities/${activity.id}`}
                                    floated='right' 
                                    content='View' 
                                    color='blue'/>
                                <Button 
                                    name={activity.id}//Giving unique name property to identify deleting record's delete button
                                    loading={loading && target === activity.id}
                                    onClick={(e) => handleActivityDelete(e, activity.id)} 
                                    floated='right' 
                                    content='Delete' 
                                    color='red'/>
                                <Label basic content={activity.category} color='green'/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})