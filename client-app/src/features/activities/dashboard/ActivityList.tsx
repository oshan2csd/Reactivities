import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props{
   activities: Activity[]; 
   selectActivity:(id:string) => void;
   deleteActivity:(id:string) => void;
   submitting: boolean;
}

export default function ActivityList({activities, selectActivity, deleteActivity, submitting}: Props){
    
    /**
     * Setting loading icon just for the deleting button
     */
    const [target, setTarget] = useState('');

    /**
     * All mouse events coming from SyntheticEvent
     * 
     */ 
    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }

    return(
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
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
                                    onClick={() => selectActivity(activity.id)} 
                                    floated='right' 
                                    content='View' 
                                    color='blue'/>
                                <Button 
                                    name={activity.id}//Giving unique name property to identify deleting record's delete button
                                    loading={submitting && target === activity.id}
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
}