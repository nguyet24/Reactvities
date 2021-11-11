//This is a child component of ActivityDashboard.tsx.
import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/activities";

interface Props {
    activity: Activity
    cancelSelectActivity: () => void;
    openForm: (id: string) => void
}

export default function ActivitiesDetails({activity, cancelSelectActivity, openForm}: Props) {
    return (
        //Below fluid means for card to take up the remaining space
        <Card fluid>{/* Another way to re import things from sematic ui. Go to <Card> and delete and renter the d. Then select semantic UI. This will auto poplate the imports section. */}
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} /> {/* Use backticks not brackets, template literal to allow us to add js properties inside a string */}
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header> {/* When copy from Sematic header does not have {} as it is JS form. Coz we using tsx we will need to put {} to use JS. */}
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick ={() => openForm(activity.id)} //This uses () => as it is passing id parameter
                        basic color = 'blue' content='Edit' 
                    />
                    <Button onClick={cancelSelectActivity /* No need for () coz not passing any parameters */} 
                        basic color = 'grey' content='Cancel' 
                    />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}