# ContractdocIO
> A Single Page App(SPA) with ReactJS and ASP.NET Core following the principles of Clean Architecture.

## Learn about Clean Architecture

[![Clean Architecture with ASP.NET Core 3.0 • Jason Taylor • GOTO 2019](https://img.youtube.com/vi/dK4Yb6-LxAk/0.jpg)](https://www.youtube.com/watch?v=dK4Yb6-LxAk)

## Technologies

* [ASP.NET Core 6](https://docs.microsoft.com/en-us/aspnet/core/introduction-to-aspnet-core)
* [Entity Framework Core 6](https://docs.microsoft.com/en-us/ef/core/)
* [ReactJS](https://reactjs.org/)
* [MediatR](https://github.com/jbogard/MediatR)
* [AutoMapper](https://automapper.org/)
* [FluentValidation](https://fluentvalidation.net/)
* [NUnit](https://nunit.org/), [FluentAssertions](https://fluentassertions.com/), [Moq](https://github.com/moq) & [Respawn](https://github.com/jbogard/Respawn)


## Getting Started

Install the latest .NET 6 SDK
Install the latest Node.js LTS

### Database Migrations

To use `dotnet-ef` for your migrations first ensure that "UseInMemoryDatabase" is disabled, as described within previous section.
Then, add the following flags to your command (values assume you are executing from repository root)

* `--project src/Infrastructure` (optional if in this folder)
* `--startup-project src/WebUI`
* `--output-dir Persistence/Migrations`

For example, to add a new migration from the root folder:

 `dotnet ef migrations add "SampleMigration" --project src\Infrastructure --startup-project src\WebUI --output-dir Persistence\Migrations`

## Overview

### Domain

This will contain all entities, enums, exceptions, interfaces, types and logic specific to the domain layer.

### Application

This layer contains all application logic. It is dependent on the domain layer, but has no dependencies on any other layer or project. This layer defines interfaces that are implemented by outside layers. For example, if the application need to access a notification service, a new interface would be added to application and an implementation would be created within infrastructure.

### Infrastructure

This layer contains classes for accessing external resources such as file systems, web services, smtp, and so on. These classes should be based on interfaces defined within the application layer.

### WebUI

This layer is a single page application based on ReactJS and ASP.NET Core 6. This layer depends on both the Application and Infrastructure layers, however, the dependency on Infrastructure is only to support dependency injection. Therefore only *Startup.cs* should reference Infrastructure.
