package izuki.Ai.service;

import izuki.Ai.dto.AiResponseDTO;
import izuki.Ai.dto.LogRequestDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AiIntegracaoService {

    @Value("${ai.service.url}")
    private String fastApiUrl;

    private final RestTemplate restTemplate;

    public AiIntegracaoService() {
        this.restTemplate = new RestTemplate();
    }

    public AiResponseDTO analisarTrafego(LogRequestDTO logRequest) {
        System.out.println("Enviando log para análise da I.A. no endereço: " + fastApiUrl);

        // Faz um POST enviando o LogRequestDTO e esperando um IaResponseDTO de volta
        ResponseEntity<AiResponseDTO> response = restTemplate.postForEntity(
                fastApiUrl,
                logRequest,
                AiResponseDTO.class
        );

        return response.getBody();
    }
}