package izuki.Ai.service;

import izuki.Ai.dto.LogRequestDTO;
import org.springframework.stereotype.Service;

@Service
public class HttpRequestService {

    public LogRequestDTO gerarTrafegoNormal() {
        LogRequestDTO log = new LogRequestDTO();
        log.setDestinationPort(80);
        log.setFlowDuration(45000);
        log.setTotalFwdPacketsLength(350.0);
        log.setTotalBwdPacketsLength(1200.0);
        log.setFlowBytesS(3444.0);
        log.setPacketLengthMean(250.0);
        return log;
    }

    public LogRequestDTO gerarAtaqueWeb() {
        LogRequestDTO log = new LogRequestDTO();
        log.setDestinationPort(443);
        log.setFlowDuration(50000);
        log.setTotalFwdPacketsLength(85000.0);
        log.setTotalBwdPacketsLength(1200.0);
        log.setFlowBytesS(1700000.0);
        log.setPacketLengthMean(8500.0);
        return log;
    }

    public LogRequestDTO gerarVarreduraPortas() {
        LogRequestDTO log = new LogRequestDTO();
        log.setDestinationPort(8443);
        log.setFlowDuration(15);
        log.setTotalFwdPacketsLength(0.0);
        log.setTotalBwdPacketsLength(0.0);
        log.setFlowBytesS(0.0);
        log.setPacketLengthMean(0.0);
        return log;
    }
}