public interface ICurrentUserService
{
    long AccountId { get; }
    string Email { get; }
    string Role { get; }
    string Status { get; }
}