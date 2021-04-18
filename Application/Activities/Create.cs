using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        /*
            Commands does not return a value
            So, There is no return type for IRequest in here

            This should get a Activity from API end
            It will capture by Activity property
        */
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            //Injecting DataContext class
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                /*
                    No need to use Async version of Add method
                    In below line it just add new activity to the memory 
                    We are not accessing the DB at this point
                */
                _context.Activities.Add(request.Activity);
                await _context.SaveChangesAsync(); //Real DB access will occur in here

                /*
                    Commands are not returning a value (TECHNICALLY)
                    But when we implement the IRequestHandler<Command> interface it will give return type as Task<Unit>
                    Unit is nothing but, a "way" use by Mediator to inform the API that it has done it's task
                    Unit gives NOTHING at all
                */
                return Unit.Value;
            }
        }
    }
}