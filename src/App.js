import React, { useState } from "react";
import Grafico from "./Grafico"; // aqui a gente puxa o gráfico que tu criou
import "./App.css";

function App() {
  // Estados (o que muda dentro do site conforme o usuário interage)
  const [entradas, setEntradas] = useState(4200);
  const [saidas, setSaidas] = useState(2800);
  const [historico, setHistorico] = useState([
    { tipo: "positivo", texto: "+ Salário — R$ 3.500,00" },
    { tipo: "negativo", texto: "- Mercado — R$ 250,00" },
    { tipo: "negativo", texto: "- Luz — R$ 130,00" },
    { tipo: "positivo", texto: "+ Freelance — R$ 700,00" },
  ]);

  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("positivo");
  const [descricao, setDescricao] = useState("");

  const saldo = entradas - saidas;

  function adicionarTransacao() {
    if (!valor || !descricao) return;

    const valorNumerico = parseFloat(valor);
    const novaTransacao = {
      tipo,
      texto: `${tipo === "positivo" ? "+" : "-"} ${descricao} — R$ ${valorNumerico.toFixed(2)}`,
    };

    setHistorico([novaTransacao, ...historico]);

    if (tipo === "positivo") {
      setEntradas(entradas + valorNumerico);
    } else {
      setSaidas(saidas + valorNumerico);
    }

    setValor("");
    setDescricao("");
  }

  return (
    <div className="dashboard">
      {/* Cabeçalho */}
      <header className="header">
        <h1> Dashboard Financeiro 💰</h1>
        <p>Visualize e gerencie suas movimentações.</p>
      </header>

      {/* Cards com resumo financeiro */}
      <section className="cards">
        <div className="card entrada">
          <h3>Entradas</h3>
          <p className="valor">R$ {entradas.toLocaleString("pt-BR")}</p>
        </div>

        <div className="card saida">
          <h3>Saídas</h3>
          <p className="valor">R$ {saidas.toLocaleString("pt-BR")}</p>
        </div>

        <div className="card saldo">
          <h3>Saldo</h3>
          <p className="valor destaque">R$ {saldo.toLocaleString("pt-BR")}</p>
        </div>
      </section>

      {/* Aqui entra o gráfico Chart.js */}
      <section className="grafico">
        <h2>Gráfico de movimentações</h2>
        <Grafico entradas={entradas} saidas={saidas} />
      </section>

      {/* Nova transação */}
      <section className="nova-transacao">
        <h2>Adicionar nova transação</h2>
        <input
          type="text"
          placeholder="Descrição (ex: Mercado, Salário...)"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <input
          type="number"
          placeholder="Valor (ex: 500)"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="positivo">Entrada</option>
          <option value="negativo">Saída</option>
        </select>
        <button onClick={adicionarTransacao}>Adicionar</button>
      </section>

      {/* Histórico */}
      <section className="historico">
        <h2>Histórico de Transações</h2>
        <ul>
          {historico.map((item, index) => (
            <li key={index} className={item.tipo}>
              {item.texto}
            </li>
          ))}
        </ul>
      </section>

      <footer className="footer">
        <p>Desenvolvido por Raissa Neri • Projeto pessoal de Front-End</p>
      </footer>
    </div>
  );
}

export default App;
