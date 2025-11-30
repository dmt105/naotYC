import React from 'react';
import { DepartmentStat } from '@/types/admin';

interface ChartsProps {
  departmentStats: DepartmentStat[];
  notesByType: Record<string, number>;
  notesByStatus: any;
}

export const DepartmentChart: React.FC<{ data: DepartmentStat[] }> = ({ data }) => {
  const maxNotes = Math.max(...data.map(dept => dept.noteCount), 1);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes par département</h3>
      <div className="space-y-3">
        {data.map((dept, index) => (
          <div key={dept.department} className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 w-32 truncate">
              {dept.department}
            </span>
            <div className="flex-1 mx-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(dept.noteCount / maxNotes) * 100}%` }}
                ></div>
              </div>
            </div>
            <span className="text-sm text-gray-500 w-12 text-right">
              {dept.noteCount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const NotesByTypeChart: React.FC<{ data: Record<string, number> }> = ({ data }) => {
  const total = Object.values(data).reduce((sum, count) => sum + count, 0);
  const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Répartition par type</h3>
      <div className="space-y-3">
        {Object.entries(data).map(([type, count], index) => {
          const percentage = total > 0 ? (count / total) * 100 : 0;
          return (
            <div key={type} className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: colors[index % colors.length] }}
                ></div>
                <span className="text-sm font-medium text-gray-700">
                  {type}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: colors[index % colors.length]
                    }}
                  ></div>
                </div>
                <span className="text-sm text-gray-500 w-8 text-right">
                  {Math.round(percentage)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const StatusChart: React.FC<{ data: any }> = ({ data }) => {
  const statusLabels: Record<string, string> = {
    draft: 'Brouillon',
    pending: 'En attente',
    approved: 'Approuvé',
    scheduled: 'Planifié',
    sent: 'Envoyé',
    archived: 'Archivé'
  };

  const statusColors: Record<string, string> = {
    draft: 'bg-gray-500',
    pending: 'bg-yellow-500',
    approved: 'bg-green-500',
    scheduled: 'bg-blue-500',
    sent: 'bg-purple-500',
    archived: 'bg-indigo-500'
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Statut des notes</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(data).map(([status, count]) => (
          <div key={status} className="text-center">
            <div className={`h-3 w-3 rounded-full mx-auto mb-2 ${statusColors[status] || 'bg-gray-300'}`}></div>
            <div className="text-2xl font-bold text-gray-900">{count as number}</div>
            <div className="text-sm text-gray-500 capitalize">
              {statusLabels[status] || status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};