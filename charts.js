// ============================================================
// NoCo Foodshed Project — Chart Rendering & Interactivity
// ============================================================

// Register the datalabels plugin globally
Chart.register(ChartDataLabels);

// ---------- Global Chart.js Defaults ----------
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.font.size = 12;
Chart.defaults.color = '#4A4A4A';
Chart.defaults.plugins.legend.labels.usePointStyle = true;
Chart.defaults.plugins.legend.labels.pointStyleWidth = 10;
Chart.defaults.plugins.legend.labels.padding = 16;
Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(26, 26, 26, 0.9)';
Chart.defaults.plugins.tooltip.titleFont = { weight: '600', size: 13 };
Chart.defaults.plugins.tooltip.bodyFont = { size: 12 };
Chart.defaults.plugins.tooltip.cornerRadius = 8;
Chart.defaults.plugins.tooltip.padding = 12;
Chart.defaults.plugins.datalabels.display = false; // Off by default

// Color palette
const COLORS = {
  forest: '#1B4332',
  forestLight: '#2D6A4F',
  sage: '#40916C',
  mint: '#52B788',
  mintLight: '#74C69D',
  leaf: '#95D5B2',
  leafLight: '#B7E4C7',
  cream: '#D8F3DC',
  amber: '#F59E0B',
  amberLight: '#FCD34D',
  terra: '#D97706',
  coral: '#EF4444',
  coralLight: '#FCA5A5',
  sky: '#3B82F6',
  skyLight: '#93C5FD',
  purple: '#7C3AED',
  purpleLight: '#C4B5FD',
  teal: '#14B8A6',
  rose: '#F43F5E',
  gray: '#9CA3AF',
};

const CHART_PALETTE = [
  COLORS.forest, COLORS.sage, COLORS.mint, COLORS.amber,
  COLORS.sky, COLORS.purple, COLORS.teal, COLORS.coral,
  COLORS.terra, COLORS.rose
];

const CHART_PALETTE_LIGHT = [
  COLORS.forestLight, COLORS.mintLight, COLORS.leaf, COLORS.amberLight,
  COLORS.skyLight, COLORS.purpleLight, '#5EEAD4', COLORS.coralLight,
  '#FDE68A', '#FDA4AF'
];

// ---------- Utility: create gradient ----------
function createGradient(ctx, color1, color2, direction = 'vertical') {
  const gradient = direction === 'vertical'
    ? ctx.createLinearGradient(0, 0, 0, ctx.canvas.height)
    : ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);
  return gradient;
}

// ---------- Utility: format numbers ----------
function formatNumber(num) {
  if (num >= 1000000) return '$' + (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return num.toLocaleString();
  return num.toString();
}

// ============================================================
// SECTION 1 CHARTS: Food System Snapshot
// ============================================================

function renderSalesDeclineChart() {
  const ctx = document.getElementById('chartSalesDecline').getContext('2d');
  const gradient = createGradient(ctx, 'rgba(239, 68, 68, 0.2)', 'rgba(239, 68, 68, 0.02)');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['2012', '2017'],
      datasets: [{
        label: 'Direct-to-Consumer Sales ($M)',
        data: [1.8, 1.5],
        backgroundColor: [COLORS.sage, COLORS.coral],
        borderColor: [COLORS.forest, '#DC2626'],
        borderWidth: 2,
        borderRadius: 8,
        barPercentage: 0.5,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        datalabels: {
          display: true,
          color: '#1A1A1A',
          font: { weight: '700', size: 18, family: 'Outfit' },
          anchor: 'end',
          align: 'top',
          formatter: (v) => '$' + v.toFixed(1) + 'M'
        },
        tooltip: {
          callbacks: {
            label: (context) => `$${context.parsed.y.toFixed(1)} million`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 2.2,
          ticks: {
            callback: (v) => '$' + v + 'M',
            font: { size: 11 }
          },
          grid: { color: 'rgba(0,0,0,0.04)' }
        },
        x: {
          grid: { display: false },
          ticks: { font: { size: 14, weight: '600' } }
        }
      },
      animation: {
        duration: 1200,
        easing: 'easeOutQuart'
      }
    }
  });
}

function renderLocalVsNationalChart() {
  const ctx = document.getElementById('chartLocalVsNational').getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Larimer County', 'Comparable Counties\n(Low)', 'Comparable Counties\n(High)', 'NoCo Foodshed\nGoal (2027)'],
      datasets: [{
        label: '% of Ag Receipts Sold Locally',
        data: [1, 5, 20, 10],
        backgroundColor: [COLORS.coral, COLORS.sage, COLORS.forest, COLORS.amber],
        borderColor: ['#DC2626', COLORS.forestLight, COLORS.forest, COLORS.terra],
        borderWidth: 2,
        borderRadius: 8,
        barPercentage: 0.55,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        legend: { display: false },
        datalabels: {
          display: true,
          color: '#1A1A1A',
          font: { weight: '700', size: 14, family: 'Outfit' },
          anchor: 'end',
          align: 'right',
          formatter: (v) => v + '%'
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          max: 25,
          ticks: {
            callback: (v) => v + '%',
            font: { size: 11 }
          },
          grid: { color: 'rgba(0,0,0,0.04)' }
        },
        y: {
          grid: { display: false },
          ticks: { font: { size: 11, weight: '500' } }
        }
      },
      animation: {
        duration: 1500,
        easing: 'easeOutQuart'
      }
    }
  });
}

// ============================================================
// SECTION 2 CHARTS: Community Survey
// ============================================================

function renderPrioritiesChart() {
  const ctx = document.getElementById('chartPriorities').getContext('2d');
  const data = NOCO_DATA.communitySurvey.priorities;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.labels,
      datasets: [{
        label: '% Rating Important/Very Important',
        data: data.importance,
        backgroundColor: data.importance.map((v, i) =>
          i === data.importance.length - 1 ? COLORS.coral : CHART_PALETTE[i % CHART_PALETTE.length]
        ),
        borderRadius: 6,
        barPercentage: 0.65,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        legend: { display: false },
        datalabels: {
          display: true,
          color: '#1A1A1A',
          font: { weight: '600', size: 12 },
          anchor: 'end',
          align: 'right',
          formatter: (v) => v + '%'
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          max: 100,
          ticks: { callback: (v) => v + '%' },
          grid: { color: 'rgba(0,0,0,0.04)' }
        },
        y: {
          grid: { display: false },
          ticks: { font: { size: 11 } }
        }
      }
    }
  });
}

function renderAffordabilityChart() {
  const ctx = document.getElementById('chartAffordability').getContext('2d');
  const data = NOCO_DATA.communitySurvey.affordabilityGap;

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: [
        'Social justice is top priority (81%)',
        'Env. sustainability priority (78%)',
        'Can\'t afford to pay more (49%)',
        'Not interested in paying more (22%)'
      ],
      datasets: [{
        data: [81, 78, 49, 22],
        backgroundColor: [COLORS.forest, COLORS.sage, COLORS.coral, COLORS.gray],
        borderWidth: 3,
        borderColor: '#FFFFFF',
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '55%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: { size: 11 },
            padding: 12,
            boxWidth: 14
          }
        },
        datalabels: {
          display: true,
          color: '#FFFFFF',
          font: { weight: '700', size: 14 },
          formatter: (v) => v + '%'
        }
      }
    }
  });
}

function renderShoppingIncomeChart() {
  const ctx = document.getElementById('chartShoppingIncome').getContext('2d');
  const data = NOCO_DATA.communitySurvey.shoppingByIncome;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.categories,
      datasets: [
        {
          label: 'Lower Income',
          data: data.lowerIncome,
          backgroundColor: COLORS.amber,
          borderRadius: 4,
          barPercentage: 0.8,
          categoryPercentage: 0.7,
        },
        {
          label: 'Higher Income',
          data: data.higherIncome,
          backgroundColor: COLORS.forest,
          borderRadius: 4,
          barPercentage: 0.8,
          categoryPercentage: 0.7,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: { font: { size: 12, weight: '500' } }
        },
        datalabels: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: { callback: (v) => v + '%' },
          grid: { color: 'rgba(0,0,0,0.04)' }
        },
        x: {
          grid: { display: false },
          ticks: {
            font: { size: 10 },
            maxRotation: 45,
            minRotation: 25
          }
        }
      }
    }
  });
}

function renderLabelsChart() {
  const ctx = document.getElementById('chartLabels').getContext('2d');
  const data = NOCO_DATA.communitySurvey.labelInterest;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.labels,
      datasets: [{
        label: '% Interested',
        data: data.interest,
        backgroundColor: data.interest.map((v) =>
          v >= 70 ? COLORS.forest : v >= 50 ? COLORS.sage : COLORS.gray
        ),
        borderRadius: 6,
        barPercentage: 0.65,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        legend: { display: false },
        datalabels: {
          display: true,
          color: '#1A1A1A',
          font: { weight: '600', size: 11 },
          anchor: 'end',
          align: 'right',
          formatter: (v) => v + '%'
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          max: 100,
          ticks: { callback: (v) => v + '%' },
          grid: { color: 'rgba(0,0,0,0.04)' }
        },
        y: {
          grid: { display: false },
          ticks: { font: { size: 10 } }
        }
      }
    }
  });
}

function renderFMBarriersChart() {
  const ctx = document.getElementById('chartFMBarriers').getContext('2d');

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Visit & feel welcome', 'Don\'t visit or feel unwelcome'],
      datasets: [{
        data: [67, 33],
        backgroundColor: [COLORS.mint, COLORS.coral],
        borderWidth: 3,
        borderColor: '#FFFFFF',
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '60%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { font: { size: 12, weight: '500' }, padding: 16 }
        },
        datalabels: {
          display: true,
          color: '#FFFFFF',
          font: { weight: '700', size: 18, family: 'Outfit' },
          formatter: (v) => v + '%'
        }
      }
    }
  });
}

// ============================================================
// SECTION 3 CHARTS: Producer Landscape
// ============================================================

function renderProducerBarriersChart() {
  const ctx = document.getElementById('chartProducerBarriers').getContext('2d');
  const data = NOCO_DATA.producerSurvey.topBarriers;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.labels,
      datasets: [{
        label: '% Identifying as Major Barrier',
        data: data.severity,
        backgroundColor: data.severity.map((v) =>
          v >= 80 ? COLORS.coral : v >= 60 ? COLORS.amber : COLORS.sage
        ),
        borderRadius: 6,
        barPercentage: 0.65,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        legend: { display: false },
        datalabels: {
          display: true,
          color: '#1A1A1A',
          font: { weight: '600', size: 12 },
          anchor: 'end',
          align: 'right',
          formatter: (v) => v + '%'
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          max: 100,
          ticks: { callback: (v) => v + '%' },
          grid: { color: 'rgba(0,0,0,0.04)' }
        },
        y: {
          grid: { display: false },
          ticks: { font: { size: 11 } }
        }
      }
    }
  });
}

function renderWaterAccessChart() {
  const ctx = document.getElementById('chartWaterAccess').getContext('2d');
  const sources = NOCO_DATA.producerSurvey.waterAccess.sources;

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(sources),
      datasets: [{
        data: Object.values(sources),
        backgroundColor: [COLORS.sky, COLORS.coral, COLORS.sage, COLORS.gray],
        borderWidth: 3,
        borderColor: '#FFFFFF',
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '55%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { font: { size: 11 }, padding: 12 }
        },
        datalabels: {
          display: true,
          color: '#FFFFFF',
          font: { weight: '700', size: 14 },
          formatter: (v) => v + '%'
        }
      }
    }
  });
}

function renderLandTenureChart() {
  const ctx = document.getElementById('chartLandTenure').getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Own Land', 'Lease Land', 'Single-Year\nLeases', 'Provide Extra\nServices'],
      datasets: [{
        label: '% of Producers',
        data: [57, 44, 70, 73],
        backgroundColor: [COLORS.forest, COLORS.sage, COLORS.coral, COLORS.amber],
        borderRadius: 8,
        barPercentage: 0.55,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        datalabels: {
          display: true,
          color: '#1A1A1A',
          font: { weight: '700', size: 14, family: 'Outfit' },
          anchor: 'end',
          align: 'top',
          formatter: (v) => v + '%'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 85,
          ticks: { callback: (v) => v + '%' },
          grid: { color: 'rgba(0,0,0,0.04)' }
        },
        x: {
          grid: { display: false },
          ticks: { font: { size: 11 } }
        }
      }
    }
  });
}

function renderMarketChannelsChart() {
  const ctx = document.getElementById('chartMarketChannels').getContext('2d');
  const data = NOCO_DATA.producerSurvey.marketChannels;

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: data.labels,
      datasets: [{
        data: data.percentSales,
        backgroundColor: [
          COLORS.forest, COLORS.sage, COLORS.mint,
          COLORS.amber, COLORS.sky, COLORS.purple
        ],
        borderWidth: 3,
        borderColor: '#FFFFFF',
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '50%',
      plugins: {
        legend: {
          position: 'right',
          labels: {
            font: { size: 10 },
            padding: 8,
            boxWidth: 12
          }
        },
        datalabels: {
          display: true,
          color: '#FFFFFF',
          font: { weight: '700', size: 11 },
          formatter: (v) => v + '%'
        }
      }
    }
  });
}

function renderInfrastructureChart() {
  const ctx = document.getElementById('chartInfrastructure').getContext('2d');
  const data = NOCO_DATA.producerSurvey.infrastructureNeeds;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.labels,
      datasets: [{
        label: '% Rating Very Important/Important',
        data: data.veryImportant,
        backgroundColor: [COLORS.forest, COLORS.sage, COLORS.amber],
        borderRadius: 8,
        barPercentage: 0.5,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        datalabels: {
          display: true,
          color: '#1A1A1A',
          font: { weight: '700', size: 16, family: 'Outfit' },
          anchor: 'end',
          align: 'top',
          formatter: (v) => v + '%'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: { callback: (v) => v + '%' },
          grid: { color: 'rgba(0,0,0,0.04)' }
        },
        x: {
          grid: { display: false },
          ticks: { font: { size: 11 } }
        }
      }
    }
  });
}

function renderAspiringBarriersChart() {
  const ctx = document.getElementById('chartAspiringBarriers').getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Aspiring Producers', 'Current Farm Owners'],
      datasets: [{
        label: 'Land & Water as Major Barrier (%)',
        data: [65, 45],
        backgroundColor: [COLORS.coral, COLORS.amber],
        borderRadius: 8,
        barPercentage: 0.45,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        datalabels: {
          display: true,
          color: '#1A1A1A',
          font: { weight: '700', size: 18, family: 'Outfit' },
          anchor: 'end',
          align: 'top',
          formatter: (v) => '>' + v + '%'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 80,
          ticks: { callback: (v) => v + '%' },
          grid: { color: 'rgba(0,0,0,0.04)' }
        },
        x: {
          grid: { display: false },
          ticks: { font: { size: 13, weight: '600' } }
        }
      }
    }
  });
}

// ============================================================
// SECTION 4 CHARTS: Community Engagement
// ============================================================

function renderEventsChart() {
  const ctx = document.getElementById('chartEvents').getContext('2d');
  const events = NOCO_DATA.engagement.events.breakdown;
  const labels = Object.keys(events);
  const counts = labels.map(l => events[l].count);
  const attendees = labels.map(l => events[l].attendance);

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Number of Events',
          data: counts,
          backgroundColor: COLORS.forest,
          borderRadius: 6,
          barPercentage: 0.7,
          categoryPercentage: 0.6,
        },
        {
          label: 'Total Attendance',
          data: attendees,
          backgroundColor: COLORS.amber,
          borderRadius: 6,
          barPercentage: 0.7,
          categoryPercentage: 0.6,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: { font: { size: 12, weight: '500' } }
        },
        datalabels: {
          display: true,
          color: '#1A1A1A',
          font: { weight: '600', size: 12 },
          anchor: 'end',
          align: 'top',
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(0,0,0,0.04)' }
        },
        x: {
          grid: { display: false },
          ticks: { font: { size: 10 } }
        }
      }
    }
  });
}

function renderAssessmentReachChart() {
  const ctx = document.getElementById('chartAssessmentReach').getContext('2d');
  const scope = NOCO_DATA.engagement.assessmentScope;

  const labels = [
    'Community Survey',
    'El Mercado Community',
    'Producer Survey',
    'Focus Groups',
    'El Mercado Vendors',
    'FPC Interviews',
    'Policymaker Interviews'
  ];
  const values = [
    scope.communityResponses,
    scope.elMercadoAttendees,
    scope.producerResponses,
    scope.focusGroupAttendees,
    scope.elMercadoVendors,
    scope.fpcInterviews,
    scope.policymakerInterviews
  ];

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Participants / Responses',
        data: values,
        backgroundColor: CHART_PALETTE.slice(0, 7),
        borderRadius: 6,
        barPercentage: 0.6,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        legend: { display: false },
        datalabels: {
          display: true,
          color: '#1A1A1A',
          font: { weight: '700', size: 13, family: 'Outfit' },
          anchor: 'end',
          align: 'right',
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: { color: 'rgba(0,0,0,0.04)' }
        },
        y: {
          grid: { display: false },
          ticks: { font: { size: 11 } }
        }
      }
    }
  });
}

// ============================================================
// SECTION 5 CHARTS: Pilot Programs
// ============================================================

function renderPilotRevenueChart() {
  const ctx = document.getElementById('chartPilotRevenue').getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['ReKaivery\nFood Hub', 'Veg Out\nProgram', 'Poudre Valley\nProducers'],
      datasets: [{
        label: 'Economic Impact ($)',
        data: [142453, 84061, 26400],
        backgroundColor: [COLORS.purple, COLORS.forest, COLORS.amber],
        borderRadius: 8,
        barPercentage: 0.5,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        datalabels: {
          display: true,
          color: '#1A1A1A',
          font: { weight: '700', size: 14, family: 'Outfit' },
          anchor: 'end',
          align: 'top',
          formatter: (v) => '$' + (v / 1000).toFixed(1) + 'K'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (v) => '$' + (v / 1000) + 'K',
            font: { size: 11 }
          },
          grid: { color: 'rgba(0,0,0,0.04)' }
        },
        x: {
          grid: { display: false },
          ticks: { font: { size: 11, weight: '500' } }
        }
      }
    }
  });
}

function renderVegOutImpactChart() {
  const ctx = document.getElementById('chartVegOutImpact').getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [
        'Produce Diverted\n(lbs)',
        'Paid to Producers\n($)',
        'Food Bank Clients\nServed',
        'New Producers\nRecruited'
      ],
      datasets: [{
        label: 'Impact Metrics',
        data: [14514, 84061, 37000, 6],
        backgroundColor: [COLORS.sage, COLORS.forest, COLORS.amber, COLORS.mint],
        borderRadius: 8,
        barPercentage: 0.5,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        datalabels: {
          display: true,
          color: '#1A1A1A',
          font: { weight: '700', size: 13, family: 'Outfit' },
          anchor: 'end',
          align: 'top',
          formatter: (v) => {
            if (v >= 10000) return (v / 1000).toFixed(1) + 'K';
            if (v < 10) return v;
            return v.toLocaleString();
          }
        }
      },
      scales: {
        y: {
          display: false,
        },
        x: {
          grid: { display: false },
          ticks: { font: { size: 10 } }
        }
      }
    }
  });
}

// ============================================================
// SECTION 6 CHARTS: Action Plan
// ============================================================

function renderGoalAlignmentChart() {
  const ctx = document.getElementById('chartGoalAlignment').getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [
        'Goal 1: Elevate\nMarginalized Voices',
        'Goal 2: Increase\nFood Access',
        'Goal 3: Consumer\nEducation',
        'Goal 4: Support\nProducers'
      ],
      datasets: [
        {
          label: '🤲 Food Sovereignty & Access',
          data: [1, 1, 0, 0],
          backgroundColor: COLORS.purple,
          borderRadius: 4,
          barPercentage: 0.7,
          categoryPercentage: 0.65,
        },
        {
          label: '🗣️ Community Outreach & Education',
          data: [0, 1, 1, 0],
          backgroundColor: COLORS.amber,
          borderRadius: 4,
          barPercentage: 0.7,
          categoryPercentage: 0.65,
        },
        {
          label: '🌱 Production Growth & Land Access',
          data: [0, 0, 0, 1],
          backgroundColor: COLORS.forest,
          borderRadius: 4,
          barPercentage: 0.7,
          categoryPercentage: 0.65,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: { size: 12, weight: '500' },
            padding: 20,
          }
        },
        datalabels: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => ctx.parsed.y === 1
              ? `${ctx.dataset.label} — Aligned`
              : `${ctx.dataset.label} — Not primary focus`
          }
        }
      },
      scales: {
        y: {
          display: false,
          max: 1.3,
        },
        x: {
          grid: { display: false },
          ticks: {
            font: { size: 11, weight: '500' },
          }
        }
      }
    }
  });
}

// ============================================================
// EXPORT FUNCTIONS
// ============================================================

async function exportToPDF() {
  const btn = document.getElementById('btnPdf');
  const origText = btn.innerHTML;
  btn.innerHTML = '<span class="btn__icon">⏳</span> Generating...';
  btn.disabled = true;

  try {
    // Dynamically load html2pdf
    if (!window.html2pdf) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      document.head.appendChild(script);
      await new Promise((resolve) => { script.onload = resolve; });
    }

    const element = document.getElementById('dashboard-content');
    const opt = {
      margin: [10, 10, 10, 10],
      filename: 'NoCo_Foodshed_Data_Visualization.pdf',
      image: { type: 'jpeg', quality: 0.95 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a3', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    await html2pdf().set(opt).from(element).save();
  } catch (err) {
    console.error('PDF export failed:', err);
    alert('PDF export encountered an issue. Please try using your browser\'s Print to PDF (Ctrl/Cmd + P) as a fallback.');
  }

  btn.innerHTML = origText;
  btn.disabled = false;
}

function exportToExcel() {
  // Build CSV content with all data tables
  let csv = '';

  // Section 1
  csv += 'SECTION 1: NORTHERN COLORADO FOOD SYSTEM SNAPSHOT\n\n';
  csv += 'Metric,Value\n';
  csv += 'Local Food Sales 2012,$1.8M\n';
  csv += 'Local Food Sales 2017,$1.5M\n';
  csv += 'Larimer County Local Ag Receipts,1%\n';
  csv += 'Comparable Counties Low,5%\n';
  csv += 'Comparable Counties High,20%+\n';
  csv += 'Fort Collins Population Growth Since 2010,+30000\n';
  csv += 'Coloradans Lacking Food Access,1 in 3\n';
  csv += 'NoCo Foodshed Goal (2027),10%\n\n';

  // Section 2
  csv += 'SECTION 2: COMMUNITY SURVEY RESULTS (n=313)\n\n';
  csv += 'Community Priorities,% Rating Important\n';
  const p = NOCO_DATA.communitySurvey.priorities;
  p.labels.forEach((l, i) => csv += `"${l}",${p.importance[i]}%\n`);

  csv += '\nShopping by Income,Lower Income %,Higher Income %\n';
  const s = NOCO_DATA.communitySurvey.shoppingByIncome;
  s.categories.forEach((c, i) => csv += `"${c}",${s.lowerIncome[i]}%,${s.higherIncome[i]}%\n`);

  csv += '\nAffordability Gap\n';
  csv += 'Social Justice Priority,81%\n';
  csv += 'Environmental Sustainability Priority,78%\n';
  csv += 'Cannot Afford to Pay More,49%\n';
  csv += 'Not Interested in Paying More,22%\n';

  csv += '\nFood Label Interest,% Interested\n';
  const li = NOCO_DATA.communitySurvey.labelInterest;
  li.labels.forEach((l, i) => csv += `"${l}",${li.interest[i]}%\n`);
  csv += '\n';

  // Section 3
  csv += 'SECTION 3: PRODUCER SURVEY RESULTS (n=48)\n\n';
  csv += 'Producer Barriers,% Identifying Major Barrier\n';
  const pb = NOCO_DATA.producerSurvey.topBarriers;
  pb.labels.forEach((l, i) => csv += `"${l}",${pb.severity[i]}%\n`);

  csv += '\nWater Access Source,% of Producers\n';
  Object.entries(NOCO_DATA.producerSurvey.waterAccess.sources)
    .forEach(([k, v]) => csv += `"${k}",${v}%\n`);

  csv += '\nLand Tenure,Value\n';
  csv += `Own Land,${NOCO_DATA.producerSurvey.landTenure.ownLand}%\n`;
  csv += `Lease Land,${NOCO_DATA.producerSurvey.landTenure.leaseLand}%\n`;
  csv += `Single-Year Leases,${NOCO_DATA.producerSurvey.landTenure.singleYearLeases}%\n`;
  csv += `Avg Lease Rate,\$${NOCO_DATA.producerSurvey.landTenure.avgLeaseRate}/acre\n`;

  csv += '\nMarket Channels,% of Sales\n';
  const mc = NOCO_DATA.producerSurvey.marketChannels;
  mc.labels.forEach((l, i) => csv += `"${l}",${mc.percentSales[i]}%\n`);
  csv += '\n';

  // Section 4
  csv += 'SECTION 4: COMMUNITY ENGAGEMENT\n\n';
  csv += 'Engagement Metric,Value\n';
  csv += `Total Public Events,${NOCO_DATA.engagement.events.totalEvents}\n`;
  csv += `Total Attendance,${NOCO_DATA.engagement.events.totalAttendance}+\n`;
  csv += `Return Rate,${NOCO_DATA.engagement.events.returnRate}%\n`;
  csv += `Working Group Members,${NOCO_DATA.engagement.workingGroups.selected}\n`;
  csv += `WG Meetings Held,${NOCO_DATA.engagement.workingGroups.totalMeetings}\n`;
  csv += `Website Engagements,${NOCO_DATA.engagement.digital.websiteEngagements}\n`;
  csv += `Instagram Followers,${NOCO_DATA.engagement.digital.instagramFollowers}\n`;
  csv += `Partner Social Reach,${NOCO_DATA.engagement.digital.partnerReach}\n\n`;

  // Section 5
  csv += 'SECTION 5: PILOT PROGRAM IMPACT\n\n';
  csv += 'Program,Metric,Value\n';
  csv += 'Veg Out,Pounds Diverted,"14,514"\n';
  csv += 'Veg Out,Paid to Producers,"$84,061"\n';
  csv += 'Veg Out,New Producers Recruited,6\n';
  csv += 'Veg Out,Food Bank Clients Served,"37,000"\n';
  csv += 'PVP Farmers Pick,Sales to Morning Fresh,$15K+\n';
  csv += 'PVP Farmers Pick,Revenue to Farms,$11.4K+\n';
  csv += 'PVP Farmers Pick,Boxes/Week,60\n';
  csv += 'ReKaivery,Total Injected,"$142,453"\n';
  csv += 'ReKaivery,Customer Transactions,"6,606"\n';
  csv += 'ReKaivery,Vendors Supported,40+\n';
  csv += 'Sugar Beet,Subscribers,82\n';
  csv += 'Sugar Beet,Total Reads,746\n\n';

  csv += 'TOTAL COMBINED ECONOMIC IMPACT,$252913+\n';

  // Download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'NoCo_Foodshed_Data.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ============================================================
// SCROLL ANIMATIONS & NAV BEHAVIOR
// ============================================================

// Intersection Observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.05,
  rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));

// Navbar scroll behavior
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  // Navbar shadow
  navbar.classList.toggle('scrolled', window.scrollY > 20);

  // Scroll progress
  const winScroll = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById('scrollProgress').style.width = scrolled + '%';

  // Active nav link
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  document.querySelectorAll('[data-nav]').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// Counter animation for hero stats
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.getAttribute('data-count'));
    const duration = 1500;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      el.textContent = Math.round(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  });
}

// ============================================================
// INITIALIZE ALL CHARTS
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // Counter animation
  animateCounters();

  // Section 1
  renderSalesDeclineChart();
  renderLocalVsNationalChart();

  // Section 2
  renderPrioritiesChart();
  renderAffordabilityChart();
  renderShoppingIncomeChart();
  renderLabelsChart();
  renderFMBarriersChart();

  // Section 3
  renderProducerBarriersChart();
  renderWaterAccessChart();
  renderLandTenureChart();
  renderMarketChannelsChart();
  renderInfrastructureChart();
  renderAspiringBarriersChart();

  // Section 4
  renderEventsChart();
  renderAssessmentReachChart();

  // Section 5
  renderPilotRevenueChart();
  renderVegOutImpactChart();

  // Section 6
  renderGoalAlignmentChart();
});
