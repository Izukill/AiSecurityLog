<div align="center">

# AiSecurityLog // Monitor de Ameaças em Logs

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![scikit-learn](https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=for-the-badge&logo=scikit-learn&logoColor=white)

</div>


## 📑 Sumário

- [Sobre o Projeto](#-sobre-o-projeto)
- [Objetivos e Funcionalidades](#-objetivos-e-funcionalidades)
- [Stack Tecnológica](#-stack-tecnológica)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Quick Start](#-quick-start)
- [Padrão de Commits](#-padrão-de-commits)

## Sobre o Projeto

O **AiSecurityLog** é um painel de monitoramento de logs de requisições web, 
focado na detecção e classificação multiclasse de ameaças de rede.

Utilizando um algoritmo de Random Forest, foi treinada uma i.a com base no dataset público da **CIC-IDS2017**, 
o sistema foi feito para analisar assinaturas de pacotes TCP/IP e identificar em tempo real anomalias como Injeções SQL,
ataques DoS (Hulk, GoldenEye, Slowloris), Força Bruta (SSH/FTP) e PortScan. O projeto possui uma arquitetura que separa a interface do usuário, o core de regras de negócio em Java e a lógica de inferência em Python.

Link do dataset: https://www.unb.ca/cic/datasets/ids-2017.html?utm_source=chatgpt.com


## Objetivos e Funcionalidades

* **Machine Learning:** A I.A de Random Forest utilizada possui um algoritmo de aprendizagem supervisionada 
* **Classificação Multiclasse:** Capacidade de distinguir entre tráfego benigno e 9 subclasses específicas de ataques web.
* **Simulação de Tráfego:** Módulo gerador de anomalias (`HttpRequestService`) para testar a resiliência do modelo com assinaturas baseadas no dataset.
* **Injeção Manual de Payload:** Formulário manual para testar margens estatísticas e comportamentos de fronteira da IA.
* **Arquitetura Desacoplada:** Integração via REST entre Spring Boot e FastAPI (como "microserviço" da I.A).

---

## Stack Tecnológica

### Frontend
| Tecnologia | Descrição                      |
|------------|--------------------------------|
| Next.js 14 | Framework React                |
| TypeScript | Linguagem utilizada            |
| Tailwind CSS | Estilização e design da página |

### Backend Core 
| Tecnologia | Descrição                                    |
|------------|----------------------------------------------|
| Spring Boot | API REST central                             |
| Java | Linguagem utilizada                          |
| RestTemplate| Integração HTTP com microsserviço do fastApi |

### Backend da I.A 
| Tecnologia | Descrição                                    |
|------------|----------------------------------------------|
| Python | Processamento de dados e scripts ML          |
| FastAPI | Servidor para servir o modelo                |
| Scikit-Learn | Treinamento do algoritmo Random Forest       |
| Pandas | Manipulação e limpeza dos dados dos datasets |

---

## Estrutura do Projeto

```text
AiSecurityLog/
├── api [Ai]/                     # Backend Core — Spring Boot
│   ├── src/main/java/izuki.Ai/
│   │   ├── controller/
│   │   │   └── AiRestController.java
│   │   ├── dto/
│   │   │   ├── AiResponseDTO.java
│   │   │   └── LogRequestDTO.java
│   │   ├── service/
│   │   │   ├── AiIntegracaoService.java   #Service de integração com RestTemplate
│   │   │   └── HttpRequestService.java    #Service para gerar as requisições
│   │   └── AiApplication.java
│   └── resources/
│
├── app/                          # Frontend — Next.js
│   ├── src/app/
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx              # Pagina principal
│
└── fastApi/                      # Microsserviço I.A — Python
    ├── api.py                    # Endpoint do FastAPI
    ├── detector_logs.pkl         # Modelo treinado (Artefato via gitignore)
    └── treinar_modelo.py         # Script gerador do modelo pkl
```

## Quick Start

### Pré-requisitos

- Node.js 18+
- Java 21
- Python 3.10+
- Maven

### 1. Clonar o projeto

```bash
git clone https://github.com/Izukill/AiSecurityLog
cd AiSecurityLog
```

### 2. Configurar e iniciar a Inteligência Artificial (FastAPI)

```bash
cd fastApi

#criar o ambiente virtual
python -m venv venv 
#nota: No Linux/Mac, pode ser necessário usar python3 -m venv venv

#ativar o ambiente virtual
# -> No Windows:
venv\Scripts\activate
# -> No Linux/Mac:
source venv/bin/activate

#instalar dependências (pandas, scikit-learn, fastapi, uvicorn)
pip install -r requirements.txt
```
### 2.1 Para prossegir há 2 caminhos:
- 1- baixar o modelo da I.A já treinada anteriormente
- 2- Treinar a I.A localmente na sua máquina (Requer os datasets do CIC-IDS2017 que estão sendo usados no código)

___
Caso queria baixar: https://drive.google.com/file/d/1z1zVGRVPxUo4YsbGjCydM5OmpeTG_MZF/view?usp=sharing

basta baixar o arquivo `detector_logs.pkl`, colocá-lo dentro da pasta `/fastApi` e ir para o passo 2.2
___
Caso queria treinar a I.A localmente:
```bash
#gerar o modelo .pkl (Necessário apenas na 1ª vez)
python treinar_modelo.py
# Nota: No Linux/Mac, use python3 treinar_modelo.py
```

### 2.2 Iniciar o servidor da I.a
```bash
uvicorn api:app --reload
```

> O serviço rodará em http://127.0.0.1:8000

### 3. Subir o Backend (Spring Boot)
abra outro terminal em `/AiSecurityLog`

```bash
cd api
./mvnw spring-boot:run
#ou apenas vá na pasta /api no arquivo AiApplication e rode o spring manualmente
```

### 4. Subir o Frontend (Next.js)
abra mais um terminal em `/AiSecurityLog`

```bash
cd app
npm install
npm run dev
```
Agora basta acessar a página web para testar as requisições web na I.A
> O painel estará disponível em http://localhost:3000

---

## Padrão de Commits

Para manter o histórico do projeto limpo e rastreável, este repositório segue a convenção:

| Tipo       | Descrição                                     | Exemplo de Uso                                    |
|------------|-----------------------------------------------|---------------------------------------------------|
| `feat`     | Introdução de um recurso novo no sistema.     | `feat: inclusao de rota para brute force SSH`     |
| `refactor` | Refatoração de código, melhoria de lógica.    | `refactor: organizacao de cores no page.tsx`      |
| `fix`      | Resolução de um bug ou erro.                  | `fix: correcao do parse de float no form do Next` |
| `chore`    | Inclusão de documentação, imagens ou scripts. | `chore: adicionado readme do projeto`             |
| `remove`   | Remoção de arquivos ou código.                | `remove: arquivo pkl do treinamento da I.A`       |