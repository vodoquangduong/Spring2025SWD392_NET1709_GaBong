namespace BusinessObjects.Enums
{
    public enum TransactionType
    {
        Deposit,//Nap tien vao he thong
        Withdrawal, //rut tien ra khoi he thong
        Earnings,//nhan tien tu client (for freelancer)
        Payment,//chuyen tien cho freelancer (for client)
        Fee,// phi bid, phi tao contract, phi he thong, ... 
    }
}