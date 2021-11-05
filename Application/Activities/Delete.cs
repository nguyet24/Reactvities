using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; } // QF on GUID -> using sysytem
        }
        public class Handler : IRequestHandler<Command> // QF on IRequest -> Implement Interface & Handler -> Generate Contructor Handler()
        {
        private readonly DataContext _context;
            public Handler(DataContext context)// QF on DataContext -> Unsing Persistence & context -> Initialise field for parameter
            {
                _context = context; //If initialise field for parameter doesnt show up on QF then add this line then go back to initialise context above
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);

                _context.Remove(activity);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}