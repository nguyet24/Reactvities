//This displays what is in the form and is the child component of ActivityDashBoard.tsx
import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import {v4 as uuid} from 'uuid';
import { Link } from "react-router-dom";

export default observer (function ActivityForm() {
    const history = useHistory();
    const {activityStore} = useStore();  //get activities from store
    const {/* closeForm, //replace by routing */ createActivity, updateActivity, 
        loading, loadActivity, loadingInitial} = activityStore; //Destructure the above usestore activity
    const {id} = useParams<{id: string}>();

      //Use State Hook
      const [activity, setActivity] = useState({ 
        //Our initial state is either going to be the selected activity or properties that we have inside the activity object.
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: '',
      }); //variable name = activity, set activity = used state, pass the above initial state in parameters.

    //The state is set here
    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!)) //! is to let type script know that there is no issues here
    }, [id, loadActivity]);

   

    //When submit button is clicked, checking if id exist, if do then update activity, if not then create new activity
    function handelSubmit() {
       if (activity.id.length === 0) {
           let newActivity = {
               ...activity,
               id: uuid()
           };
           createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`))
       } else {
           updateActivity(activity).then(() => history.push(`/activities/${activity.id}`))
       }
    }

    function handelInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value})
    }

    //This checks to see if we are loading
    if (loadingInitial) return <LoadingComponent content='Loading activity...' />

    return (
        <Segment clearing> {/* Clearing clears any floated objects, it makes the object embedded instead */}
            <Form onSubmit={handelSubmit} autoComplete ='off' /* This turns the browser autocomplete function off */ >
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handelInputChange} /> {/* React will break if when value & name is added, hence will need to add handle input change function above. */}
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handelInputChange} /> {/* This is text need to update HTMLTextAreaElement in handleIputChange */}
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handelInputChange} />
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handelInputChange}  />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handelInputChange}  />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handelInputChange}  />
                <Button loading={loading} floated='right' positive type ='submit' content='Submit' />
                <Button as={Link} to='/activities'  floated='right' type ='button' content='Cancel' />
            </Form>
        </Segment>
    )
})