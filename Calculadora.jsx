import React, { useState } from 'react';
import { Calculator, Users, Calendar, Euro } from 'lucide-react';

export default function CalculadoraAtur() {
  const [dades, setDades] = useState({
    baseCotitzacio: '',
    tempsCotitzat: '',
    situacioFamiliar: 'sense'
  });

  const [resultat, setResultat] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDades(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calcularPrestacio = (e) => {
    e.preventDefault();
    
    const base = parseFloat(dades.baseCotitzacio);
    const mesos = parseInt(dades.tempsCotitzat);
    
    if (!base || !mesos) {
      return;
    }

    const prestacioMensual = base * 0.70;
    
    let duradaMesos;
    if (mesos >= 360 && mesos < 539) duradaMesos = 4;
    else if (mesos >= 540 && mesos < 719) duradaMesos = 6;
    else if (mesos >= 720 && mesos < 899) duradaMesos = 8;
    else if (mesos >= 900 && mesos < 1079) duradaMesos = 10;
    else if (mesos >= 1080 && mesos < 1259) duradaMesos = 12;
    else if (mesos >= 1260 && mesos < 1439) duradaMesos = 14;
    else if (mesos >= 1440 && mesos < 1619) duradaMesos = 16;
    else if (mesos >= 1620 && mesos < 1799) duradaMesos = 18;
    else if (mesos >= 1800 && mesos < 2159) duradaMesos = 20;
    else if (mesos >= 2160) duradaMesos = 24;
    else duradaMesos = 4;

    setResultat({
      prestacioMensual: prestacioMensual.toFixed(2),
      duradaMesos,
      totalAproximat: (prestacioMensual * duradaMesos).toFixed(2),
      percentatge: 70
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Calculadora de Prestació d'Atur
          </h1>
          <p className="text-gray-600">
            Calcula la teva prestació contributiva de forma ràpida i senzilla
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Les teves dades</h2>
            <form onSubmit={calcularPrestacio} className="space-y-6">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Euro className="w-4 h-4 mr-2 text-indigo-600" />
                  Base de cotització mensual (€)
                </label>
                <input
                  type="number"
                  name="baseCotitzacio"
                  value={dades.baseCotitzacio}
                  onChange={handleChange}
                  placeholder="Ex: 1500"
                  step="0.01"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none"
                />
              </div>
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 mr-2 text-indigo-600" />
                  Temps cotitzat (dies)
                </label>
                <input
                  type="number"
                  name="tempsCotitzat"
                  value={dades.tempsCotitzat}
                  onChange={handleChange}
                  placeholder="Ex: 720"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none"
                />
              </div>
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Users className="w-4 h-4 mr-2 text-indigo-600" />
                  Situació familiar
                </label>
                <select
                  name="situacioFamiliar"
                  value={dades.situacioFamiliar}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none"
                >
                  <option value="sense">Sense fills</option>
                  <option value="amb1">Amb 1 fill</option>
                  <option value="amb2">Amb 2 o més fills</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold shadow-lg"
              >
                Calcular Prestació
              </button>
            </form>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">El teu resultat</h2>
            {resultat ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
                  <p className="text-sm font-medium opacity-90 mb-2">Prestació mensual</p>
                  <p className="text-5xl font-bold mb-2">{resultat.prestacioMensual}€</p>
                  <p className="text-sm opacity-75">{resultat.percentatge}% de la base</p>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 font-medium">Durada</span>
                    <span className="text-xl font-bold text-gray-900">{resultat.duradaMesos} mesos</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 font-medium">Total aproximat</span>
                    <span className="text-xl font-bold text-gray-900">{resultat.totalAproximat}€</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-12 text-gray-500">
                <Calculator className="w-10 h-10 mb-4 text-gray-400" />
                <p>Omple el formulari per veure el càlcul</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}