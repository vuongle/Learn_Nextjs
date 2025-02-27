# Clean Architecture in Next.js

This repo is an example of how to achieve Clean Architecture in Next.js. There's a video tutorial that goes through this project. Click on the image to check it out on YouTube:

[![Clean Architecture in Next.js](https://img.youtube.com/vi/jJVAla0dWJo/0.jpg)](https://www.youtube.com/watch?v=jJVAla0dWJo)

You can run the project just by running `npm install` and `npm run dev`.

## Clean Architecture

![Clean Architecture Diagram](./assets/clean-architecture-diagram.jpg)

> [!Note]
> 👆 I drew this simplified version of the [original Clean Architecture diagram](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html). I simplified it in a way that makes more sense to me, and it's easier to comprehend. I hope it helps you too.

I strongly recommend you to read [the original article by Uncle Bob](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) if this is your first time hearing about Clean Architecture, but I'll try to summarize it for you below.

Clean Architecture is a _set of rules_ that help us structure our applications in such way that they're easier to maintain and test, and their codebases are predictable. It's like a common language that developers understand, regardless of their technical backgrounds and programming language preferences.

Clean Architecture, and similar/derived architectures, all have the same goal - _separation of concerns_. They introduce **layers** that bundle similar code together. The "layering" helps us achieve important aspects in our codebase:

- **Independent of UI** - the business logic is not coupled with the UI framework that's being used (in this case Next.js). The same system can be used in a CLI application, without having to change the business logic or rules.
- **Independent of Database** - the database implementation/operations are isolated in their own layer, so the rest of the app does not care about which database is being used, but communicates using _Models_.
- **Independent of Frameworks** - the business rules and logic simply don't know anything about the outside world. They receive data defined with plain JavaScript, use plain JavaScript, _Services_ and _Repositories_ to define their own logic and functionality. This allows us to use frameworks as tools, instead of having to "mold" our system into their implementations and limitations. If we use Route Handlers in our app, and want to refactor some of them to Server Actions, all we need to do is just invoke the specific _controllers_ in a server action instead of a route handler, but the _core_ business logic remains unchanged.
- **Testable** - the business logic and rules can easily be tested because it does not depend on the UI framework, or the database, or the web server, or any other external element that builds up our system.

Clean Architecture achieves this through defining a _dependency hierarchy_ - layers depend only on layers **below them**, but not above.

## Project structure (only the important bits)

- `app` - **Frameworks & Drivers Layer** - basically everything Next.js (pages, server actions, components, styles etc...) or whatever "consumes" the app's logic
- `di` - Dependency Injection - a folder where we setup the DI container and the modules
- `drizzle` - Everything DB - initializing the DB client, defining schema, migrations
- `src` - The "root" of the system
  - `application` - **Application Layer** - holds use cases and interfaces for repositories and services
  - `entities` - **Entities Layer** - holds models and custom errors
  - `infrastructure` - **Infrastructure Layer** - holds implementations of repositories and services, and pulls in the interfaces from `application`
  - `interface-adapters` - **Interface Adapters Layer** - holds controllers that serve as an entry point to the system (used in Frameworks & Drivers layer to interact with the system)
- `tests` - Unit tests live here - the `unit` subfolder's structure matches `src`
- `next.config.mjs` - Next.js configuration - take note of the `webpack.BannerPlugin` line! That's how you setup [inversify](https://inversify.io) in Next.js, the _Inversion of Control_ library. ([I made a video about this](https://youtu.be/2NVYG5VDmwQ))
- `tsconfig.json` - Take note of lines: 13, 14, and 15!
- `vitest.config.ts` - Take note of how the `@` alias is defined!

## Layers explanation

- **Frameworks & Drivers**: keeps all the UI framework functionality, and everything else that interacts with the system (ex. AWS Lambdas, Stripe webhooks etc...). In this scenario, that's Next.js Route Handlers, Server Actions, Components (Server and Client), Pages, Design System, etc...
  - This layer should only use _Controllers_, _Models_, and _Errors_, and **must not** use _Use Cases_, _Repositories_, and _Services_.
- **Interface Adapters**: defines _Controllers_:
  - Controllers perform **authentication checks** and **input validation** before passing the input to the specific use cases.
  - Controllers _orchestrate_ Use Cases. They don't implement any logic, but define the whole operations using use cases.
  - Errors from deeper layers are bubbled up and being handled where controllers are being used.
  - Controllers use _Presenters_ to convert the data to a UI-friendly format just before returning it to the "consumer". This helps us ship less JavaScript to the client (logic and libraries to convert the data), helps prevent leaking any sensitive properties, like emails or hashed passwords, and also helps us slim down the amount of data we're sending back to the client.
- **Application**: where the business logic lives. Sometimes called _core_. This layer defines the Use Cases and interfaces for the services and repositories.
  - **Use Cases**:
    - Represent individual operations, like "Create Todo" or "Sign In" or "Toggle Todo".
    - Accept pre-validated input (from controllers) and _handle authorization checks_.
    - Use _Repositories_ and _Services_ to access data sources and communicate with external systems.
    - **Use cases should not use other use cases**. That's a code smell. It means the use case does multiple things and should be broken down into multiple use cases.
  - Interfaces for Repositories and Services:
    - These are defined in this layer because we want to break out the dependency of their tools and frameworks (database drivers, email services etc...), so we'll implement them in the _Infrastructure_ layer.
    - Since the interfaces live in this layer, use cases (and transitively the upper layers) can access them through _Dependency Injection_.
    - _Dependency Injection_ allows us to split up the **definitions** (interfaces) from the **implementations** (classes) and keep them in a separate layer (infrastructure), but still allow their usage.
- **Entities**: where the _Models_ and _Errors_ are defined.
  - **Models**:
    - Define "domain" data shapes with plain JavaScript, without using "database" technologies.
    - Models are not always tied to the database - sending emails require an external email service, not a database, but we still need to have a data shape that will help other layers communicate "sending an email".
    - Models also define their own validation rules, which are called "Enterprise Business Rules". Rules that don't usually change, or are least likely to change when something _external_ changes (page navigation, security, etc...). An example is a `User` model that defines a username field that must be _at least 6 characters long and not include special characters_.
  - **Errors**:
    - We want our own errors because we don't want to be bubbling up database-specific errors, or any type of errors that are specific to a library or framework.
    - We `catch` errors that are coming from other libraries (for example Drizzle), and convert those errors to our own errors.
    - That's how we can keep our _core_ independent of any frameworks, libraries, and technologies - one of the most important aspects of Clean Architecture.
- **Infrastructure**: where _Repositories_ and _Services_ are being defined.
  - This layer pulls in the interfaces of repositories and services from the _Application Layer_ and implements them in their own classes.
  - _Repositories_ are how we implement the database operations. They are classes that expose methods that perform a single database operation - like `getTodo`, or `createTodo`, or `updateTodo`. This means that we use the database library / driver in these classes only. They don't perform any data validation, just execute queries and mutations against the database and either throw our custom defined _Errors_ or return results.
  - _Services_ are shared services that are being used across the application - like an authentication service, or email service, or implement external systems like Stripe (create payments, validate receipts etc...). These services also use and depend on other frameworks and libraries. That's why their implementation is kept here alongside the repositories.
  - Since we don't want any layer to depend on this one (and transitively depend on the database and all the services), we use the [_Dependency Inversion principle_](https://en.wikipedia.org/wiki/Dependency_inversion_principle). This allows us to depend only on the interfaces defined in the _Application Layer_, instead of the implementations in the _Infrastructure Layer_. We use an [_Inversion of Control_](https://en.wikipedia.org/wiki/Inversion_of_control) library like [inversify](https://inversify.io) to abstract the implementation behind the interfaces and "inject" it whenever we need it. We create the abstraction in the `di` directory. We "register" the repositories and services using Symbols as identifiers, and we "request" the services and repositories using those symbols when we need the actual implementation. That's how we can use the implementation, without needing to explicitly depend on it (import it).
