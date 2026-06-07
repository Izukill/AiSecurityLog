package izuki.Ai.controller;
import izuki.Ai.dto.AiResponseDTO;
import izuki.Ai.dto.LogRequestDTO;
import izuki.Ai.service.AiIntegracaoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/seguranca")
public class AiRestController {

    private final AiIntegracaoService aiService;

    public AiRestController(AiIntegracaoService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/verificar")
    public ResponseEntity<?> verificarLog(@RequestBody LogRequestDTO logRequest) {

        AiResponseDTO respostaIa = aiService.analisarTrafego(logRequest);

        if (respostaIa != null && respostaIa.getAlertaSeguranca()) {
            return ResponseEntity.status(403).body("ACESSO BLOQUEADO: Anomalia detectada pela I.A.");
        }

        return ResponseEntity.ok("Acesso Permitido. Tráfego normal.");
    }
}
