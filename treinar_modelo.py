import pandas as pd
from sklearn.ensemble import IsolationForest
import joblib
import numpy as np

print("Carregando o dataset de logs")
df = pd.read_csv('Thursday-WorkingHours-Morning-WebAttacks.pcap_ISCX.csv')

#características escolihas para o modelo analisar
features = [
    ' Destination Port', 
    ' Flow Duration', 
    'Total Length of Fwd Packets', 
    ' Total Length of Bwd Packets', 
    'Flow Bytes/s', 
    ' Packet Length Mean']

df = df[features]
df = df.replace([np.inf, -np.inf], np.nan).dropna() #limpeza dos dados, removendo valores infinitos e nulos

X = df[features]


print("Treinando o modelo Isolation Forest para detecção de anomalias nos logs")

#carregando o modelo de detecção de anomalias Isolation Forest
modelo = IsolationForest(n_estimators=100, contamination=0.05, random_state=42)
modelo.fit(X)

#salvando o pickle 
joblib.dump(modelo, 'detector_logs.pkl')
print("\n[Sucesso] Inteligência Artificial treinada e salva como 'detector_logs.pkl'")

#teste para ver quantas anomalias ele achou
df['predicao'] = modelo.predict(X)

#isolation Forest retorna 1 para normal e -1 para anomalia
anomalias_detectadas = df[df['predicao'] == -1]

print(f"\nResumo do Treinamento:")
print(f"Total de logs analisados: {len(df)}")
print(f"Possíveis ataques detectados pela IA: {len(anomalias_detectadas)}")