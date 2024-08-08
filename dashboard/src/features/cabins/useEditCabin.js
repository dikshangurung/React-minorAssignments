import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
export function useEditCabin() {
	const queryClient = useQueryClient();
	const { mutate: editCabin, isLoading: isEditing } = useMutation({
		//editing ko case ma yesto garnu parcha
		//Note: React Query can only pass one argument to a function
		mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
		onSuccess: () => {
			toast.success("Cabin successfully edited");
			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});
		},
		onError: (err) => toast.error(err.message),
	});
	return { editCabin, isEditing };
}
