package br.com.ericafarias.cadastro.clientes;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.ericafarias.cadastro.clientes.dto.NovoClienteRequestDto;
import jakarta.websocket.server.PathParam;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    private ClienteService service;

    public ClienteController(ClienteService service) {
        this.service = service;
    }

    @PostMapping
    public Cliente salvar(@RequestBody NovoClienteRequestDto body) {
        return service.salvar(body.nome(), body.endereco(), body.email());
    }

    @GetMapping
    public List<Cliente> buscarTodos() {
        return service.buscarTodos();
    }

    @PutMapping("/{id}")
    public Cliente editar(@PathVariable UUID id, @RequestBody NovoClienteRequestDto body) {
        return service.editar(id, body.nome(), body.endereco(), body.email());
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable UUID id) {
        service.deletar(id);
    }

}
