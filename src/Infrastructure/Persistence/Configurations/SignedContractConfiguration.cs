﻿namespace ContractdocIO.Infrastructure.Persistence.Configurations;

        builder.HasOne(t => t.ReceivedByUser).WithMany(a => a.SignedContracts).HasForeignKey(a => a.ReceivedByUserId);