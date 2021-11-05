using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<Activity>>{} //This is a Mediator interface. 

        public class Handler : IRequestHandler<Query, List<Activity>> //Interface. Prop passing in the query and returning the list of activities.
         //Contructor. QF on IRequestHandler class -> select generate constructor.
        {
            private readonly DataContext _context;
        //private readonly ILogger<List> _logger; //Not needed in this exercise by can use

            public Handler(DataContext context/*, ILogger<List> logger*/) //QF on ILogger -> usingMicrosoft.Extentions.Logging. QF on logger -> initialized from field from parameter
            {
            //_logger = logger; Not needed in this exercise by can use
                _context = context;
            }

            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken) //Must place the cancellation token in the HttpGet in ActivitiesController.
            {
        /*         //Throws an exception if freezes. Not needed in this exercise by can use
                try
                {
                    for (var i = 0; i < 10; i ++)
                    {
                        cancellationToken.ThrowIfCancellationRequested();
                        await Task.Delay(1000, cancellationToken);
                        _logger.LogInformation($"Task {i} has completed");
                    }
                }  catch(Exception ex) when (ex is TaskCanceledException)
                {
                    _logger.LogInformation("Task was cancalled");
                } */
                return await _context.Activities.ToListAsync(cancellationToken);
            }
        }
       


    }
}    