//This ActivitiesDashboard.tsx component is a child component of the App.tsx. 
//Parent can pass down the property down to the child.
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityList from './ActivitiesList';

//The observer takes the function as its parameters. Remember to import observer from mobx-react-lite
export default observer (function ActivityDashboard() { //The({}) destructures the activities property from the props object (whichh are the property passed down in App.tsx).
    const {activityStore} = useStore();
    const {loadActivities, activityRegistry} = activityStore;

    useEffect(() => {
        //activityStore.loadActivities();
        if (activityRegistry.size <= 1) loadActivities();
    }, [activityRegistry.size, loadActivities])
        
    //If it is loading then return what is in the Loading Component
    if (activityStore.loadingInitial) return <LoadingComponent content='Loading app' /> 
    
    return (
        <Grid>
            <Grid.Column width='10'>
                {/* Passing the activities, selectedActivity ect. properties in interface to child component ActivitiesList */}
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Activity filters</h2>
            </Grid.Column>
        </Grid>
    )
})