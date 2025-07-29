import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { User, Lock, TrendingUp, DollarSign, Users, Target, Phone, Mail, Calendar, Filter, Download, RefreshCw } from 'lucide-react';
import '../src/'

// Dados de exemplo para os gráficos
const salesData = [
  { name: 'Jan', vendas: 4000, meta: 3500 },
  { name: 'Fev', vendas: 3000, meta: 3200 },
  { name: 'Mar', vendas: 5000, meta: 4000 },
  { name: 'Abr', vendas: 2780, meta: 3800 },
  { name: 'Mai', vendas: 1890, meta: 3500 },
  { name: 'Jun', vendas: 2390, meta: 3000 },
];

const pieData = [
  { name: 'Fechadas', value: 65, color: '#10B981' },
  { name: 'Em Negociação', value: 25, color: '#F59E0B' },
  { name: 'Perdidas', value: 10, color: '#EF4444' },
];

const preVendasData = [
  { name: 'Seg', leads: 120, qualificados: 45 },
  { name: 'Ter', leads: 98, qualificados: 38 },
  { name: 'Qua', leads: 150, qualificados: 62 },
  { name: 'Qui', leads: 87, qualificados: 34 },
  { name: 'Sex', leads: 165, qualificados: 71 },
  { name: 'Sab', leads: 45, qualificados: 18 },
  { name: 'Dom', leads: 32, qualificados: 12 },
];

const funnelData = [
  { name: 'Leads Recebidos', value: 1200 },
  { name: 'Leads Qualificados', value: 450 },
  { name: 'Propostas Enviadas', value: 180 },
  { name: 'Negociações', value: 90 },
  { name: 'Fechamentos', value: 35 },
];

const SalesApp = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [refreshing, setRefreshing] = useState(false);

  // Credenciais de acesso
  const validCredentials = {
    username: 'admin',
    password: 'vendas2024'
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.username === validCredentials.username &&
      loginData.password === validCredentials.password) {
      setIsLoggedIn(true);
      setCurrentPage('vendas');
    } else {
      alert('Credenciais inválidas! Use: admin / vendas2024');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('login');
    setLoginData({ username: '', password: '' });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  // Página de Login
  const LoginPage = () => (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon-wrapper">
            <User className="login-icon" />
          </div>
          <h1 className="login-title">Sistema de Vendas</h1>
          <p className="login-subtitle">Faça login para acessar o dashboard</p>
        </div>

        <div className="login-form">
          <div className="login-input-group">
            <div className="login-input-wrapper">
              <User className="login-input-icon" />
              <input
                type="text"
                placeholder="Usuário"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                className="login-input"
                required
              />
            </div>
          </div>

          <div className="login-input-group">
            <div className="login-input-wrapper">
              <Lock className="login-input-icon" />
              <input
                type="password"
                placeholder="Senha"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="login-input"
                required
              />
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="login-button"
          >
            Entrar
          </button>
        </div>

        <div className="login-credentials-box">
          <p className="login-credentials-text">
            <strong>Credenciais de teste:</strong><br />
            Usuário: <span className="login-credentials-highlight">admin</span><br />
            Senha: <span className="login-credentials-highlight">vendas2024</span>
          </p>
        </div>
      </div>
    </div>
  );

  // Header da aplicação
  const Header = () => (
    <header className="app-header">
      <div className="header-content">
        <h1 className="header-title">Dashboard de Vendas</h1>
        <div className="header-controls">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="period-select"
          >
            <option value="7d">Últimos 7 dias</option>
            <option value="30d">Últimos 30 dias</option>
            <option value="90d">Últimos 90 dias</option>
          </select>
          <button
            onClick={handleRefresh}
            className={`refresh-button ${refreshing ? 'refresh-animate' : ''}`}
          >
            <RefreshCw className="refresh-icon" />
          </button>
          <button
            onClick={handleLogout}
            className="logout-button"
          >
            Sair
          </button>
        </div>
      </div>
      <nav className="header-nav">
        <div className="header-nav-buttons">
          <button
            onClick={() => setCurrentPage('vendas')}
            className={`nav-button ${currentPage === 'vendas' ? 'nav-button-active' : 'nav-button-inactive'}`}
          >
            Agente de Vendas
          </button>
          <button
            onClick={() => setCurrentPage('prevendas')}
            className={`nav-button ${currentPage === 'prevendas' ? 'nav-button-active' : 'nav-button-inactive'}`}
          >
            Agente de Pré-Vendas
          </button>
        </div>
      </nav>
    </header>
  );

  // Componente de Card
  const Card = ({ children, className = '' }) => (
    <div className={`app-card ${className}`}>
      {children}
    </div>
  );

  // Página Agente de Vendas
  const VendasPage = () => (
    <div className="sales-page">
      {/* KPIs */}
      <div className="kpi-grid">
        <Card className="kpi-card kpi-card-green">
          <div className="kpi-content">
            <div className="kpi-text">
              <p className="kpi-label">Vendas do Mês</p>
              <p className="kpi-value">R$ 125.4K</p>
              <p className="kpi-detail">+12% vs mês anterior</p>
            </div>
            <DollarSign className="kpi-icon kpi-icon-green" />
          </div>
        </Card>

        <Card className="kpi-card kpi-card-blue">
          <div className="kpi-content">
            <div className="kpi-text">
              <p className="kpi-label">Deals Fechados</p>
              <p className="kpi-value">47</p>
              <p className="kpi-detail">+8% vs mês anterior</p>
            </div>
            <Target className="kpi-icon kpi-icon-blue" />
          </div>
        </Card>

        <Card className="kpi-card kpi-card-purple">
          <div className="kpi-content">
            <div className="kpi-text">
              <p className="kpi-label">Taxa de Conversão</p>
              <p className="kpi-value">18.5%</p>
              <p className="kpi-detail">+2.3% vs mês anterior</p>
            </div>
            <TrendingUp className="kpi-icon kpi-icon-purple" />
          </div>
        </Card>

        <Card className="kpi-card kpi-card-orange">
          <div className="kpi-content">
            <div className="kpi-text">
              <p className="kpi-label">Ticket Médio</p>
              <p className="kpi-value">R$ 2.8K</p>
              <p className="kpi-detail">+5% vs mês anterior</p>
            </div>
            <Users className="kpi-icon kpi-icon-orange" />
          </div>
        </Card>
      </div>

      {/* Gráficos e Controles */}
      <div className="charts-grid">
        {/* Gráfico de Vendas vs Meta */}
        <Card className="chart-card chart-card-large">
          <div className="chart-header">
            <h3 className="chart-title">Vendas vs Meta</h3>
            <div className="chart-controls">
              <button className="chart-control-button chart-control-blue">
                <Download className="chart-control-icon" />
              </button>
              <button className="chart-control-button chart-control-gray">
                <Filter className="chart-control-icon" />
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `R$ ${value}`} />
              <Legend />
              <Bar dataKey="vendas" fill="#3B82F6" name="Vendas Realizadas" />
              <Bar dataKey="meta" fill="#10B981" name="Meta" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Status dos Deals */}
        <Card className="chart-card">
          <h3 className="chart-title">Status dos Deals</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Ações Rápidas */}
      <Card className="actions-card">
        <h3 className="chart-title">Ações Rápidas</h3>
        <div className="actions-grid">
          <button className="action-button action-button-blue">
            <Phone className="action-icon" />
            <p className="action-text">Ligar para Lead</p>
          </button>
          <button className="action-button action-button-green">
            <Mail className="action-icon" />
            <p className="action-text">Enviar Proposta</p>
          </button>
          <button className="action-button action-button-purple">
            <Calendar className="action-icon" />
            <p className="action-text">Agendar Reunião</p>
          </button>
          <button className="action-button action-button-orange">
            <TrendingUp className="action-icon" />
            <p className="action-text">Ver Relatórios</p>
          </button>
        </div>
      </Card>
    </div>
  );

  // Página Agente de Pré-Vendas
  const PreVendasPage = () => (
    <div className="prevendas-page">
      {/* KPIs de Pré-Vendas */}
      <div className="kpi-grid">
        <Card className="kpi-card kpi-card-indigo">
          <div className="kpi-content">
            <div className="kpi-text">
              <p className="kpi-label">Leads Recebidos</p>
              <p className="kpi-value">1,247</p>
              <p className="kpi-detail">+15% vs semana anterior</p>
            </div>
            <Users className="kpi-icon kpi-icon-indigo" />
          </div>
        </Card>

        <Card className="kpi-card kpi-card-cyan">
          <div className="kpi-content">
            <div className="kpi-text">
              <p className="kpi-label">Leads Qualificados</p>
              <p className="kpi-value">394</p>
              <p className="kpi-detail">31.6% do total</p>
            </div>
            <Target className="kpi-icon kpi-icon-cyan" />
          </div>
        </Card>

        <Card className="kpi-card kpi-card-teal">
          <div className="kpi-content">
            <div className="kpi-text">
              <p className="kpi-label">Taxa Qualificação</p>
              <p className="kpi-value">31.6%</p>
              <p className="kpi-detail">+4.2% vs semana anterior</p>
            </div>
            <TrendingUp className="kpi-icon kpi-icon-teal" />
          </div>
        </Card>

        <Card className="kpi-card kpi-card-rose">
          <div className="kpi-content">
            <div className="kpi-text">
              <p className="kpi-label">Tempo Resposta</p>
              <p className="kpi-value">4.2min</p>
              <p className="kpi-detail">-30s vs meta</p>
            </div>
            <Phone className="kpi-icon kpi-icon-rose" />
          </div>
        </Card>
      </div>

      {/* Funil de Conversão */}
      <div className="charts-grid-two-cols">
        <Card className="chart-card">
          <h3 className="chart-title">Funil de Conversão</h3>
          <div className="funnel-stages">
            {funnelData.map((stage, index) => {
              const percentage = (stage.value / funnelData[0].value) * 100;
              return (
                <div key={stage.name} className="funnel-stage">
                  <div className="funnel-stage-header">
                    <span className="funnel-stage-name">{stage.name}</span>
                    <span className="funnel-stage-value">{stage.value}</span>
                  </div>
                  <div className="funnel-progress-bg">
                    <div
                      className="funnel-progress-fill"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="funnel-percentage-text">
                    {percentage.toFixed(1)}%
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Leads por Dia */}
        <Card className="chart-card">
          <h3 className="chart-title">Leads por Dia da Semana</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={preVendasData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="leads" stroke="#8B5CF6" strokeWidth={3} name="Leads Recebidos" />
              <Line type="monotone" dataKey="qualificados" stroke="#10B981" strokeWidth={3} name="Qualificados" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Ferramentas de Qualificação */}
      <Card className="tools-card">
        <h3 className="chart-title">Ferramentas de Qualificação</h3>
        <div className="tools-grid">
          <button className="tool-button tool-button-yellow">
            <Phone className="tool-icon" />
            <p className="tool-text">Discador</p>
          </button>
          <button className="tool-button tool-button-red">
            <Mail className="tool-icon" />
            <p className="tool-text">Email Seq.</p>
          </button>
          <button className="tool-button tool-button-blue">
            <Calendar className="tool-icon" />
            <p className="tool-text">Agendamento</p>
          </button>
          <button className="tool-button tool-button-green">
            <Users className="tool-icon" />
            <p className="tool-text">CRM</p>
          </button>
          <button className="tool-button tool-button-purple">
            <TrendingUp className="tool-icon" />
            <p className="tool-text">Analytics</p>
          </button>
          <button className="tool-button tool-button-indigo">
            <Target className="tool-icon" />
            <p className="tool-text">Scoring</p>
          </button>
        </div>
      </Card>

      {/* Lista de Leads Ativos */}
      <Card className="leads-list-card">
        <h3 className="chart-title">Leads Ativos para Qualificação</h3>
        <div className="leads-table-container">
          <table className="leads-table">
            <thead>
              <tr className="leads-table-header-row">
                <th className="leads-table-header">Nome</th>
                <th className="leads-table-header">Empresa</th>
                <th className="leads-table-header">Score</th>
                <th className="leads-table-header">Status</th>
                <th className="leads-table-header">Ação</th>
              </tr>
            </thead>
            <tbody>
              {[
                { nome: 'João Silva', empresa: 'Tech Corp', score: 85, status: 'Novo' },
                { nome: 'Maria Santos', empresa: 'Digital Ltd', score: 72, status: 'Contactado' },
                { nome: 'Pedro Costa', empresa: 'Innovation Inc', score: 91, status: 'Qualificado' },
                { nome: 'Ana Oliveira', empresa: 'Solutions SA', score: 68, status: 'Em Análise' }
              ].map((lead, index) => (
                <tr key={index} className="leads-table-row">
                  <td className="leads-table-data">{lead.nome}</td>
                  <td className="leads-table-data">{lead.empresa}</td>
                  <td className="leads-table-data">
                    <span className={`lead-score ${lead.score >= 80 ? 'lead-score-green' :
                        lead.score >= 70 ? 'lead-score-yellow' :
                          'lead-score-red'
                      }`}>
                      {lead.score}
                    </span>
                  </td>
                  <td className="leads-table-data">
                    <span className={`lead-status ${lead.status === 'Qualificado' ? 'lead-status-green' :
                        lead.status === 'Contactado' ? 'lead-status-blue' :
                          lead.status === 'Em Análise' ? 'lead-status-yellow' :
                            'lead-status-gray'
                      }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="leads-table-data">
                    <button className="qualify-button">
                      Qualificar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="app-container">
      {!isLoggedIn ? (
        <LoginPage />
      ) : (
        <>
          <Header />
          {currentPage === 'vendas' && <VendasPage />}
          {currentPage === 'prevendas' && <PreVendasPage />}
        </>
      )}
    </div>
  );
};

export default SalesApp;