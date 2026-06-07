package izuki.Ai.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class AiResponseDTO {

    private String status;

    @JsonProperty("codigo_ia")
    private Integer codigoIa;

    @JsonProperty("alerta_seguranca")
    private Boolean alertaSeguranca;
}