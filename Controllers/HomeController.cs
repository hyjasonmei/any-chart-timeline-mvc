using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using any_chart_timeline_mvc.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace any_chart_timeline_mvc.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }


        public IActionResult Index([FromQuery] string data)
        {
            // Console.WriteLine(data);
            // var data = new List<DataRaw>() {
            //     new DataRaw(new DateTime(2021, 6, 1), "DV Start", "#16b7db"),
            //     new DataRaw(DateTime.Now.AddMonths(1), DateTime.Now.ToString(), "blue"),
            //     new DataRaw(DateTime.Now.AddMonths(2), "bbbb", "blue"),
            // };
            byte[] byteData = Convert.FromBase64String(data);
            string decodedJson = Encoding.UTF8.GetString(byteData);
            var serializerSettings = new JsonSerializerSettings();
            serializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            var decodeData = JsonConvert.DeserializeObject<List<DataRaw>>(decodedJson, serializerSettings);
            var result = new TimeDataResult(decodeData);
            ViewBag.Data = JsonConvert.SerializeObject(result, serializerSettings);

            return View();
        }

        [HttpPost]
        public IActionResult IndexPost(List<DataRaw> data)
        {
            var result = new TimeDataResult(data);

            var serializerSettings = new JsonSerializerSettings();
            serializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            ViewBag.Data = JsonConvert.SerializeObject(result, serializerSettings);

            return View();
        }
    }
}
