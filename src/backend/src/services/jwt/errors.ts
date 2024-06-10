export class CookieNotFound extends Error {
  constructor(message = "Auth cookie not found") {
    super(message);
    this.name = "CookieNotFound";
  }
}
