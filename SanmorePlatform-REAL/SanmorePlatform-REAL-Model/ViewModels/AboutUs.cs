namespace SanmorePlatform_REAL_Web.Models {

    public class AboutUsModel
    {
        public string CompanyName { get; set; }
        public string Description { get; set; }
        public string Mission { get; set; }
        public string Vision { get; set; }
        public List<TeamMember> TeamMembers { get; set; }
    }

    public class TeamMember
    {
        public string Name { get; set; }
        public string Role { get; set; }
        public string Bio { get; set; }
        public string PhotoUrl { get; set; }
    }
}
