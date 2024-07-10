import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const presetScenarios = {
  founderFriendly: {
    name: "Founder-friendly",
    investmentAmount: 10000000,
    multiple: 1,
    ownershipPercentage: 15,
    hasParticipation: false,
  },
  vcFriendly: {
    name: "VC-friendly",
    investmentAmount: 20000000,
    multiple: 2,
    ownershipPercentage: 30,
    hasParticipation: true,
  },
  balanced: {
    name: "Balanced",
    investmentAmount: 15000000,
    multiple: 1.5,
    ownershipPercentage: 20,
    hasParticipation: false,
  },
  custom: {
    name: "Custom",
    investmentAmount: 10000000,
    multiple: 1,
    ownershipPercentage: 20,
    hasParticipation: false,
  },
};

const VCLiquidationSimulation = () => {
  const [activeScenario, setActiveScenario] = useState('custom');
  const [customScenario, setCustomScenario] = useState(presetScenarios.custom);

  const currentScenario = activeScenario === 'custom' ? customScenario : presetScenarios[activeScenario];

  const calculateVCPayout = (exitValue, scenario) => {
    const { investmentAmount, multiple, ownershipPercentage, hasParticipation } = scenario;
    const liquidationPreference = investmentAmount * multiple;
    const ownershipPayout = exitValue * (ownershipPercentage / 100);
    
    if (hasParticipation) {
      return Math.min(exitValue, liquidationPreference + ownershipPayout);
    } else {
      return Math.max(liquidationPreference, ownershipPayout);
    }
  };

  const generateData = useMemo(() => {
    const data = [];
    const maxExitValue = Math.max(100000000, currentScenario.investmentAmount * 10);
    for (let exitValue = 0; exitValue <= maxExitValue; exitValue += maxExitValue / 100) {
      const vcPayout = calculateVCPayout(exitValue, currentScenario);
      const founderPayout = Math.max(0, exitValue - vcPayout);
      data.push({
        exitValue,
        vcPayout,
        founderPayout,
      });
    }
    return data;
  }, [currentScenario]);

  const formatCurrency = (value) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(1)}B`;
    } else if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else {
      return `$${(value / 1000).toFixed(0)}K`;
    }
  };

  const handleCustomScenarioChange = (field, value) => {
    setCustomScenario(prev => ({ ...prev, [field]: value }));
  };

  const maxPayoutValue = useMemo(() => {
    return Math.max(...generateData.map(d => Math.max(d.vcPayout, d.founderPayout)));
  }, [generateData]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">VC Liquidation Preference Simulation</h1>
        <div className="mb-6">
          <label className="block mb-2">
            Scenario:
            <select
              value={activeScenario}
              onChange={(e) => setActiveScenario(e.target.value)}
              className="ml-2 bg-gray-800 text-white border border-gray-700 rounded px-2 py-1"
            >
              {Object.entries(presetScenarios).map(([key, scenario]) => (
                <option key={key} value={key}>{scenario.name}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="mb-6 bg-gray-800 p-4 rounded min-h-[200px]">
          {activeScenario === 'custom' && (
            <>
              <label className="block mb-4">
                Investment Amount: {formatCurrency(customScenario.investmentAmount)}
                <input
                  type="range"
                  min="1000000"
                  max="100000000"
                  step="1000000"
                  value={customScenario.investmentAmount}
                  onChange={(e) => handleCustomScenarioChange('investmentAmount', Number(e.target.value))}
                  className="w-full"
                />
              </label>
              <label className="block mb-4">
                Liquidation Preference Multiple: {customScenario.multiple}x
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.1"
                  value={customScenario.multiple}
                  onChange={(e) => handleCustomScenarioChange('multiple', Number(e.target.value))}
                  className="w-full"
                />
              </label>
              <label className="block mb-4">
                VC Ownership Percentage: {customScenario.ownershipPercentage}%
                <input
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={customScenario.ownershipPercentage}
                  onChange={(e) => handleCustomScenarioChange('ownershipPercentage', Number(e.target.value))}
                  className="w-full"
                />
              </label>
              <label className="block">
                <input
                  type="checkbox"
                  checked={customScenario.hasParticipation}
                  onChange={(e) => handleCustomScenarioChange('hasParticipation', e.target.checked)}
                  className="mr-2"
                />
                Participation
              </label>
            </>
          )}
          {activeScenario !== 'custom' && (
            <div className="text-center py-8">
              Using preset {currentScenario.name} scenario
            </div>
          )}
        </div>
        <div className="bg-gray-800 p-4 rounded mb-6">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={generateData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis
                dataKey="exitValue"
                tickFormatter={formatCurrency}
                label={{ value: 'Exit Value', position: 'insideBottom', offset: -15, fill: '#e0e0e0' }}
                stroke="#e0e0e0"
              />
              <YAxis
                tickFormatter={formatCurrency}
                label={{ value: 'Payout', angle: -90, position: 'insideLeft', offset: -5, fill: '#e0e0e0' }}
                stroke="#e0e0e0"
                domain={[0, maxPayoutValue]}
              />
              <Tooltip
                formatter={formatCurrency}
                labelFormatter={(value) => `Exit Value: ${formatCurrency(value)}`}
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', color: '#e0e0e0' }}
              />
              <Legend verticalAlign="top" height={36}/>
              <Line type="monotone" dataKey="vcPayout" stroke="#8884d8" name="VC Payout" />
              <Line type="monotone" dataKey="founderPayout" stroke="#4ade80" name="Founder Payout" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Current Scenario: {currentScenario.name}</h2>
          <ul className="list-disc pl-5 mt-2">
            <li><strong>Investment Amount:</strong> {formatCurrency(currentScenario.investmentAmount)}</li>
            <li><strong>Liquidation Preference Multiple:</strong> {currentScenario.multiple}x</li>
            <li><strong>VC Ownership Percentage:</strong> {currentScenario.ownershipPercentage}%</li>
            <li><strong>Participation:</strong> {currentScenario.hasParticipation ? 'Yes' : 'No'}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VCLiquidationSimulation;