import stylesH from "./Historico.module.css";
import { useState, useEffect } from 'react';
import logoCarro from "../assets/logoCarro.png";

const Historico = () => {
  const [veiculos, setVeiculos] = useState([]);

  useEffect(() => {
    const veiculosMock = [
      { id: 1, placa: 'UTS-1234', data: '20/11/2024', valor: 'R$343,50' },
      { id: 2, placa: 'UTS-1234', data: '20/11/2024', valor: 'R$343,50' },
      { id: 3, placa: 'UTS-1234', data: '20/11/2024', valor: 'R$343,50' },
    ];
    setVeiculos(veiculosMock);
  }, []);

  return (
    
    <div className={stylesH.container}>
      <div className={stylesH['history-wrapper']}>
        <div className={stylesH.historico}>
          <h2>Consulte seus orçamentos</h2>
          <div className={stylesH.logo}>
            <img src={logoCarro} alt="Logo do Carro" />
          </div>
          <table>
            <thead>
              <tr>
                <th>Veículo</th>
                <th>Data</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {veiculos.map((veiculo) => (
                <tr key={veiculo.id}>
                  <td>{veiculo.placa}</td>
                  <td>{veiculo.data}</td>
                  <td>{veiculo.valor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Historico;