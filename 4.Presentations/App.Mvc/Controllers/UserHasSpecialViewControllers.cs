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
    public class UserHasSpecialViewController : Controller
    {       
        private ILogger<UserHasSpecialViewController> _logger;
		private IConfiguration _configuration { get; set; }
		
        /// <summary>
        /// Default constructure for dependency injection
        /// </summary>
		/// <param name="configuration"></param>
        /// <param name="logger"></param>
        public UserHasSpecialViewController(ILogger<UserHasSpecialViewController> logger, IConfiguration configuration)
        {
            _logger = logger;
			_configuration = configuration;
        }

        public IActionResult UserHasSpecial()
        {
            return View();
        }

        public IActionResult UserHasSpecial_d()
        {
            return View();
        }

		//public IActionResult UserHasSpecial_report()
        //{    
        //    return View();
        //}

        //public IActionResult UserHasSpecial_pivot()
        //{    
        //    return View();
        //}

        //public IActionResult UserHasSpecial_inline()
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


