//This displays what is in the form and is the child component of ActivityDashBoard.tsx
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activities";

interface Props {
    activity: Activity | undefined;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
}

export default function ActivityForm({activity: selectedActivity, createOrEdit /* This changes the above Props variable name */, closeForm} : Props) {

    //Our initial state is either going to be the selected activity or properties that we have inside the activity object.
    const initialState = selectedActivity ?? { //If the initial state is empty then do this:
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: '',
    }

    //Use State Hook
    const [activity, setActivity] = useState(initialState); //variable name = activity, set activity = used state, pass the above initial state in parameters.

    //When submit button is clicked
    function handelSubmit() {
        createOrEdit(activity);
    }

    function handelInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value})
    }
   
    return (
        <Segment clearing> {/* Clearing clears any floated objects, it makes the object embedded instead */}
            <Form onSubmit={handelSubmit} autoComplete ='off' /* This turns the browser autocomplete function off */ >
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handelInputChange} /> {/* React will break if when value & name is added, hence will need to add handle input change function above. */}
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handelInputChange} /> {/* This is text need to update HTMLTextAreaElement in handleIputChange */}
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handelInputChange} />
                <Form.Input placeholder='Date' value={activity.date} name='date' onChange={handelInputChange}  />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handelInputChange}  />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handelInputChange}  />
                <Button floated='right' positive type ='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type ='button' content='Cancel' />
            </Form>
        </Segment>
    )
}