using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    //this is a user defined class
    //to list activities
    //nothing to do with List class in C#
    public class List
    {
        //this is a nested class
        //this is the way we use mediator pattern
        public class Query : IRequest<List<Activity>> 
        {
            
        }



        //another nested class
        //this class will handle the request
        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Activities.ToListAsync();
            }
        }
    }
}