import React, { useState } from 'react';
import { Info, Calculator, Calendar } from 'lucide-react';

const CalculadoraAtur = () => {
  const [baseReguladora, setBaseReguladora] = useState('');
  const [fills, setFills] = useState('0');
  const [dies, setDies] = useState('');
  const [showInfo, setShowInfo] = useState(false);

  const calcularDurada = (diesCotitzats) => {
    const d = parseInt(diesCotitzats);
    if (isNaN(d) || d < 360) return 0;
    if (d >= 360 && d <= 539) return 4;
    if (d >= 540 && d <= 719) return 6;
    if (d >= 720 && d <= 899) return 8;
    if (d >= 900 && d <= 1079) return 10;
    if (d >= 1080 && d <= 1259) return 12;
    if (d >= 1260 && d <= 1439) return 14;
    if (d >= 1440 && d <= 1619) return 16;
    if (d >= 1620 && d <= 1799) return 18;
    if (d >= 1800 && d <= 1979) return 20;
    if (d >= 1980 && d <= 2159) return 22;
    return 24; // Més de 2160 dies
  };

  const calcularPrestacio = () => {
    const base = parseFloat(baseReguladora);
    if (!base) return null;

    const inicial = base * 0.7;
    const posterior = base * 0.6;
    const topalls = {
      '0': { min: 560, max: 1225 },
      '1': { min: 749, max: 1400 },
      '2': { min: 749, max: 1575 }
    };
    const t = topalls[fills] || topalls['0'];

    return {
      mesos1al6: Math.min(Math.max(inicial, t.min), t.max).toFixed(2),
      mesos7enEndavant: Math.min(Math.max(posterior, t.min), t.max).toFixed(2),
      durada: calcularDurada(dies)
    };
  };

  const res = calcularPrestacio();

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100 mt-10">
      <div className="flex items-center gap-3 mb-6 border-b pb-4">
        <Calculator className="text-blue-600" size={32} />
        <h1 className="text-2xl font-bold text-gray-800">Calculadora d'Atur Completa</h1>
      </div>

      <div className="space-y-5">
        {/* Base de Cotització */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            Base de cotització mensual mitjana (€)
            <button onMouseEnter={() => setShowInfo(true)} onMouseLeave={() => setShowInfo(false)} className="text-blue-500">
              <Info size={16} />
            </button>
          </label>
          {showInfo && (
            <div className="absolute z-10 p-3 bg-blue-50 border border-blue-200 rounded text-xs text-blue-800 shadow-lg">
              Busca a la nòmina <strong>"Base de Contingències Comunes"</strong> (part inferior).
            </div>
          )}
          <input type="number" value={baseReguladora} onChange={(e) => setBaseReguladora(e.target.value)} className="w-full p-2 border rounded-lg" placeholder="Ex: 1800" />
        </div>

        {/* Dies Cotitzats */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Dies treballats (últims 6 anys)</label>
          <input type="number" value={dies} onChange={(e) => setDies(e.target.value)} className="w-full p-2 border rounded-lg" placeholder="Ex: 360" />
          <p className="text-[10px] text-gray-400 mt-1">*Mínim 360 dies per tenir dret a prestació.</p>
        </div>

        {/* Fills */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Situació familiar</label>
          <select value={fills} onChange={(e) => setFills(e.target.value)} className="w-full p-2 border rounded-lg">
            <option value="0">Sense fills</option>
            <option value="1">1 fill a càrrec</option>
            <option value="2">2 o més fills</option>
          </select>
        </div>

        {res && (
          <div className="mt-6 space-y-4">
            {/* Nou quadre de Durada */}
            <div className="p-4 bg-blue-600 text-white rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar size={24} />
                <span className="font-medium">Durada de la prestació:</span>
              </div>
              <span className="text-2xl font-bold">{res.durada} mesos</span>
            </div>

            {/* Imports */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 border-t-4 border-blue-500 rounded shadow-sm">
                <p className="text-xs text-gray-500">Mesos 1-6</p>
                <p className="text-xl font-bold">{res.mesos1al6} €</p>
              </div>
              <div className="p-3 bg-gray-50 border-t-4 border-green-500 rounded shadow-sm">
                <p className="text-xs text-gray-500">Mesos 7+</p>
                <p className="text-xl font-bold">{res.mesos7enEndavant} €</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculadoraAtur;