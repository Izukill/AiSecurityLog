'use client';

import { useState, FormEvent } from 'react';


interface IaResponse {
  status: string;
  codigo_ia: number;
  alerta_seguranca: boolean;
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<IaResponse | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  //form customizado para mudar
  const [formData, setFormData] = useState({
    port: 80,
    duration: 150,
    fwd: 200,
    bwd: 500,
    bytes: 4000,
    mean: 150,
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

  // Função para chamar as simulações (Botões)
  const simular = async (tipo: string) => {
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
      setErro('Falha de conexão. O Spring Boot está rodando?');
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
      setErro('Falha de conexão. O Spring Boot está rodando?');
    } finally {
      setLoading(false);
    }
  };

  return (
      <main className="min-h-screen bg-neutral-950 text-neutral-300 p-8 font-mono">
        <div className="max-w-5xl mx-auto space-y-8">

          {/* header */}
          <header className="border-b border-neutral-800 pb-6">
            <h1 className="text-3xl font-bold text-emerald-400">SOC // Monitor de Ameaças</h1>
            <p className="text-neutral-500 mt-2">Detecção de Anomalias via Isolation Forest</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* painel principal */}
            <div className="space-y-6 bg-neutral-900 p-6 rounded-xl border border-neutral-800 shadow-xl">

              <section>
                <h2 className="text-lg font-semibold text-white mb-4">Disparar Simulações</h2>
                <div className="grid grid-cols-3 gap-3">
                  <button onClick={() => simular('NORMAL')} className="bg-emerald-900/30 text-emerald-400 border border-emerald-800 hover:bg-emerald-800/50 py-2 rounded transition text-sm">
                    Tráfego Normal
                  </button>
                  <button onClick={() => simular('ATAQUE_WEB')} className="bg-red-900/30 text-red-400 border border-red-800 hover:bg-red-800/50 py-2 rounded transition text-sm">
                    Ataque Web
                  </button>
                  <button onClick={() => simular('SCAN')} className="bg-indigo-900/30 text-indigo-400 border border-indigo-800 hover:bg-indigo-800/50 py-2 rounded transition text-sm">
                    Port Scan
                  </button>
                </div>
              </section>

              <hr className="border-neutral-800" />

              <section>
                <h2 className="text-lg font-semibold text-white mb-4">Injeção Manual de Payload</h2>
                <form onSubmit={enviarCustomizado} className="grid grid-cols-2 gap-4 text-sm">
                  {[
                    { label: 'Porta', key: 'port' },
                    { label: 'Duração (ms)', key: 'duration' },
                    { label: 'Pacotes Fwd', key: 'fwd' },
                    { label: 'Pacotes Bwd', key: 'bwd' },
                    { label: 'Bytes/s', key: 'bytes' },
                    { label: 'Média de Tamanho', key: 'mean' },
                  ].map(({ label, key }) => (
                      <div key={key} className="space-y-1">
                        <label className="text-neutral-400 block">{label}</label>
                        <input
                            type="number"
                            value={formData[key as keyof typeof formData]}
                            onChange={(e) => setFormData({ ...formData, [key]: Number(e.target.value) })}
                            className="w-full bg-neutral-950 border border-neutral-700 rounded p-2 focus:border-emerald-500 focus:outline-none transition"
                        />
                      </div>
                  ))}
                  <button type="submit" className="col-span-2 mt-2 bg-neutral-800 hover:bg-neutral-700 text-white font-medium py-3 rounded border border-neutral-600 transition">
                    Processar Análise Customizada
                  </button>
                </form>
              </section>
            </div>

            {/* output da i.a */}
            <div className="bg-black p-6 rounded-xl border border-neutral-800 flex flex-col relative overflow-hidden">
              <h2 className="text-lg font-semibold text-neutral-400 mb-4 z-10">Output do Modelo</h2>

              <div className="flex-1 font-mono text-sm space-y-4 z-10">
                {loading && <div className="text-yellow-500 animate-pulse">&gt; Processando inferência da rede neural...</div>}

                {erro && <div className="text-red-500">&gt; ERRO: {erro}</div>}

                {resultado && !loading && (
                    <div className={`p-4 border rounded ${resultado.alerta_seguranca ? 'border-red-500/50 bg-red-950/20' : 'border-emerald-500/50 bg-emerald-950/20'}`}>
                      <p className="mb-2">
                        <span className="text-neutral-500">Veredito: </span>
                        <strong className={`text-lg ${resultado.alerta_seguranca ? 'text-red-400' : 'text-emerald-400'}`}>
                          {resultado.alerta_seguranca ? '[ AMEAÇA DETECTADA ]' : '[ TRÁFEGO SEGURO ]'}
                        </strong>
                      </p>
                      <p><span className="text-neutral-500">Detalhe: </span><span className="text-neutral-300">{resultado.status}</span></p>
                      <p><span className="text-neutral-500">Código interno: </span><span className="text-neutral-300">{resultado.codigo_ia}</span></p>
                    </div>
                )}

                {!resultado && !loading && !erro && (
                    <div className="text-neutral-600">&gt; Aguardando interceptação de tráfego...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
  );
}