using System;

namespace any_chart_timeline_mvc.Models
{
    public class DataRaw
    {
        public DataRaw(DateTime date, string title, string color)
        {
            this.Date = date;
            Title = title;
            Color = color;
        }
        public DateTime Date { get; set; }
        public string Title { get; set; }
        public string Color { get; set; }
        public int Year => Date.Year;
        public int Month => Date.Month;
        public int Day => Date.Day;
    }
}