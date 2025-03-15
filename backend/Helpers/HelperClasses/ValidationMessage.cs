namespace Helpers.HelperClasses
{
    public static class ValidationMessage
    {
        public const string RequiredField = "{0} field is required";
        public const string MaxLength = "{0} must be less than {1} characters";
        public const string BudgetRange = "{0} must be between ${1} and ${2}";
    }
}