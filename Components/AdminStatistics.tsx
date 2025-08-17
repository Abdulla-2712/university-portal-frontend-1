// Components/AdminStatistics.tsx
'use client';

import { useState, useEffect } from 'react';

interface StatCard {
  title: string;
  value: number;
  icon: string;
  change: number;
  changeType: 'increase' | 'decrease';
  color: string;
}

export default function AdminStatistics() {
  const [stats, setStats] = useState<StatCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading stats data
    setTimeout(() => {
      setStats([
        {
          title: 'Total Complaints',
          value: 156,
          icon: '📋',
          change: 12,
          changeType: 'increase',
          color: '#ff6b6b'
        },
        {
          title: 'Pending Reviews',
          value: 23,
          icon: '⏳',
          change: 5,
          changeType: 'decrease',
          color: '#ffd93d'
        },
        {
          title: 'Resolved Issues',
          value: 89,
          icon: '✅',
          change: 18,
          changeType: 'increase',
          color: '#51cf66'
        },
        {
          title: 'Active Suggestions',
          value: 34,
          icon: '💡',
          change: 7,
          changeType: 'increase',
          color: '#667eea'
        },
        {
          title: 'New Requests',
          value: 67,
          icon: '📝',
          change: 3,
          changeType: 'increase',
          color: '#764ba2'
        },
        {
          title: 'User Satisfaction',
          value: 94,
          icon: '😊',
          change: 2,
          changeType: 'increase',
          color: '#20c997'
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="statistics-loading">
        <div className="loading-spinner"></div>
        <p>Loading statistics...</p>
      </div>
    );
  }

  return (
    <div className="statistics-container">
      <div className="statistics-header">
        <h2>📊 Dashboard Statistics</h2>
        <p>Overview of system performance and user engagement</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderTopColor: stat.color }}>
            <div className="stat-header">
              <span className="stat-icon">{stat.icon}</span>
              <div className="stat-change">
                <span className={`change-indicator ${stat.changeType}`}>
                  {stat.changeType === 'increase' ? '↗' : '↘'} {stat.change}%
                </span>
              </div>
            </div>
            <div className="stat-content">
              <h3 className="stat-value" style={{ color: stat.color }}>
                {stat.title === 'User Satisfaction' ? `${stat.value}%` : stat.value}
              </h3>
              <p className="stat-title">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="statistics-charts">
        <div className="chart-container">
          <h3>📈 Monthly Trends</h3>
          <div className="chart-placeholder">
            <div className="chart-bars">
              <div className="bar" style={{ height: '60%', backgroundColor: '#667eea' }}></div>
              <div className="bar" style={{ height: '80%', backgroundColor: '#764ba2' }}></div>
              <div className="bar" style={{ height: '45%', backgroundColor: '#51cf66' }}></div>
              <div className="bar" style={{ height: '90%', backgroundColor: '#ffd93d' }}></div>
              <div className="bar" style={{ height: '70%', backgroundColor: '#ff6b6b' }}></div>
              <div className="bar" style={{ height: '85%', backgroundColor: '#20c997' }}></div>
            </div>
            <div className="chart-labels">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </div>
        </div>

        <div className="recent-activity">
          <h3>🕒 Recent Activity</h3>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-icon">📋</span>
              <div className="activity-content">
                <p className="activity-text">New complaint submitted</p>
                <span className="activity-time">2 minutes ago</span>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-icon">✅</span>
              <div className="activity-content">
                <p className="activity-text">Complaint #127 resolved</p>
                <span className="activity-time">15 minutes ago</span>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-icon">💡</span>
              <div className="activity-content">
                <p className="activity-text">New suggestion received</p>
                <span className="activity-time">1 hour ago</span>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-icon">📝</span>
              <div className="activity-content">
                <p className="activity-text">Request #89 approved</p>
                <span className="activity-time">3 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .statistics-container {
          padding: 0;
        }

        .statistics-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 300px;
          gap: 20px;
        }

        .statistics-header {
          margin-bottom: 30px;
        }

        .statistics-header h2 {
          font-size: 1.8rem;
          color: #333;
          margin-bottom: 8px;
        }

        .statistics-header p {
          color: #666;
          font-size: 1rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: white;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border-top: 4px solid #667eea;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
        }

        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .stat-icon {
          font-size: 2rem;
        }

        .change-indicator {
          font-size: 0.85rem;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 12px;
        }

        .change-indicator.increase {
          background: #e8f5e8;
          color: #2d7738;
        }

        .change-indicator.decrease {
          background: #fce8e8;
          color: #b91c1c;
        }

        .stat-content {
          text-align: left;
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 700;
        }

        .stat-title {
          font-size: 1rem;
          color: #666;
          margin-top: 5px;
        }

        .statistics-charts {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 30px;
          margin-top: 40px;
        }

        .chart-container,
        .recent-activity {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .chart-placeholder {
          margin-top: 20px;
        }

        .chart-bars {
          display: flex;
          align-items: flex-end;
          justify-content: space-around;
          height: 150px;
          margin-bottom: 10px;
        }

        .bar {
          width: 30px;
          border-radius: 6px;
        }

        .chart-labels {
          display: flex;
          justify-content: space-around;
          font-size: 0.85rem;
          color: #666;
        }

        .activity-list {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .activity-item {
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .activity-icon {
          font-size: 1.5rem;
        }

        .activity-content {
          flex-grow: 1;
        }

        .activity-text {
          font-size: 1rem;
          margin: 0;
        }

        .activity-time {
          font-size: 0.8rem;
          color: #888;
        }
      `}</style>
    </div>
  );
}
