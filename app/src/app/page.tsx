'use client';

import { useState, FormEvent } from 'react';

interface IaResponse {
  status: string;
  codigo_ia: number;
  alerta_seguranca: boolean;
}

const templates = {
  NORMAL: { port: 443, duration: 115122, fwd: 356.0, bwd: 3124.0, bytes: 30228.8, mean: 155.5 },

  SQL_INJECTION: { port: 80, duration: 5006127, fwd: 447.0, bwd: 530.0, bytes: 195.1608499, mean: 108.5555556 },
  XSS_ATTACK: { port: 80, duration: 5638432, fwd: 0.0, bwd: 0.0, bytes: 0.0, mean: 0.0 },
  WEB_BRUTE_FORCE: { port: 80, duration: 5185118, fwd: 1022.0, bwd: 2321.0, bytes: 644.7297824, mean: 222.8666667 },

  BRUTE_FORCE_FTP: { port: 80, duration: 5216127, fwd: 0.0, bwd: 0.0, bytes: 0.0, mean: 0.0 },
  BRUTE_FORCE_SSH: { port: 22, duration: 404, fwd: 0.0, bwd: 0.0, bytes: 0.0, mean: 0.0 },

  DOS_HULK: { port: 80, duration: 1878, fwd: 382.0, bwd: 11595.0, bytes: 6377529.286, mean: 1197.7 },
  DOS_GOLDENEYE: { port: 80, duration: 5008837, fwd: 341.0, bwd: 3525.0, bytes: 771.8358573, mean: 386.6 },
  DOS_SLOWLORIS: { port: 80, duration: 5169956, fwd: 1101.0, bwd: 4222.0, bytes: 1029.602573, mean: 354.8666667 },

  PORT_SCAN: { port: 80, duration: 5021059, fwd: 703.0, bwd: 1414.0, bytes: 421.6242032, mean: 176.4166667 }
};

type TipoSimulacao = keyof typeof templates;

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<IaResponse | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const [formData, setFormData] = useState<Record<string, number | string>>(templates.NORMAL);

  //api com conexão para produção
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

  const simular = async (tipo: TipoSimulacao) => {
    setFormData(templates[tipo]);
    setLoading(true);
    setResultado(null);
    setErro(null);

    try {
      const res = await fetch(`${apiUrl}/api/seguranca/verificar?tipo=${tipo}`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error('Erro na comunicação com o backend');
      const data = await res.json();
      setResultado(data);
    } catch (err) {
      setErro('Falha de conexão ou formatação');
    } finally {
      setLoading(false);
    }
  };

  const enviarCustomizado = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResultado(null);
    setErro(null);

    const payload = {
      " Destination Port": formData.port,
      " Flow Duration": formData.duration,
      "Total Length of Fwd Packets": formData.fwd,
      " Total Length of Bwd Packets": formData.bwd,
      "Flow Bytes/s": formData.bytes,
      " Packet Length Mean": formData.mean,
    };

    try {
      const res = await fetch(`${apiUrl}/api/seguranca/verificar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Erro na comunicação com o backend');
      const data = await res.json();
      setResultado(data);
    } catch (err) {
      setErro('Falha de conexão ou formatação');
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tipoSelecionado = e.target.value as TipoSimulacao;
    setFormData(templates[tipoSelecionado]);
  };

  return (
      <main className="min-h-screen bg-neutral-950 text-neutral-300 p-8 font-mono">
        <div className="max-w-[1600px] mx-auto space-y-10">

          <header className="border-b border-neutral-800 pb-8">
            <h1 className="text-5xl font-bold text-emerald-400">AiSecurityLog</h1>
            <p className="text-neutral-500 mt-3 text-xl uppercase tracking-widest">
              Analisador de logs com IA para segurança web
            </p>
          </header>

          <div className="flex flex-col lg:flex-row gap-8">

            <div className="w-full lg:w-[280px] flex-shrink-0 space-y-3">
              <h2 className="text-2xl font-semibold text-white mb-6 border-b border-neutral-800 pb-2">
                Simulação de Rotas
              </h2>

              <button onClick={() => simular('NORMAL')} className="w-full text-left px-5 py-4 text-lg bg-emerald-900/30 text-emerald-400 border border-emerald-800 hover:bg-emerald-800/50 rounded transition font-bold">
                Tráfego Seguro
              </button>
              <button onClick={() => simular('PORT_SCAN')} className="w-full text-left px-5 py-4 text-lg bg-indigo-900/30 text-indigo-400 border border-indigo-800 hover:bg-indigo-800/50 rounded transition font-bold">
                Port Scan
              </button>
              <button onClick={() => simular('SQL_INJECTION')} className="w-full text-left px-5 py-4 text-lg bg-purple-900/30 text-purple-400 border border-purple-800 hover:bg-purple-800/50 rounded transition">
                SQL Injection
              </button>
              <button onClick={() => simular('XSS_ATTACK')} className="w-full text-left px-5 py-4 text-lg bg-purple-900/30 text-purple-400 border border-purple-800 hover:bg-purple-800/50 rounded transition">
                XSS Attack
              </button>
              <button onClick={() => simular('WEB_BRUTE_FORCE')} className="w-full text-left px-5 py-4 text-lg bg-purple-900/30 text-purple-400 border border-purple-800 hover:bg-purple-800/50 rounded transition">
                Web Brute Force
              </button>
              <button onClick={() => simular('BRUTE_FORCE_FTP')} className="w-full text-left px-5 py-4 text-lg bg-yellow-900/30 text-yellow-400 border border-yellow-800 hover:bg-yellow-800/50 rounded transition">
                Brute Force (FTP)
              </button>
              <button onClick={() => simular('BRUTE_FORCE_SSH')} className="w-full text-left px-5 py-4 text-lg bg-yellow-900/30 text-yellow-400 border border-yellow-800 hover:bg-yellow-800/50 rounded transition">
                Brute Force (SSH)
              </button>
              <button onClick={() => simular('DOS_HULK')} className="w-full text-left px-5 py-4 text-lg bg-red-900/30 text-red-400 border border-red-800 hover:bg-red-800/50 rounded transition">
                DoS Hulk
              </button>
              <button onClick={() => simular('DOS_GOLDENEYE')} className="w-full text-left px-5 py-4 text-lg bg-red-900/30 text-red-400 border border-red-800 hover:bg-red-800/50 rounded transition">
                DoS GoldenEye
              </button>
              <button onClick={() => simular('DOS_SLOWLORIS')} className="w-full text-left px-5 py-4 text-lg bg-red-900/30 text-red-400 border border-red-800 hover:bg-red-800/50 rounded transition">
                DoS Slowloris
              </button>
            </div>

            <div className="w-full lg:w-1/3 bg-neutral-900 p-8 rounded-xl border border-neutral-800">
              <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-8 gap-4">
                <h2 className="text-2xl font-semibold text-white">Injeção de Payload</h2>

                <select
                    onChange={handleTemplateChange}
                    className="w-full xl:w-auto bg-neutral-950 border border-neutral-700 text-neutral-400 rounded p-2 text-base focus:border-emerald-500 focus:outline-none"
                >
                  <option value="NORMAL">Normal</option>
                  <option value="SQL_INJECTION">SQL Injection</option>
                  <option value="XSS_ATTACK">XSS</option>
                  <option value="WEB_BRUTE_FORCE">Web Brute Force</option>
                  <option value="BRUTE_FORCE_FTP">FTP Brute Force</option>
                  <option value="BRUTE_FORCE_SSH">SSH Brute Force</option>
                  <option value="DOS_HULK">DoS Hulk</option>
                  <option value="DOS_GOLDENEYE">DoS GoldenEye</option>
                  <option value="DOS_SLOWLORIS">DoS Slowloris</option>
                  <option value="PORT_SCAN">Port Scan</option>
                </select>
              </div>

              <form onSubmit={enviarCustomizado} className="flex flex-col gap-5">
                {[
                  { label: 'Porta Destino', key: 'port' },
                  { label: 'Duração (ms)', key: 'duration' },
                  { label: 'Pacotes Fwd', key: 'fwd' },
                  { label: 'Pacotes Bwd', key: 'bwd' },
                  { label: 'Bytes/s', key: 'bytes' },
                  { label: 'Tamanho Médio', key: 'mean' },
                ].map(({ label, key }) => (
                    <div key={key} className="space-y-2">
                      <label className="text-neutral-400 block text-lg">{label}</label>
                      <input
                          type="number"
                          step="any"
                          //mudança pra permitir um valor nulo apenas para colocar melhor os valores
                          value={formData[key as keyof typeof formData] === '' ? '' : formData[key as keyof typeof formData]}
                          onChange={(e) => {
                            const valorDigitado = e.target.value;
                            setFormData({...formData, [key]: valorDigitado === '' ? '' : Number(valorDigitado)
                            });
                          }}
                          className="w-full bg-neutral-950 border border-neutral-700 rounded p-3 text-xl text-white focus:border-emerald-500 focus:outline-none transition"
                      />
                    </div>
                ))}
                <button type="submit" className="w-full mt-6 bg-neutral-800 hover:bg-neutral-700 text-white font-medium py-4 text-xl rounded border border-neutral-600 transition">
                  Processar Análise Customizada
                </button>
              </form>
            </div>

            <div className="w-full lg:flex-1 bg-black p-8 rounded-xl border border-neutral-800 flex flex-col relative overflow-hidden">
              <h2 className="text-2xl font-semibold text-neutral-400 mb-8 z-10">Monitor de Inferência</h2>

              <div className="flex-1 font-mono text-base space-y-6 z-10">
                {loading && <div className="text-yellow-500 animate-pulse text-lg">&gt; Processando inferência na Random Forest...</div>}

                {erro && <div className="text-red-500 text-lg">&gt; ERRO: {erro}</div>}

                {resultado && !loading && (
                    <div className={`p-8 border-2 rounded-lg ${resultado.alerta_seguranca ? 'border-red-500 bg-red-950/20' : 'border-emerald-500 bg-emerald-950/20'}`}>
                      <p className="mb-4">
                        <span className="text-neutral-500 text-lg">Inferência: </span>
                        <strong className={`text-2xl block mt-2 ${resultado.alerta_seguranca ? 'text-red-400' : 'text-emerald-400'}`}>
                          {resultado.alerta_seguranca ? 'Ataque Detectado >:(' : 'Tráfego Seguro :) '}
                        </strong>
                      </p>

                      <hr className="border-neutral-800 my-6" />

                      <p className="mb-2"><span className="text-neutral-500 text-lg">Classificação: </span><span className="text-white font-bold text-xl block mt-1">{resultado.status}</span></p>
                      <p className="mt-4"><span className="text-neutral-500 text-lg">Código interno: </span><span className="text-neutral-300 text-lg">{resultado.codigo_ia}</span></p>
                    </div>
                )}

                {!resultado && !loading && !erro && (
                    <div className="text-neutral-600 flex flex-col items-center justify-center h-full pt-32">
                      <span className="text-lg text-center">Aguardando interceptação de pacotes de rede...</span>
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
  );
}