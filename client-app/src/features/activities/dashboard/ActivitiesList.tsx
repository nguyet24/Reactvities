//This ActivitiesList.tsx is the child component of ActivitiesDashboard.tsx
import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityListItems from "./ActivityListItem";

export default observer(function ActivityList() { //For destructor notes refer to ActivitiesDashboard.tsx
    const {activityStore} = useStore(); //Opens the useStore
    const {groupedActivities} = activityStore; //In the useStore get groupedActivities

    return(
        <>
            {groupedActivities.map(([group, activities]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                       {group}
                    </Header>
                    {activities.map(activity =>(
                        <ActivityListItems key={activity.id} activity={activity} />
                    ))}
                </Fragment>
            ))}
        </>
        //For LH instead of semactic ui styling use Oceania Blue for ANZ

    )
})