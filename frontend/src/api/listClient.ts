import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../contants";
import { ContatoSchema } from "../types/typeContact";

const listClients = () : Promise<ContatoSchema[]> => {
     return fetch(`${API_URL}/clientes`)
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json(); 
    });
} 

export const useClients = () => {
    return useQuery({queryKey:["clients"], queryFn: () => listClients().then(response => response.map(c => ({
        id: c.id,
        name: c.nome,
        adress: c.endereco,
        email: c.email

    })))})
} 