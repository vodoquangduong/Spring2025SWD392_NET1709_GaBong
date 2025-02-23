using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessObjects.Models;
using Helpers.DTOs;

namespace Helpers.Mappers
{
    public static class ContractMapper
    {
        public static ContractDTO ToContractDTO( this Contract contract)
        {
            return new ContractDTO
            {
                ContractId = contract.ContractId,
                ProjectId = contract.ProjectId,
                StartDate = contract.StartDate.ToString("dd-MM-yyyy"),
                ContractPolicy = contract.ContractPolicy,
            };
        }

        public static Contract ToContract(ContractDTO contractDTO)
        {
            return new Contract
            {
                ContractId = contractDTO.ContractId,
                ProjectId = contractDTO.ProjectId,
                StartDate = DateTime.Parse(contractDTO.StartDate),
                ContractPolicy = contractDTO.ContractPolicy,
            };
        }
    }
}