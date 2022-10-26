using Microsoft.EntityFrameworkCore.Metadata.Builders;namespace ContactdocIO.Infrastructure.Persistence.Configurations;public class ApplicationUserConfiguration : IEntityTypeConfiguration<IOUser>{    public void Configure(EntityTypeBuilder<IOUser> builder)    { 

    }
}