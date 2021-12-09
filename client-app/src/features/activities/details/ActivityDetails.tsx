//This is a child component of ActivityDashboard.tsx.
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default function ActivitiesDetails() {

    const {activityStore} = useStore(); //Get from activitystore
    const {selectedActivity: activity, loadActivity,  loadingInitial /* openForm, cancelSelectedActivity //Replaced with Routing */} = activityStore;//destructure the above
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadActivity(id);
    }, [id, loadActivity])

    if (loadingInitial || !activity) return <LoadingComponent /> //Checking to see if we have activity

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
                    <Button as={Link} to={`/manage/${activity.id}`}
                        basic color = 'blue' content='Edit' 
                    />
                    <Button as={Link} to='/activities' 
                        basic color = 'grey' content='Cancel' 
                    />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}