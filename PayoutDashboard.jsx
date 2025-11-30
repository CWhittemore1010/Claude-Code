import React from 'react';

const PayoutDashboard = () => {
  const navItems = [
    { icon: 'grid', label: 'Dashboard', active: false },
    { icon: 'folder', label: 'Projects', active: false },
    { icon: 'users', label: 'Contractors', active: false },
    { icon: 'credit-card', label: 'Payments', active: true },
    { icon: 'shield', label: 'Compliance', active: false },
    { icon: 'settings', label: 'Settings', active: false },
  ];

  const stats = [
    { label: 'Paid This Month', value: '$47,250', icon: 'trending-up', trend: '+12%', trendUp: true },
    { label: 'In Escrow', value: '$12,400', icon: 'shield', trend: null },
    { label: 'Pending Approval', value: '3 milestones', icon: 'clock', trend: null },
    { label: '1099 Ready', value: '18 contractors', icon: 'check-circle', trend: null },
  ];

  const payments = [
    { initials: 'SM', name: 'Sarah M.', project: 'Website Redesign', amount: '$3,200', speed: 'Instant', status: 'Paid', color: 'bg-emerald-500' },
    { initials: 'JC', name: 'James C.', project: 'Mobile App Phase 2', amount: '$5,500', speed: 'Express 24hr', status: 'Processing', color: 'bg-blue-500' },
    { initials: 'DS', name: 'DevStudio LLC', project: 'Backend API', amount: '$8,750', speed: 'Standard', status: 'Scheduled', color: 'bg-purple-500' },
    { initials: 'MG', name: 'Maria G.', project: 'UGC Campaign', amount: '$1,200', speed: 'Instant', status: 'Paid', color: 'bg-pink-500' },
    { initials: 'AT', name: 'Alex T.', project: 'Logo Design', amount: '$950', speed: 'Instant', status: 'Paid', color: 'bg-orange-500' },
  ];

  const getSpeedBadge = (speed) => {
    switch (speed) {
      case 'Instant':
        return 'bg-emerald-100 text-emerald-700';
      case 'Express 24hr':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Paid':
        return { bg: 'bg-emerald-100 text-emerald-700', icon: '✓' };
      case 'Processing':
        return { bg: 'bg-amber-100 text-amber-700 animate-pulse', icon: '●' };
      default:
        return { bg: 'bg-gray-100 text-gray-600', icon: '○' };
    }
  };

  const NavIcon = ({ type, active }) => {
    const iconClass = `w-5 h-5 ${active ? 'text-emerald-600' : 'text-gray-400'}`;

    const icons = {
      grid: (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
      folder: (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      ),
      users: (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      'credit-card': (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      shield: (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      settings: (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    };

    return icons[type] || null;
  };

  const StatIcon = ({ type }) => {
    const iconClass = 'w-5 h-5';

    const icons = {
      'trending-up': (
        <svg className={`${iconClass} text-emerald-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      shield: (
        <svg className={`${iconClass} text-blue-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      clock: (
        <svg className={`${iconClass} text-amber-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      'check-circle': (
        <svg className={`${iconClass} text-emerald-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    };

    return icons[type] || null;
  };

  return (
    <div
      className="w-full max-w-5xl mx-auto rounded-2xl overflow-hidden bg-gray-50 shadow-2xl shadow-gray-900/20"
      style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
    >
      <div className="flex h-[520px]">
        {/* Left Sidebar */}
        <div className="w-16 bg-white border-r border-gray-100 flex flex-col items-center py-4">
          {/* Logo */}
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-8 shadow-lg shadow-emerald-500/30">
            <span className="text-white font-bold text-lg">P</span>
          </div>

          {/* Nav Items */}
          <nav className="flex flex-col items-center space-y-2 flex-1">
            {navItems.map((item, index) => (
              <button
                key={index}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  item.active
                    ? 'bg-emerald-50 shadow-sm'
                    : 'hover:bg-gray-50'
                }`}
                title={item.label}
              >
                <NavIcon type={item.icon} active={item.active} />
              </button>
            ))}
          </nav>

          {/* User Avatar */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-medium">
            JD
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-50 overflow-hidden">
          {/* Header */}
          <div className="bg-white border-b border-gray-100 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Payments</h1>
                <p className="text-sm text-gray-500 mt-0.5">Manage contractor payouts</p>
              </div>
              <button className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-medium rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 shadow-lg shadow-emerald-500/30 flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Pay Contractor</span>
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="px-6 py-4">
            <div className="grid grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{stat.label}</span>
                    <StatIcon type={stat.icon} />
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="text-xl font-bold text-gray-900">{stat.value}</span>
                    {stat.trend && (
                      <span className={`text-xs font-medium ${stat.trendUp ? 'text-emerald-600' : 'text-red-600'}`}>
                        {stat.trend}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment List */}
          <div className="px-6 pb-4">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 border-b border-gray-100 text-xs font-medium text-gray-500 uppercase tracking-wide">
                <div className="col-span-4">Contractor</div>
                <div className="col-span-2 text-right">Amount</div>
                <div className="col-span-2 text-center">Speed</div>
                <div className="col-span-2 text-center">Status</div>
                <div className="col-span-2 text-center">Protected</div>
              </div>

              {/* Payment Rows */}
              {payments.map((payment, index) => {
                const statusStyle = getStatusBadge(payment.status);
                return (
                  <div
                    key={index}
                    className={`grid grid-cols-12 gap-4 px-4 py-3.5 items-center hover:bg-gray-50 transition-colors duration-150 ${
                      index !== payments.length - 1 ? 'border-b border-gray-50' : ''
                    }`}
                  >
                    {/* Contractor */}
                    <div className="col-span-4 flex items-center space-x-3">
                      <div className={`w-9 h-9 rounded-full ${payment.color} flex items-center justify-center text-white text-xs font-semibold shadow-sm`}>
                        {payment.initials}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{payment.name}</div>
                        <div className="text-xs text-gray-500">{payment.project}</div>
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="col-span-2 text-right">
                      <span className="text-sm font-semibold text-gray-900">{payment.amount}</span>
                    </div>

                    {/* Speed */}
                    <div className="col-span-2 text-center">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getSpeedBadge(payment.speed)}`}>
                        {payment.speed}
                      </span>
                    </div>

                    {/* Status */}
                    <div className="col-span-2 text-center">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle.bg}`}>
                        <span className="mr-1">{statusStyle.icon}</span>
                        {payment.status}
                      </span>
                    </div>

                    {/* Protected */}
                    <div className="col-span-2 text-center">
                      {payment.status === 'Paid' && (
                        <div className="inline-flex items-center text-emerald-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <div className="absolute bottom-6 right-6 animate-fade-in">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 flex items-center space-x-3">
          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">$3,200 sent to Sarah M.</p>
            <p className="text-xs text-gray-500">Instant payout completed</p>
          </div>
        </div>
      </div>

      {/* Compliance Badge */}
      <div className="absolute top-6 right-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-gray-100 px-3 py-2 flex items-center space-x-2">
          <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs font-medium text-gray-700">18/18 W-9s collected</span>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PayoutDashboard;
