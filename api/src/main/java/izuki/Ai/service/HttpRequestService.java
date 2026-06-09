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

    public LogRequestDTO gerarAtaqueDoS() {
        LogRequestDTO log = new LogRequestDTO();
        log.setDestinationPort(80);
        log.setFlowDuration(5169956);
        log.setTotalFwdPacketsLength(1101.0);
        log.setTotalBwdPacketsLength(4222.0);
        log.setFlowBytesS(1029.602573);
        log.setPacketLengthMean(354.8666667);
        return log;
    }

    public LogRequestDTO gerarAtaqueWeb() {
        LogRequestDTO log = new LogRequestDTO();
        log.setDestinationPort(80);
        log.setFlowDuration(5638432);
        log.setTotalFwdPacketsLength(0.0);
        log.setTotalBwdPacketsLength(0.0);
        log.setFlowBytesS(0.0);
        log.setPacketLengthMean(0.0);
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

    public LogRequestDTO gerarForcaBruta() {
        LogRequestDTO log = new LogRequestDTO();
        log.setDestinationPort(80);
        log.setFlowDuration(5185118);
        log.setTotalFwdPacketsLength(1022.0);
        log.setTotalBwdPacketsLength(2321.0);
        log.setFlowBytesS(644.7297824);
        log.setPacketLengthMean(222.8666667);
        return log;
    }

    public LogRequestDTO gerarForcaBrutaSSH() {
        LogRequestDTO log = new LogRequestDTO();
        log.setDestinationPort(22);
        log.setFlowDuration(405102);
        log.setTotalFwdPacketsLength(1928.0);
        log.setTotalBwdPacketsLength(2592.0);
        log.setFlowBytesS(11157.0);
        log.setPacketLengthMean(85.5);
        return log;
    }
}