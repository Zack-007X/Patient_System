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
    public class PaymentViewController : Controller
    {       
        private ILogger<PaymentViewController> _logger;
		private IConfiguration _configuration { get; set; }
		
        /// <summary>
        /// Default constructure for dependency injection
        /// </summary>
		/// <param name="configuration"></param>
        /// <param name="logger"></param>
        public PaymentViewController(ILogger<PaymentViewController> logger, IConfiguration configuration)
        {
            _logger = logger;
			_configuration = configuration;
        }

        public IActionResult Payment()
        {
            return View();
        }

        public IActionResult Payment_d()
        {
            return View();
        }

        public IActionResult Payment_report()
        {
            return View();
        }

        //public IActionResult Payment_pivot()
        //{    
        //    return View();
        //}

        //public IActionResult Payment_inline()
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


