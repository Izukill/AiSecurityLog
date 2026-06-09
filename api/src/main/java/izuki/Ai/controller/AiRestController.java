package izuki.Ai.controller;

import izuki.Ai.dto.LogRequestDTO;
import izuki.Ai.service.AiIntegracaoService;
import izuki.Ai.service.HttpRequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*") //coloquei apenas para o cors não impedir os testes, mas para implementação em sistemas reais retire
@RequestMapping("/api/seguranca")
public class AiRestController {

    private final AiIntegracaoService aiService;

    private final HttpRequestService httpRequestService;

    public AiRestController(AiIntegracaoService aiService, HttpRequestService httpRequestService) {
        this.aiService = aiService;
        this.httpRequestService = httpRequestService;
    }

    @PostMapping("/verificar")
    public ResponseEntity<?> verificarLog(
            @RequestParam(required = false) String tipo,
            @RequestBody(required = false) LogRequestDTO customLog) {

        LogRequestDTO logParaAnalisar;

        //se vier tipo na url
        if (tipo != null) {
            switch (tipo.toUpperCase()) {
                case "NORMAL":
                    logParaAnalisar = httpRequestService.gerarTrafegoNormal();
                    break;
                case "SQL_INJECTION":
                    logParaAnalisar = httpRequestService.gerarAtaqueSqlInjection();
                    break;
                case "XSS_ATTACK":
                    logParaAnalisar = httpRequestService.gerarAtaqueXss();
                    break;
                case "WEB_BRUTE_FORCE":
                    logParaAnalisar = httpRequestService.gerarForcaBrutaWeb();
                    break;
                case "BRUTE_FORCE_FTP":
                    logParaAnalisar = httpRequestService.gerarForcaBrutaFtp();
                    break;
                case "BRUTE_FORCE_SSH":
                    logParaAnalisar = httpRequestService.gerarForcaBrutaSsh();
                    break;
                case "DOS_HULK":
                    logParaAnalisar = httpRequestService.gerarAtaqueDosHulk();
                    break;
                case "DOS_GOLDENEYE":
                    logParaAnalisar = httpRequestService.gerarAtaqueDosGoldenEye();
                    break;
                case "DOS_SLOWLORIS":
                    logParaAnalisar = httpRequestService.gerarAtaqueDosSlowloris();
                    break;
                case "PORT_SCAN":
                    logParaAnalisar = httpRequestService.gerarVarreduraPortas();
                    break;
                default:
                    return ResponseEntity.badRequest().build();
            }
        }
        //se não veio tipo, é o usuário digitando os valores na mão (Customizado)
        else {
            if (customLog == null) {
                return ResponseEntity.badRequest().build();
            }
            logParaAnalisar = customLog;
        }

        //manda o log final para a IA em python
        return ResponseEntity.ok(aiService.analisarTrafego(logParaAnalisar));
    }
}
