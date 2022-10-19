using Microsoft.EntityFrameworkCore;using Microsoft.EntityFrameworkCore.Metadata.Builders;namespace ContactdocIO.Infrastructure.Persistence.Configurations;public class ApplicationUserConfiguration : IEntityTypeConfiguration<IOUser>{    public void Configure(EntityTypeBuilder<IOUser> builder)    {        builder.Property(t => t.Name).HasMaxLength(200).IsRequired();        builder.Property(t => t.UserName).HasMaxLength(200).IsRequired();        builder.Property(t => t.Email).IsRequired();        builder.HasIndex(t => t.Email).IsUnique();

        builder.HasIndex(t => t.UserName).IsUnique();

    }
}