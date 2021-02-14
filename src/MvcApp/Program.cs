﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Oakton;

namespace MvcApp
{
#if NETCOREAPP2_2
/*
    // SAMPLE: using-run-oakton-commands
    public class Program
    {
        public static Task<int> Main(string[] args)
        {
            return CreateWebHostBuilder(args)
                
                // This extension method replaces the calls to
                // IWebHost.Build() and Start()
                .RunOaktonCommands(args);
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
        
    }
    // ENDSAMPLE 
    */
#else
    // SAMPLE: using-run-oakton-commands-3
    public class Program
    {
        public static Task<int> Main(string[] args)
        {
            return CreateHostBuilder(args)
                
                // This extension method replaces the calls to
                // IWebHost.Build() and Start()
                .RunOaktonCommands(args);
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(x => x.UseStartup<Startup>());
        
    }
    // ENDSAMPLE 
#endif
}
