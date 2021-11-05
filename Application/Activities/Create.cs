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
    public class Create
    {
        public class Command : IRequest  //This is a command, it does not return anything like a query so no paramenters is needed.
        {
            public Activity Activity { get; set; } // The parameter of the Activity is passed instead of the above IReqest. QR on Activity -> Using Domain.
        }

        public class Handler : IRequestHandler<Command> // Only passing a command in parameters and not returing anything. QF on IRequest -> Impletement interface.
        {
        private readonly DataContext _context;
            public Handler(DataContext context) // Create a contructor. QF Handler above -> Create a constructor. Inject the DataContext, QF on DataContext -> Using Persistence & context -> initialise field
            {
            _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity); // Entity framework is tracting the add activitiy in memory.

                await _context.SaveChangesAsync();

                return Unit.Value;  // This returns nothing and just the API that the above action is now completed.
            }
        }
    }
}