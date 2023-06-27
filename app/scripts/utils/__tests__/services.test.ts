import {
  ROOT_URL,
  PRODUCTS_URL,
  POST,
  fetchProductsByName,
  fetchConfig,
} from "../services";

const baseUrl = ROOT_URL + PRODUCTS_URL;

describe("services", () => {
  let fetchSpy;
  beforeAll(() => {
    fetchSpy = jest.spyOn(global, "fetch");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  const body = { name: "test name" };
  describe("POST", () => {
    test("SUCCESS", () => {
      const responseValue = "clientAssets";
      const response = {
        json: jest.fn().mockResolvedValueOnce(responseValue),
      };
      fetchSpy.mockResolvedValueOnce(response);

      expect(POST(baseUrl, body)).resolves.toEqual(responseValue);
      expect(fetchMock).toHaveBeenCalledWith(baseUrl, {
        body: JSON.stringify(body),
        ...fetchConfig,
      });
    });

    test("FAILURE", () => {
      const response = new Error("test error");
      fetchSpy.mockRejectedValueOnce(response);

      expect(POST(baseUrl, body)).rejects.toEqual(response);
      expect(fetchMock).toHaveBeenCalledWith(baseUrl, {
        body: JSON.stringify(body),
        ...fetchConfig,
      });
    });
  });

  describe("fetchProductsByName", () => {
    test("fetchProductsByName returns products", () => {
      const responseValue = "clientAssets";
      const response = {
        json: jest.fn().mockResolvedValueOnce(responseValue),
      };
      fetchSpy.mockResolvedValueOnce(response);

      expect(fetchProductsByName(body.name)).resolves.toEqual(responseValue);
      expect(fetchSpy).toHaveBeenCalledWith(baseUrl, {
        body: JSON.stringify(body),
        ...fetchConfig,
      });
    });
  });
});
