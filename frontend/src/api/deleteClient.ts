import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../contants";



const deleteClient = (id: string) : Promise<void>=> {
    return fetch(`${API_URL}/clientes/${id}`, {
    method: "DELETE",
   
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      
    });


}

 export const useDeleteClient = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => deleteClient(id), 
        onSuccess: () => queryClient.invalidateQueries({
            queryKey: ["clients"],
            
        })
    })
}