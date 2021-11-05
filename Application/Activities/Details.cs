using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Activity> //Use Irequest interface to return a singlr activity. QF on IRequest -> using MediatR & on Activity -> using Domain
        {
           public Guid Id { get; set; } //This is to specify what the ID of the Activity we want to bring in
        }


        public class Handler : IRequestHandler<Query, Activity> //Class for our handler by using IRequesthandler. QF for IRequestHandler -> Implement the interface.
        {
        private readonly DataContext _context;
            public Handler(DataContext context) // Create a constructor. QF on Handler above -> Generate Constructor. 
            //Inject DataContext context in the Handler and initialise the field. QF DataContext -> Using Persistence & contrxt -> Initalizing field from parameter
            {
            _context = context;
            }

            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Activities.FindAsync(request.Id); //This returns the query request from above class
            }
        }
    }
}