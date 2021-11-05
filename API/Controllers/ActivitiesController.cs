using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
       
        [HttpGet] //End point for Activities.
        public async Task<ActionResult<List<Activity>>> GetActivities(/* CancellationToken ct */)  // QF on CancellationToken -> using System.Threading. Method: Task,  will return action result and action result takes a type parameter, which will pass the activity. method is called get atvities
        {
            //Get response back from our mediator handler.
            return await Mediator.Send(new List.Query()/* , ct */); //QF on List -> Using ApplicationzActiities
        }

        [HttpGet("{id}")] //End point Activity. Activity -> pass in the ID 
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id}); // To test this on postman: Module4 -> Get Actiity -> Copy an activities in Get Activities -> paste id at the end of get and send
        }

        [HttpPost]//Create and end point for Create Activities.
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return Ok(await Mediator.Send(new Create.Command {Activity = activity}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Activity = activity}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }

    } 
}