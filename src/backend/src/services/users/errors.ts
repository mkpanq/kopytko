export class UserAlreadyExistsError extends Error {
  constructor(message = "User with this email already exists") {
    super(message);
    this.name = "UserAlreadyExistsError";
  }
}

export class BadCredentials extends Error {
  constructor(message = "Wrong credentials") {
    super(message);
    this.name = "BadCredentials";
  }
}
