﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using App.Controllers;
using App.Web.Models;

namespace App.Controllers
{
    public class TreatmentScheduleViewController : Controller
    {       
        private ILogger<TreatmentScheduleViewController> _logger;
		private IConfiguration _configuration { get; set; }
		
        /// <summary>
        /// Default constructure for dependency injection
        /// </summary>
		/// <param name="configuration"></param>
        /// <param name="logger"></param>
        public TreatmentScheduleViewController(ILogger<TreatmentScheduleViewController> logger, IConfiguration configuration)
        {
            _logger = logger;
			_configuration = configuration;
        }

        public IActionResult TreatmentSchedule()
        {
            return View();
        }

        public IActionResult TreatmentSchedule_d()
        {
            return View();
        }

		//public IActionResult TreatmentSchedule_report()
        //{    
        //    return View();
        //}

        //public IActionResult TreatmentSchedule_pivot()
        //{    
        //    return View();
        //}

        //public IActionResult TreatmentSchedule_inline()
        //{
		//    if (!MyHelper.checkAuth(_configuration, HttpContext)) return Unauthorized(); // Or UnauthorizedView
        //    return View();
        //}

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}


