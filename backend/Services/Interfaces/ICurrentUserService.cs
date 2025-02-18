public interface ICurrentUserService
{
    long UserId { get; }
    string UserName { get; }
    string Role { get; }
} 