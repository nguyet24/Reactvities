import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agents";
import { Activity } from "../models/activities";
//import { timeStamp } from "console";



export default class ActivityStore {
    //activities: Activity[] = []; //Do this if you want t use the array[] method
    activityRegistry = new Map<string, Activity>(); // New map object to store Maps
    selectedActivity: Activity | undefined = undefined;
    editMode = false; 
    loading = false;    
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    //Return the activities by date
    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) => 
            Date.parse(a.date) - Date.parse(b.date));
    }

    //This loads the page with all activities listed
    loadActivities = async () => {
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                this.setActivity(activity);
            })
                this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false); 
        }
    }

    //Loads the individual activity page
    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        } else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id); //get activity from API
                this.setActivity(activity);
                runInAction(() => {
                    this.selectedActivity = activity;
                })
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    //Below are re-usable functions to be passed on to the above.

    private setActivity = (activity: Activity) => {
        activity.date = activity.date.split('T')[0]; // spliting the date to only take first part of the datetime after the T
        //this.activities.push(activity); //This pushes the new formated date back to the array. Use this if you using an array [] method.
        this.activityRegistry.set(activity.id, activity)// This is using the JS map() method. activity.id = key, activity = value
    }

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

/* 
    //The below code has be commented out as it was used for Single App Page and has been replaced with routing to another page.
    selectActivity = (id: string) => {
        //this.selectedActivity = this.activities.find(a => a.id === id) //Use this if you using the array[]
        this.selectedActivity = this.activityRegistry.get(id); //map() method
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    //? means id is optional
    openForm = (id?:string) => {
        //If there is an id then we are in edit mode
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }
 */

    createActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                //this.activities.push(activity); //Push the newly created activity in our activities array. This uses the array [] method
                this.activityRegistry.set(activity.id, activity)
                this.selectedActivity = activity; //this displays the newly created activities to the right hand side
                this.editMode = false; //edit mode is off
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                //this.activities = [...this.activities.filter(a => a.id !==activity.id), activity]; //filter for no match. If no match then create a new array.
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false; //edit mode is off
                this.loading = true;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                //this.activities = [...this.activities.filter(a => a.id !== id)]; //This uses the array[] method.
                this.activityRegistry.delete(id);
                //if (this.selectedActivity?.id === id) this.cancelSelectedActivity(); //This is for SPA and as been replaced with routing.
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}


