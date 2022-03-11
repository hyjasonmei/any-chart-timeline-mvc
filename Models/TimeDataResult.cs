using System;
using System.Collections.Generic;
using System.Linq;

namespace any_chart_timeline_mvc.Models
{
    public class TimeDataResult
    {
        public TimeDataResult(List<DataRaw> data)
        {
            Data = data;
        }
        public List<DataRaw> Data { get; set; }
        public DateTime MaxDate => Data.Max(d => d.Date).AddMonths(1);
        public DateTime MinDate => Data.Min(d => d.Date).AddMonths(-1);
        public int MaxYear => MaxDate.Year;
        public int MaxMonth => MaxDate.Month;
        public int MaxDay => MaxDate.Day;
        public int MinYear => MinDate.Year;
        public int MinMonth => MinDate.Month;
        public int MinDay => MinDate.Day;
        public List<int> YearFlags
        {
            get
            {
                return Data.Where(d => d.Year != MinYear).Select(d => d.Year).Distinct().ToList();
            }
        }
    }
}