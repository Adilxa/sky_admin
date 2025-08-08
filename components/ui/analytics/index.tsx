'use client';

import React, { useEffect, useState } from 'react';
import { Users, TrendingUp, TrendingDown } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

type MetricId = 'rare' | 'active';

export default function AppAnalytics() {
  const [selectedMetric, setSelectedMetric] = useState<MetricId>('rare');
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [animatedNewUsers, setAnimatedNewUsers] = useState(0);
  const [animatedMetrics, setAnimatedMetrics] = useState<{ [k in MetricId]: number }>({
    rare: 0,
    active: 0,
  });

  const data = {
    total: 1485,
    activePercentage: 80,
    newUsers: 857,
    newUsersChange: 36.8,
    gender: [
      { name: 'Female', value: '30.16%' },
      { name: 'Male', value: '57.32%' },
      { name: 'Undefined', value: '11.96%' },
    ],
    metrics: {
      rare: { id: 'rare' as MetricId, title: 'Редкие', value: 1293, display: '1,293', change: -36.8 },
      active: { id: 'active' as MetricId, title: 'Активные', value: 256000, display: '256k', change: 36.8 },
    },
  };

  const pieData = [
    { name: 'Активные', value: data.activePercentage - 12, color: '#10B981' },
    { name: 'Новые', value: 12, color: '#6366F1' },
    { name: 'Неактивные', value: 100 - data.activePercentage, color: '#E5E7EB' },
  ];

  useEffect(() => {
    setAnimatedPercentage(0);
    const pInterval = setInterval(() => {
      setAnimatedPercentage(prev => {
        if (prev >= data.activePercentage) {
          clearInterval(pInterval);
          return data.activePercentage;
        }
        return prev + 2;
      });
    }, 18);

    setAnimatedNewUsers(0);
    const nInterval = setInterval(() => {
      setAnimatedNewUsers(prev => {
        if (prev >= data.newUsers) {
          clearInterval(nInterval);
          return data.newUsers;
        }
        return prev + 17;
      });
    }, 18);

    const metricsTimer = setTimeout(() => {
      setAnimatedMetrics({
        rare: data.metrics.rare.value,
        active: data.metrics.active.value,
      });
    }, 400);

    return () => {
      clearInterval(pInterval);
      clearInterval(nInterval);
      clearTimeout(metricsTimer);
    };
  }, [selectedMetric]);

  const tabItems: { id: MetricId; label: string }[] = [
    { id: 'rare', label: 'Редкие' },
    { id: 'active', label: 'Активные' },
  ];

  return (
    <div className="w-full bg-gray-50 rounded-3xl p-6 bg-[var(--aside-bg)]">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Аналитика приложения</h3>

      {/* Круговая диаграмма */}
      <div className="relative w-[340px] h-[340px] mx-auto mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={100}
              outerRadius={132}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              isAnimationActive={true}
            >
              {pieData.map((entry, i) => (
                <Cell key={i} fill={(entry as any).color} />
              ))}
            </Pie>
            <RechartsTooltip
              formatter={(value, name) => [`${value}%`, name]}
              contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Центр круга */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="text-5xl font-extrabold text-gray-900">{animatedPercentage}%</div>
          <div className="text-sm text-gray-500 mt-1">Пользователей</div>
        </div>
      </div>

      {/* Gender row */}
      <div className="relative mb-4">
        <div className="absolute left-0 right-0 top-1/2 border-t border-dotted border-gray-300" />
        <div className="relative flex justify-between items-center px-2 bg-gray-50">
          {data.gender.map(g => (
            <div
              key={g.name}
              className="px-2 bg-gray-50 text-center"
              title={`Процент пользователей с полом ${g.name}`}
            >
              <div className="text-[11px] text-gray-500">{g.name}</div>
              <div className="text-sm font-semibold text-gray-900">{g.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Новые пользователи */}
      <div className="rounded-2xl p-4 mb-4" title="Количество новых пользователей за последние 3 месяца">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-baseline gap-3">
              <div className="text-2xl font-extrabold text-gray-900">{animatedNewUsers.toLocaleString('ru-RU')}</div>
              <div className="text-gray-700 text-sm">Новых пользователей</div>
            </div>
            <div className="text-xs text-gray-400 mt-1">За последние 3 месяца</div>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="flex items-center gap-1 bg-green-50 border border-green-100 text-green-600 px-3 py-1 rounded-lg text-sm"
              title="Прирост новых пользователей в процентах"
            >
              <TrendingUp className="w-3 h-3" />
              <span className="font-medium">{data.newUsersChange}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Метрики */}
      <div className="grid grid-cols-2 gap-4 bg-[#7B7B7B1A]  p-2 rounded-xl">
        {(['rare', 'active'] as MetricId[]).map(id => {
          const m = data.metrics[id];
          const isSelected = selectedMetric === id;

          return (
            <div
              key={id}
              onClick={() => setSelectedMetric(id)}
              className={`p-4 rounded-2xl transition-shadow duration-200 cursor-pointer
                ${isSelected ? 'bg-white shadow-xl' : 'bg-transparent'}`}
              title={`Метрика "${m.title}": ${m.display} пользователей`}
            >
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-gray-500" />
                <div className={`text-xs font-medium ${isSelected ? 'text-gray-900' : 'text-gray-600'}`}>
                  {m.title}
                </div>
              </div>
              <div className="text-3xl font-extrabold text-gray-900 mb-3">
                {m.display}
              </div>
              <div className="mb-2">
                {m.change > 0 ? (
                  <div
                    className="inline-flex items-center gap-1 bg-green-50 border border-green-100 text-green-600 px-3 py-1 rounded-lg text-xs"
                    title="Рост по сравнению с прошлым месяцем"
                  >
                    <TrendingUp className="w-3 h-3" />
                    <span className="font-medium">{Math.abs(m.change)}%</span>
                  </div>
                ) : (
                  <div
                    className="inline-flex items-center gap-1 bg-red-50 border border-red-100 text-red-500 px-3 py-1 rounded-lg text-xs"
                    title="Снижение по сравнению с прошлым месяцем"
                  >
                    <TrendingDown className="w-3 h-3" />
                    <span className="font-medium">{Math.abs(m.change)}%</span>
                  </div>
                )}
              </div>
              <div className="text-[10px] text-gray-400">За прошлый месяц</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
