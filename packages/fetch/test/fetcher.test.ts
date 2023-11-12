import { createFetcher } from "@/fetcher";

describe("createFetcher", () => {
  it("should return a function", () => {
    const fetchWithZod = createFetcher();
    expect(typeof fetchWithZod).toBe("function");
  });

  it("should return the expected data", async () => {
    const mockData = { hello: "world" };
    const mockFetcher = jest.fn().mockResolvedValue(mockData);
    const fetchWithZod = createFetcher(mockFetcher);

    const schema = { parse: jest.fn().mockReturnValue(mockData) };
    const result = await fetchWithZod(schema, "https://example.com");

    expect(mockFetcher).toHaveBeenCalledWith("https://example.com");
    expect(schema.parse).toHaveBeenCalledWith(mockData);
    expect(result).toEqual(mockData);
  });

  it("should throw an error if the response is not equal to the expected type", async () => {
    const fetchWithZod = createFetcher();

    const schema = { parse: jest.fn().mockReturnValue({}) };
    await expect(fetchWithZod(schema, "https://example.com")).rejects.toThrow();
  });
});
