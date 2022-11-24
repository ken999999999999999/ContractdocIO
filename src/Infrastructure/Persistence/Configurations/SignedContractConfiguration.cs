﻿namespace ContractdocIO.Infrastructure.Persistence.Configurations;public class SignedContractConfiguration : IEntityTypeConfiguration<SignedContract>{    public void Configure(EntityTypeBuilder<SignedContract> builder)    {        builder.HasOne(t => t.Contract).WithMany().HasForeignKey(a => a.ContractId).OnDelete(DeleteBehavior.Restrict);        builder.HasIndex(p => p.ReferenceCode).IsUnique();

        builder.HasOne(t => t.ReceivedByUser).WithMany(a => a.SignedContracts).HasForeignKey(a => a.ReceivedByUserId).IsRequired(false);    }}