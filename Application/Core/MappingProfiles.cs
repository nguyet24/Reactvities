using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile //QF on Profie -> Using Mapping
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>(); // Create a mapping between one activity to another activity. QF 1st Activity -> using Domain
        }
    }
}