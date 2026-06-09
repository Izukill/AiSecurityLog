package izuki.Ai.service;

import izuki.Ai.dto.LogRequestDTO;
import org.springframework.stereotype.Service;

@Service
public class HttpRequestService {

    public LogRequestDTO gerarTrafegoNormal() {
        LogRequestDTO log = new LogRequestDTO();
        log.setDestinationPort(443);
        log.setFlowDuration(115122);
        log.setTotalFwdPacketsLength(356.0);
        log.setTotalBwdPacketsLength(3124.0);
        log.setFlowBytesS(30228.8);
        log.setPacketLengthMean(155.5);
        return log;
    }

    public LogRequestDTO gerarAtaqueSqlInjection() {
        LogRequestDTO log = new LogRequestDTO();
        log.setDestinationPort(80);
        log.setFlowDuration(5006127);
        log.setTotalFwdPacketsLength(447.0);
        log.setTotalBwdPacketsLength(530.0);
        log.setFlowBytesS(195.1608499);
        log.setPacketLengthMean(108.5555556);
        return log;
    }

    public LogRequestDTO gerarAtaqueXss() {
        LogRequestDTO log = new LogRequestDTO();
        log.setDestinationPort(80);
        log.setFlowDuration(5638432);
        log.setTotalFwdPacketsLength(0.0);
        log.setTotalBwdPacketsLength(0.0);
        log.setFlowBytesS(0.0);
        log.setPacketLengthMean(0.0);
        return log;
    }

    public LogRequestDTO gerarForcaBrutaWeb() {
        LogRequestDTO log = new LogRequestDTO();
        log.setDestinationPort(80);
        log.setFlowDuration(5185118);
        log.setTotalFwdPacketsLength(1022.0);
        log.setTotalBwdPacketsLength(2321.0);
        log.setFlowBytesS(644.7297824);
        log.setPacketLengthMean(222.8666667);
        return log;
    }


    public LogRequestDTO gerarForcaBrutaFtp() {
        LogRequestDTO log = new LogRequestDTO();
        // Nota: O dataset registrou o ataque FTP na porta 80 nesta amostra.
        // Mantemos o valor real para garantir a classificação correta da IA.
        log.setDestinationPort(80);
        log.setFlowDuration(5216127);
        log.setTotalFwdPacketsLength(0.0);
        log.setTotalBwdPacketsLength(0.0);
        log.setFlowBytesS(0.0);
        log.setPacketLengthMean(0.0);
        return log;
    }

    public LogRequestDTO gerarForcaBrutaSsh() {
        LogRequestDTO log = new LogRequestDTO();
        log.setDestinationPort(22);
        log.setFlowDuration(404);
        log.setTotalFwdPacketsLength(0.0);
        log.setTotalBwdPacketsLength(0.0);
        log.setFlowBytesS(0.0);
        log.setPacketLengthMean(0.0);
        return log;
    }

    public LogRequestDTO gerarAtaqueDosHulk() {
        LogRequestDTO log = new LogRequestDTO();
        log.setDestinationPort(80);
        log.setFlowDuration(1878);
        log.setTotalFwdPacketsLength(382.0);
        log.setTotalBwdPacketsLength(11595.0);
        log.setFlowBytesS(6377529.286);
        log.setPacketLengthMean(1197.7);
        return log;
    }

    public LogRequestDTO gerarAtaqueDosGoldenEye() {
        LogRequestDTO log = new LogRequestDTO();
        log.setDestinationPort(80);
        log.setFlowDuration(5008837);
        log.setTotalFwdPacketsLength(341.0);
        log.setTotalBwdPacketsLength(3525.0);
        log.setFlowBytesS(771.8358573);
        log.setPacketLengthMean(386.6);
        return log;
    }

    public LogRequestDTO gerarAtaqueDosSlowloris() {
        LogRequestDTO log = new LogRequestDTO();
        log.setDestinationPort(80);
        log.setFlowDuration(5169956);
        log.setTotalFwdPacketsLength(1101.0);
        log.setTotalBwdPacketsLength(4222.0);
        log.setFlowBytesS(1029.602573);
        log.setPacketLengthMean(354.8666667);
        return log;
    }

    public LogRequestDTO gerarVarreduraPortas() {
        LogRequestDTO log = new LogRequestDTO();
        log.setDestinationPort(80);
        log.setFlowDuration(5021059);
        log.setTotalFwdPacketsLength(703.0);
        log.setTotalBwdPacketsLength(1414.0);
        log.setFlowBytesS(421.6242032);
        log.setPacketLengthMean(176.4166667);
        return log;
    }
}