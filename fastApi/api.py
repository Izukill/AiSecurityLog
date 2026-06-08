from fastapi import FastAPI
from pydantic import BaseModel, Field
import joblib
import pandas as pd

#FastAPI para carregar o modelo de IA e criar a API para receber os dados dos logs e retornar a análise de segurança


app = FastAPI(
    title="Analisador de Logs com IA",
    description="API para detecção de requisições maliciosas usando Isolation Forest",
    version="1.0"
)

print("Carregando o modelo de IA na memória")
modelo = joblib.load('detector_logs.pkl') #carregando o modelo com o pkl


class LogRequest(BaseModel):
    destination_port: int = Field(alias=" Destination Port")
    flow_duration: int = Field(alias=" Flow Duration")
    total_fwd_packets_length: float = Field(alias="Total Length of Fwd Packets")
    total_bwd_packets_length: float = Field(alias=" Total Length of Bwd Packets")
    flow_bytes_s: float = Field(alias="Flow Bytes/s")
    packet_length_mean: float = Field(alias=" Packet Length Mean")

#criação da rota de post para receber os dados dos logs e retornar a análise de segurança
@app.post("/analisar")
def analisar_log(log: LogRequest):

    df_novo_log = pd.DataFrame([log.dict(by_alias=True)])
    predicao_texto = modelo.predict(df_novo_log)[0]
    
    if predicao_texto == 'BENIGN':
         return {
             "status": "Tráfego Seguro", 
             "codigo_ia": 200, 
             "alerta_seguranca": False
         }
    else:
         return {
             "status": f"Ataque Detectado: {predicao_texto}", 
             "codigo_ia": 403, 
             "alerta_seguranca": True
         }
    
