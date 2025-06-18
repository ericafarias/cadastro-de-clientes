package br.com.ericafarias.cadastro.clientes;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClienteService {
    @Autowired
    private ClienteRepository repository;

    public Cliente salvar(String nome, String endereco, String email) {
        var cliente = new Cliente(UUID.randomUUID(), nome, endereco, email);
        repository.save(cliente);
        return cliente;
    }

    public List<Cliente> buscarTodos() {
        return repository.findAll();
    }

    public Cliente editar(UUID id, String nome, String endereco, String email) {
        var response = repository.findById(id);
        var cliente = response.orElseThrow();
        cliente.setNome(nome);
        cliente.setEmail(email);
        cliente.setEndereco(endereco);
        repository.save(cliente);
        return cliente;
    }

    public void deletar(UUID id) {
        repository.deleteById(id);
    }

}
