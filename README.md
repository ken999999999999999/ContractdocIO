# Contract.IO
> A Single Page App(SPA) with ReactJS and ASP.NET Core following the principles of Clean Architecture.

> Implement Azure CI/CD with Github action

Contract.IO provides a platform to help people create, customize and manage their contracts. 

## Learn about Clean Architecture

[![Clean Architecture with ASP.NET Core 3.0 • Jason Taylor • GOTO 2019](https://img.youtube.com/vi/dK4Yb6-LxAk/0.jpg)](https://www.youtube.com/watch?v=dK4Yb6-LxAk)


## Technologies

### Backend

* [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/introduction-to-aspnet-core)
* [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)
* [MediatR](https://github.com/jbogard/MediatR)
* [AutoMapper](https://automapper.org/)
* [FluentValidation](https://fluentvalidation.net/)
* [NUnit](https://nunit.org/), [FluentAssertions](https://fluentassertions.com/), [Moq](https://github.com/moq) & [Respawn](https://github.com/jbogard/Respawn)

### Frontend
* [ReactJS](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [React Router](https://reactrouter.com/en/main)
* [react-oidc-context](https://github.com/authts/react-oidc-context)
* [MUI](https://mui.com/)
* [TanStack Query](https://tanstack.com/query/v4)

## Getting Started

### Set Up Environment & Lanuch the Project
1. Install the latest .NET SDK
2. Install the latest Node.js LTS
3. Navigate to `src/WebUI` and launch the API service using `dotnet run`
4. Navigate to 'contractdocio-web'
5. Run `npm install` to install packeage
6. Run `npm start` to launch the frontend service

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

This layer is a single page application based on ReactJS and ASP.NET Core. This layer depends on both the Application and Infrastructure layers, however, the dependency on Infrastructure is only to support dependency injection. Therefore only *Startup.cs* should reference Infrastructure.

## Reference

* [Clean Architecture Solution Template with ASP.NET Core 7](https://github.com/jasontaylordev/CleanArchitecture)
* [Create-React-App](https://github.com/facebook/create-react-app)
