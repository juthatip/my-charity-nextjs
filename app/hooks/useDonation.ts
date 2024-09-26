import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import axios from "axios";

interface UseDonationParams {
  charityId: number;
  amount: number;
}

const useDonation = (
  onSuccess?: (data: unknown) => void,
  onError?: (error: unknown) => void
): UseMutationResult<unknown, unknown, UseDonationParams> => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ charityId, amount }: { charityId: number; amount: number }) => {
      await axios.post("http://localhost:3001/payments", {
        charitiesId: charityId,
        amount,
        currency: "THB",
      });
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("payments");
        if (onSuccess) {
          onSuccess(data);
        }
      },
      onError: (error) => {
        console.error("Error making donation:", error);
        if (onError) {
          onError(error);
        }
      },
    }
  );
};

export default useDonation;
