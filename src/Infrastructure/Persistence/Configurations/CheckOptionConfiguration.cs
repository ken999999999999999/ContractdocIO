﻿namespace ContractdocIO.Infrastructure.Persistence.Configurations;

        builder.HasOne(t => t.SignedContract).WithMany(a=>a.CheckOptions).HasForeignKey(a => a.SignedContractId);