// Importei o React e o tipo de gráfico que quero usar (no caso, gráfico de barras)
import React from "react";
import { Bar } from "react-chartjs-2"; // esse é o gráfico de barra que vai aparecer na tela

// Aqui são as “peças” que o Chart.js precisa pra funcionar certinho
import {
  Chart as ChartJS,
  CategoryScale, // serve pro eixo X (onde vai o nome das coisas, tipo “Entradas” e “Saídas”)
  LinearScale,  // serve pro eixo Y (os números, tipo o valor em R$)
  BarElement,   // é o tipo do gráfico (barras)
  Title,        // o título que fica lá em cima
  Tooltip,      // o balãozinho que aparece quando passo o mouse
  Legend,       // a legenda que mostra o que é cada cor
} from "chart.js";

// Aqui é tipo o “registrar presença” dessas funções pra o Chart.js saber que elas existem
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Esse ele recebe dois dados: entradas e saídas
function Grafico({ entradas, saidas }) {
  // Aqui ficam os dados que vão ser mostrados no gráfico
  const data = {
    labels: ["Entradas", "Saídas"], // o que vai aparecer embaixo de cada barra
    datasets: [
      {
        label: "Movimentações (R$)", // o nome da legenda
        data: [entradas, saidas], // os valores que vieram do App.js
        backgroundColor: ["#00ff88", "#ff4d4d"], // cores: verde pra entrada, vermelho pra saída
        borderRadius: 6, // só pra deixar as barras mais bonitinhas
      },
    ],
  };

  // Essas são as configurações de como o gráfico vai aparecer
  const options = {
    responsive: true, // faz o gráfico se ajustar pra caber em qualquer tela
    plugins: {
      legend: {
        labels: {
          color: "#f5f5f5", // cor do texto da legenda
        },
      },
      title: {
        display: true, // mostra o título
        text: "Entradas x Saídas", // o texto do título
        color: "#00c9a7", // cor verdinha do título
        font: { size: 18 }, // tamanho da fonte
      },
    },
    scales: {
      // aqui é a parte que cuida dos eixos (X e Y)
      x: {
        ticks: { color: "#aaa" }, // cor do texto embaixo
        grid: { color: "#222" },  // cor das linhas de fundo
      },
      y: {
        ticks: { color: "#aaa" },
        grid: { color: "#222" },
      },
    },
  };

  // Aqui é o que aparece de fato na tela
  return (
    <div className="grafico-container">
      {/* Esse <Bar /> é o que mostra o gráfico de verdade. 
          Ele usa os dados (data) e o estilo (options) que a gente configurou lá em cima */}
      <Bar data={data} options={options} />
    </div>
  );
}

// Exporta o gráfico pra poder usar lá no App.js
export default Grafico;
