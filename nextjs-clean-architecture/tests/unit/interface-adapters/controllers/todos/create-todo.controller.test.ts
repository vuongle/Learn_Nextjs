import "reflect-metadata";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { destroyContainer, initializeContainer } from "@/di/container";
import { signInUseCase } from "@/src/application/use-cases/auth/sign-in.use-case";
import { InputParseError } from "@/src/entities/errors/common";
import { createTodoController } from "@/src/interface-adapters/controllers/todos/create-todo.controller";
import { UnauthenticatedError } from "@/src/entities/errors/auth";

beforeEach(() => {
  initializeContainer();
});

afterEach(() => {
  destroyContainer();
});

// A great guide on test names
// https://www.epicweb.dev/talks/how-to-write-better-test-names
it("creates todo", async () => {
  const { session } = await signInUseCase({
    username: "one",
    password: "password-one",
  });

  expect(
    createTodoController({ todo: "Test application" }, session.id),
  ).resolves.toMatchObject([
    {
      todo: "Test application",
      completed: false,
      userId: "1",
    },
  ]);
});

it("creates multiple comma-separated todos", async () => {
  const { session } = await signInUseCase({
    username: "one",
    password: "password-one",
  });

  expect(
    createTodoController(
      {
        todo: "Test application, Do something else, Take out trash, Achieve Atomic Repositories",
      },
      session.id,
    ),
  ).resolves.toMatchObject([
    {
      todo: "Test application",
      completed: false,
      userId: "1",
    },
    {
      todo: "Do something else",
      completed: false,
      userId: "1",
    },
    {
      todo: "Take out trash",
      completed: false,
      userId: "1",
    },
    {
      todo: "Achieve Atomic Repositories",
      completed: false,
      userId: "1",
    },
  ]);
});

it("rolls back when error happens", async () => {
  const { session } = await signInUseCase({
    username: "one",
    password: "password-one",
  });

  const consoleErrorSpy = vi
    .spyOn(console, "error")
    .mockImplementation(() => {});

  await createTodoController(
    { todo: "Testing rollbacks, One, Should rollback, Two" },
    session.id,
  );

  expect(consoleErrorSpy).toHaveBeenLastCalledWith("Rolling back!");

  consoleErrorSpy.mockRestore();
  vi.restoreAllMocks();
});

it("throws for invalid input", async () => {
  const { session } = await signInUseCase({
    username: "one",
    password: "password-one",
  });

  expect(createTodoController({}, session.id)).rejects.toBeInstanceOf(
    InputParseError,
  );

  expect(createTodoController({ todo: "" }, session.id)).rejects.toBeInstanceOf(
    InputParseError,
  );
});

it("throws for unauthenticated", () => {
  expect(
    createTodoController({ todo: "Doesn't matter" }, undefined),
  ).rejects.toBeInstanceOf(UnauthenticatedError);
});
