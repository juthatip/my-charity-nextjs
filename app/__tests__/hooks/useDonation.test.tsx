import { renderHook, waitFor, act } from "@testing-library/react";
import {
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import axios from "axios";
import useDonation from "@/hooks/useDonation";

jest.mock("axios");
jest.mock("console");

const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("react-query", () => {
  const originalModule = jest.requireActual("react-query");
  return {
    ...originalModule,
    useMutation: jest.fn(),
    useQueryClient: jest.fn(),
  };
});

describe("useDonation Hook", () => {
  let queryClient: QueryClient;
  let consoleErrorMock: jest.SpyInstance;

  beforeEach(() => {
    queryClient = new QueryClient();
    (useQueryClient as jest.Mock).mockReturnValue(queryClient);
    (useMutation as jest.Mock).mockImplementation((mutationFn, options) => {
      return {
        mutate: async (variables: any) => {
          try {
            const result = await mutationFn(variables);
            if (options?.onSuccess) options.onSuccess(result);
            return result;
          } catch (error) {
            if (options?.onError) options.onError(error);
            // throw error;
          }
        },
      };
    });
    consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
    consoleErrorMock.mockRestore();
  });

  test("should call axios correctly on successful donation", async () => {
    const onSuccess = jest.fn();
    const onError = jest.fn();
    const variables = { charityId: 1, amount: 100 };

    mockedAxios.post.mockResolvedValueOnce({ data: "success" });

    const { result } = renderHook(() => useDonation(onSuccess, onError), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    result.current.mutate(variables);

    await waitFor(() =>
      expect(mockedAxios.post).toHaveBeenCalledWith(
        "http://localhost:3001/payments",
        {
          charitiesId: variables.charityId,
          amount: variables.amount,
          currency: "THB",
        }
      )
    );

    expect(onError).not.toHaveBeenCalled();
  });

  test("should handle errors", async () => {
    const onSuccess = jest.fn();
    const onError = jest.fn();
    const errorMessage = "Please try again";
    const variables = { charityId: 1, amount: 100 };

    mockedAxios.post.mockRejectedValueOnce(errorMessage);

    const { result } = renderHook(() => useDonation(onSuccess, onError), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    await act(async () => {
      try {
        await result.current.mutate(variables);
      } catch (error) {
        expect(error).toBe(errorMessage);
      }
    });

    expect(mockedAxios.post).toHaveBeenCalledWith(
      "http://localhost:3001/payments",
      {
        charitiesId: variables.charityId,
        amount: variables.amount,
        currency: "THB",
      }
    );

    expect(onSuccess).not.toHaveBeenCalled();
  });
});
