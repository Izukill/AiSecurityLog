import pandas as pd
from sklearn.ensemble import IsolationForest
import joblib

print("Carregando o dataset de logs")
df = pd.read_csv('Thursday-WorkingHours-Morning-WebAttacks.pcap_ISCX.csv')

#características numéricas para o modelo
features = [col for col in df.columns if df[col].dtype in ['int64', 'float64']]
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