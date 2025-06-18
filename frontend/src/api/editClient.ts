import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../contants";

interface EditClient{
    id: string,
    nome: string,
    endereco: string,
    email:string
}

interface EditClientResponse{
  id: string,
    nome: string,
    endereco: string,
    email:string
}

const editClient = (data : EditClient) : Promise<EditClientResponse>=> {
    return fetch(`${API_URL}/clientes/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        nome: data.nome,
        endereco: data.endereco,
        email: data.email
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    });


}

 export const useEditClient = () => {
     const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data : EditClient) => editClient(data),
         onSuccess: () => queryClient.invalidateQueries({
            queryKey: ["clients"],
            
        })
    })
}