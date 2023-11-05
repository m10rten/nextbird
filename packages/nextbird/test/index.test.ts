import nextbird from "../src/next";

describe("nextbird", () => {
  it("should be a test", () => {
    expect(true).toBe(true);
  });
  it("should be defined", () => {
    expect(nextbird).toBeDefined();
  });
  it("should be a function", () => {
    expect(typeof nextbird).toBe("function");
  });
  // it should return an object with GET method that then handles the GET request.
  // it("should return an object with GET method that then handles the GET request", () => {
  //   expect(typeof nextbird().GET).toBe("object");
  // });
});
