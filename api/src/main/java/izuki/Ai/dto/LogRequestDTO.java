package izuki.Ai.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class LogRequestDTO {

    @JsonProperty(" Destination Port")
    private Integer destinationPort;

    @JsonProperty(" Flow Duration")
    private Integer flowDuration;

    @JsonProperty("Total Length of Fwd Packets")
    private Double totalFwdPacketsLength;

    @JsonProperty(" Total Length of Bwd Packets")
    private Double totalBwdPacketsLength;

    @JsonProperty("Flow Bytes/s")
    private Double flowBytesS;

    @JsonProperty(" Packet Length Mean")
    private Double packetLengthMean;
}