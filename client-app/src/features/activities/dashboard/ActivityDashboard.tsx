//This ActivitiesDashboard.tsx component is a child component of the App.tsx. 
//Parent can pass down the property down to the child.
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activities';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivitiesList';

interface Props {
    activities: Activity[]; //This gets Activity[] prop from App.tsx (return sections) -> assigns to  activities -> Pass down to return section
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void; //Because this is a function we must us ==> void.
    cancelSelectActivity: () => void;
    editMode: boolean;
    openForm: (id: string) =>void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;

}

export default function ActivityDashboard({activities, selectedActivity, 
        selectActivity, cancelSelectActivity, editMode, openForm, closeForm, createOrEdit, deleteActivity}: Props) { //The({}) destructures the activities property from the props object (whichh are the property passed down in App.tsx).
    return (
        <Grid>
            <Grid.Column width='10'>
                {/* Passing the activities, selectedActivity ect. properties in interface to child component ActivitiesList */}
                <ActivityList activities={activities} 
                selectActivity={selectActivity}  
                deleteActivity={deleteActivity}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode && //Only do the below activities if this selectedActivity criteria is met and not in edit mode
                <ActivityDetails 
                    activity={selectedActivity} 
                    cancelSelectActivity={cancelSelectActivity} 
                    openForm={openForm}
                />}
                {editMode && // Only do this when we are in edit mode
                <ActivityForm 
                    closeForm={closeForm} 
                    activity={selectedActivity}
                    createOrEdit={createOrEdit}
                />}
            </Grid.Column>
        </Grid>
    )
}