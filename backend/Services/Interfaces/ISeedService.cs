namespace Services.Interfaces
{
    public interface ISeedService
    {
        Task ResetDatabaseAsync();
        Task CreateSeedAsync();
    }
}
