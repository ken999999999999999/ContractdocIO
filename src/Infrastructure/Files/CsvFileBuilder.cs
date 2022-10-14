using System.Globalization;
using ContactdocIO.Application.Common.Interfaces;
using ContactdocIO.Application.TodoLists.Queries.ExportTodos;
using ContactdocIO.Infrastructure.Files.Maps;
using CsvHelper;

namespace ContactdocIO.Infrastructure.Files;

public class CsvFileBuilder : ICsvFileBuilder
{
    public byte[] BuildTodoItemsFile(IEnumerable<TodoItemRecord> records)
    {
        using var memoryStream = new MemoryStream();
        using (var streamWriter = new StreamWriter(memoryStream))
        {
            using var csvWriter = new CsvWriter(streamWriter, CultureInfo.InvariantCulture);

            csvWriter.Configuration.RegisterClassMap<TodoItemRecordMap>();
            csvWriter.WriteRecords(records);
        }

        return memoryStream.ToArray();
    }
}
