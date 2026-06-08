package izuki.Ai.service;

import izuki.Ai.dto.LogRequestDTO;
import org.springframework.stereotype.Service;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class HttpRequestService {

    public LogRequestDTO gerarTrafegoNormal() {
        LogRequestDTO log = new LogRequestDTO();
        log.setDestinationPort(gerarInt(80, 443) > 200 ? 443 : 80);
        log.setFlowDuration(gerarInt(10000, 60000));
        log.setTotalFwdPacketsLength(gerarDouble(100.0, 800.0));
        log.setTotalBwdPacketsLength(gerarDouble(1000.0, 5000.0));
        log.setFlowBytesS(gerarDouble(1000.0, 8000.0));
        log.setPacketLengthMean(gerarDouble(100.0, 300.0));
        return log;
    }

    public LogRequestDTO gerarAtaqueWeb() {
        LogRequestDTO log = new LogRequestDTO();
        log.setDestinationPort(80); // Ataques web quase sempre miram a porta 80 no dataset
        log.setFlowDuration(gerarInt(5000000, 5500000)); // Duração um pouco mais longa (O invasor está testando inputs)

        // Valores reais do CICIDS2017 para Web Attacks: pacotes levemente anômalos, mas não gigantescos
        log.setTotalFwdPacketsLength(gerarDouble(200.0, 450.0));
        log.setTotalBwdPacketsLength(gerarDouble(1500.0, 3000.0));
        log.setFlowBytesS(gerarDouble(100.0, 500.0)); // Taxa de transferência cai porque é um ataque manual
        log.setPacketLengthMean(gerarDouble(60.0, 150.0));
        return log;
    }

    public LogRequestDTO gerarVarreduraPortas() {
        LogRequestDTO log = new LogRequestDTO();
        log.setDestinationPort(gerarInt(1024, 65535)); // Nmap batendo em portas altas
        log.setFlowDuration(gerarInt(1, 150)); // Duração microscópica

        // No CICIDS2017, pacotes de Scan têm um tamanho residual (ex: 6 bytes), não zero absoluto
        log.setTotalFwdPacketsLength(gerarDouble(0.0, 12.0));
        log.setTotalBwdPacketsLength(gerarDouble(0.0, 6.0));
        log.setFlowBytesS(gerarDouble(0.0, 50.0));
        log.setPacketLengthMean(gerarDouble(0.0, 6.0));
        return log;
    }

    public LogRequestDTO gerarForcaBruta() {
        LogRequestDTO log = new LogRequestDTO();
        // Força bruta geralmente mira em portas de infraestrutura como SSH (22) ou FTP (21)
        log.setDestinationPort(gerarInt(21, 22));
        // Duração longa (várias tentativas de login na mesma sessão)
        log.setFlowDuration(gerarInt(100000, 500000));
        // Pacotes de tamanho médio e constante (enviando usuário e senha repetidamente)
        log.setTotalFwdPacketsLength(gerarDouble(2000.0, 4000.0));
        log.setTotalBwdPacketsLength(gerarDouble(2000.0, 4000.0));
        log.setFlowBytesS(gerarDouble(50.0, 200.0)); // Taxa de bytes baixa, mas contínua
        log.setPacketLengthMean(gerarDouble(50.0, 100.0));
        return log;
    }


    //auxiliares

    private int gerarInt(int min, int max) {
        return ThreadLocalRandom.current().nextInt(min, max + 1);
    }

    private double gerarDouble(double min, double max) {
        return ThreadLocalRandom.current().nextDouble(min, max);
    }
}