import { useMutation } from "@tanstack/react-query";
import { API_URL } from "../contants";

interface NewClient{
    nome: string,
    endereco: string,
    email:string
}

interface NewClientResponse{
  id: string,
    nome: string,
    endereco: string,
    email:string
}

const saveClient = (data : NewClient) : Promise<NewClientResponse>=> {
    return fetch(`${API_URL}/clientes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    });


}

 export const useSaveClient = () => {
    return useMutation({
        mutationFn: (data : NewClient) => saveClient(data)
    })
}