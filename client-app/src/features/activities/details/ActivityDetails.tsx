//This is a child component of ActivityDashboard.tsx.
import { useEffect } from "react";
import { useParams } from "react-router";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivitySidebar from "./ActivityDetailedSidebar";

export default function ActivitiesDetails() {

    const {activityStore} = useStore(); //Get from activitystore
    const {selectedActivity: activity, loadActivity,  loadingInitial /* openForm, cancelSelectedActivity //Replaced with Routing */} = activityStore;//destructure the above
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadActivity(id);
    }, [id, loadActivity])

    if (loadingInitial || !activity) return <LoadingComponent /> //Checking to see if we have activity

    return (
      <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={activity} />
                <ActivityDetailedInfo activity={activity}  />
                <ActivityDetailedChat />
            </Grid.Column>  
            <Grid.Column width={6}>
                <ActivitySidebar />
            </Grid.Column>
      </Grid>
    )
}