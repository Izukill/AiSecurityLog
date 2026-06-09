import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib
import numpy as np

print("Carregando o dataset de logs")

#caso queria treinar com outros datasets, basta colocar o caminho do csv aqui, lembrando que os arquivos devem ter as mesmas colunas para o modelo analisar
df_web = pd.read_csv('../../dataset/Thursday-WorkingHours-Morning-WebAttacks.pcap_ISCX.csv')
df_ddos = pd.read_csv('../../dataset/Wednesday-workingHours.pcap_ISCX.csv')
df_scan = pd.read_csv('../../dataset/Friday-WorkingHours-Afternoon-PortScan.pcap_ISCX.csv')
df_brute  = pd.read_csv('../../dataset/Tuesday-WorkingHours.pcap_ISCX.csv')

#juntando os datasets em um único dataframe para o treinamento do modelo
df_completo = pd.concat([df_web, df_ddos, df_scan, df_brute], ignore_index=True)

#características escolihas para o modelo analisar
features = [
    ' Destination Port', 
    ' Flow Duration', 
    'Total Length of Fwd Packets', 
    ' Total Length of Bwd Packets', 
    'Flow Bytes/s', 
    ' Packet Length Mean',
    ' Label']


df_completo = df_completo[features]
df_completo = df_completo.replace([np.inf, -np.inf], np.nan).dropna() #limpeza dos dados, removendo valores infinitos e nulos

#limpeza dos dados, agrupando os tipos de ataques em categorias mais amplas para facilitar a detecção
def agrupar_ataques(label):
    if label == 'BENIGN':
        return 'BENIGN'

    #ataques web
    elif 'Sql Injection' in label:
        return 'SQL_INJECTION'
    elif 'XSS' in label:
        return 'XSS_ATTACK'
    elif 'Web Attack' in label and 'Brute Force' in label:
        return 'WEB_BRUTE_FORCE'

    #força Bruta(Patator)
    elif 'FTP-Patator' in label:
        return 'BRUTE_FORCE_FTP'
    elif 'SSH-Patator' in label:
        return 'BRUTE_FORCE_SSH'

    #DoS
    elif 'Hulk' in label:
        return 'DOS_HULK'
    elif 'GoldenEye' in label:
        return 'DOS_GOLDENEYE'
    elif 'slowloris' in label:
        return 'DOS_SLOWLORIS'

    # Varredura de Portas
    elif 'PortScan' in label:
        return 'PORT_SCAN'

    else:
        return 'OUTRA_AMEACA'

df_completo[' Label'] = df_completo[' Label'].apply(agrupar_ataques)

X = df_completo.drop(' Label', axis=1)
Y = df_completo[' Label']


print("Treinando o modelo Random Forest para detecção de anomalias nos logs")

#carregando o modelo de detecção de anomalias Random Forest
modelo = RandomForestClassifier(n_estimators=100, random_state=42, class_weight='balanced')
modelo.fit(X, Y)

#salvando o pickle
joblib.dump(modelo, 'detector_logs.pkl')
print("Inteligência Artificial treinada e salva como 'detector_logs.pkl'")

#teste para ver quantas anomalias ele achou
df_completo['predicao'] = modelo.predict(X)

#random forest classifica como BENIGN caso sejam tráfegos normais (assim como está no dataset)
anomalias_detectadas = df_completo[df_completo['predicao'] != 'BENIGN']

print(f"\nResumo do Treinamento:")
print(f"Total de logs analisados: {len(df_completo)}")
print(f"Possíveis ataques detectados pela IA: {len(anomalias_detectadas)}")

print("Classes identificadas pelo modelo:")
for classe in np.unique(Y):
    total = np.sum(Y == classe)
    print(f" - {classe}: {total} amostras")
