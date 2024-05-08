namespace FineMaster.Server.ViewModels
{
    public class FilterViewModel
    {
        public class FilterModel
        {
            public int[]? LessonList { get; set; }
            public int? SelectedStyles { get; set; }
            public int? MinPrice { get; set; }
            public int? MaxPrice { get; set; }
            public int? SelectedCity { get; set; }
            public int? SelectedDistrict { get; set; }
        }
    }
}
