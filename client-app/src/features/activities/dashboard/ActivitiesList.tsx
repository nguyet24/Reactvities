//This ActivitiesList.tsx is the child component of ActivitiesDashboard.tsx
import React from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activities";

interface Props {
    activities: Activity[]; 
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
}


export default function ActivityList({activities, selectActivity, deleteActivity}: Props) { //For destructor notes refer to ActivitiesDashboard.tsx
    return(
        //For LH instead of semactic ui styling use Oceania Blue for ANZ
        <Segment>
            <Item.Group divided> {/* divided adds a line in between each activities */}
                {activities.map(activity =>(
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue} </div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectActivity(activity.id) /* the () => is required, it waits for the button to be clicked before doing anything */} 
                                    floated='right' content='View' color='blue' 
                                />
                                <Button onClick={() => deleteActivity(activity.id) /* the () => is required, it waits for the button to be clicked before doing anything */} 
                                    floated='right' content='Delete' color='red' 
                                />
                                <Label basic content={activity.category}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}