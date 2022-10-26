namespace ContactdocIO.Application.Common.Dto;
public class BaseAuditableEntityDto : BaseEntityDto
{
    public DateTime Created { get; set; }

    public string? CreatedBy { get; set; }

    public DateTime? LastModified { get; set; }

    public string? LastModifiedBy { get; set; }
}
