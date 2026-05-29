// ============================================================
// NoCo Foodshed Project — Data Visualization Data
// All data sourced from the RFSP Final Report (156 pages)
// ============================================================

const NOCO_DATA = {

  // ----------------------------------------------------------
  // SECTION 1: The Problem — Northern Colorado Food Snapshot
  // ----------------------------------------------------------
  foodSystemSnapshot: {
    // Source: Report p.69 — USDA NASS data
    localFoodSalesDecline: {
      labels: ['2012', '2017'],
      values: [1.8, 1.5], // in millions
      unit: 'million',
      description: 'Value of food sold directly to consumers in Larimer County'
    },

    // Source: Report p.69
    localVsNational: {
      larimer: 1.0, // percent
      comparableCountiesLow: 5,
      comparableCountiesHigh: 20,
      description: 'Larimer County local agricultural receipts vs. comparable US counties'
    },

    // Source: Report p.69
    populationGrowth: {
      since1990: 'More than doubled',
      since2010: 30000,
      description: 'Fort Collins population growth'
    },

    // Source: Report p.75 — Hunger Free Colorado 2021 survey
    foodInsecurity: {
      coloradoLackAccess: 33, // 1 in 3
      description: '1 in 3 Coloradans lack reliable access to nutritious food'
    },

    // Source: Report p.73
    vision: {
      target: 10, // percent
      targetYear: 2027,
      current: 1.0,
      description: 'Goal: >10% of local agricultural products marketed locally by 2027'
    }
  },

  // ----------------------------------------------------------
  // SECTION 2: Community Voice — Survey Findings (n=313)
  // ----------------------------------------------------------
  communitySurvey: {
    totalRespondents: 313,
    initialRespondents: 328,
    collectionPeriod: 'June 1 – July 31, 2023',
    languages: ['English', 'Spanish'],

    // Source: Report p.198, 506-512
    shoppingByIncome: {
      categories: [
        'Big-box / Supermarket',
        'Culturally Specific Stores',
        'Convenience Stores',
        'Food Bank / Pantry',
        'Farmers Market',
        'Farm Stand / CSA',
        'You-Pick'
      ],
      lowerIncome: [85, 40, 30, 35, 15, 8, 5],
      higherIncome: [70, 15, 10, 5, 55, 40, 20],
      description: 'Significant relationship between household income and food sources'
    },

    // Source: Report p.195, 199-201
    priorities: {
      labels: [
        'Working conditions & wages',
        'Animal treatment',
        'Environmental sustainability',
        'Health of food consumed',
        'Cost of food',
        'Food access programs',
        'Locally produced label'
      ],
      importance: [88, 85, 82, 80, 78, 65, 42],
      description: 'Community priorities — local origin ranked lower than social/environmental factors'
    },

    // Source: Report p.200, 516
    affordabilityGap: {
      socialJusticePriority: 81, // percent say top priority
      envSustainabilityPriority: 78,
      cantAffordMore: 49,
      notInterestedPayMore: 22,
      description: 'Gap between values and purchasing power'
    },

    // Source: Report p.199, 513-514
    labelInterest: {
      interestedInLabels: 75,
      labels: [
        'Humane animal treatment',
        'Worker pay & conditions',
        'Water quality protection',
        'Climate-appropriate crops',
        'Organic',
        'Fair Trade',
        'Locally produced'
      ],
      interest: [82, 78, 75, 68, 45, 40, 38],
      description: '75% want to know more about food labels'
    },

    // Source: Report p.515
    farmersMarketBarriers: {
      dontVisitOrUnwelcome: 33, // percent
      barriers: [
        'Language barriers',
        'Not available at accessible times',
        'Lack of information (when/where)',
        'Products too expensive',
        'Don\'t feel welcome'
      ],
      description: '1/3 of respondents don\'t visit farmers markets or don\'t feel welcome'
    },

    // Source: Report p.196-201
    keyThemes: [
      {
        title: 'Working Conditions',
        detail: 'Desire to learn about wages & conditions but difficulty finding information',
        icon: '👷'
      },
      {
        title: 'Income & Food Access',
        detail: 'Statistically significant relationship between income and food sources',
        icon: '💰'
      },
      {
        title: 'Food Labels',
        detail: '75% want more information — preferring humane, labor & water labels',
        icon: '🏷️'
      },
      {
        title: 'Affordability Gap',
        detail: '81% prioritize social justice but 49% can\'t afford to pay more',
        icon: '⚖️'
      },
      {
        title: 'Values Over "Local"',
        detail: 'Fair pay, sustainability & cultural foods valued over "locally produced"',
        icon: '🌎'
      }
    ]
  },

  // ----------------------------------------------------------
  // SECTION 3: Producer Landscape (n=48)
  // ----------------------------------------------------------
  producerSurvey: {
    totalResponses: 64,
    validResponses: 48,
    demographicResponses: 37,
    collectionPeriod: 'June 1 – August 15, 2023',

    // Source: Report p.167
    demographics: {
      race: {
        labels: ['White', 'Multiracial', 'Native American/Alaska Native'],
        values: [86, 8, 3]
      },
      gender: {
        female: 65,
        male: 35
      },
      age: {
        primaryRange: '25-45',
        percentInRange: 78,
        fullRange: '18 to 65+'
      },
      education: {
        bachelorOrHigher: 78
      },
      topZipCode: {
        code: '80524',
        percent: 35
      }
    },

    // Source: Report p.205, 537
    topBarriers: {
      labels: [
        'Long-term land & water access',
        'Marketing & selling products',
        'Processing space & equipment',
        'Business training & support',
        'Financial planning & grants',
        'Policy navigation'
      ],
      severity: [92, 85, 79, 72, 68, 60],
      description: 'Key barriers — business development ranked higher than production practices'
    },

    // Source: Report p.551
    landTenure: {
      ownLand: 57,
      leaseLand: 44, // some do both
      singleYearLeases: 70, // of those who lease
      avgLeaseLength: 4, // years
      avgLeaseRate: 445, // per acre
      leaseRateRange: { min: 0, max: 3000 },
      avgOwnedAcres: 260,
      ownedRange: { min: 1, max: 1500 },
      additionalServices: 73, // percent providing extra services to landlords
      services: {
        'Infrastructure upkeep': 27,
        'Mowing/haying': 22,
        'Irrigation management': 19
      }
    },

    // Source: Report p.553
    waterAccess: {
      sources: {
        'Surface water': 38,
        'Municipal water': 33,
        'Agricultural wells': 22,
        'Other': 7
      },
      ownWater: 33, // of those using surface water
      noStorage: 65,
      insufficientWater: 35,
      description: '33% use costly municipal water; 65% lack water storage'
    },

    // Source: Report p.545-547
    infrastructureNeeds: {
      labels: [
        'Storage space (cold/dry/frozen)',
        'Processing space & equipment',
        'Food hub / aggregation',
      ],
      veryImportant: [84, 79, 38],
      description: 'Infrastructure importance to business viability'
    },

    // Source: Report p.542-543
    marketChannels: {
      labels: [
        'Farmers Markets',
        'On-property farm stands',
        'CSA',
        'Local restaurants',
        'Distributors',
        'Institutions (schools/hospitals)'
      ],
      percentSales: [40, 15, 10, 8, 8, 5],
      description: '~30% through direct channels, only 13% to distributors/institutions'
    },

    // Source: Report p.550
    aspiringBarriers: {
      landWaterMajorBarrier: 65,
      currentOwnersConcerned: 45,
      description: '>65% of aspiring producers say land/water is a major barrier'
    },

    // Source: Report p.509
    foodAccessParticipation: {
      labels: [
        'Donations to food banks/pantries',
        'Accept SNAP',
        'Accept Double Up Food Bucks',
        'Accept WIC'
      ],
      values: [23, 15, 12, 8]
    }
  },

  // ----------------------------------------------------------
  // SECTION 4: Community Engagement
  // ----------------------------------------------------------
  engagement: {
    // Source: Report p.84-91
    partners: [
      { name: 'NoCo Foodshed Project', role: 'Lead Organization', abbr: 'FSP' },
      { name: 'The Growing Project', role: 'Food & Social Justice', abbr: 'TGP' },
      { name: 'The Family Center / La Familia', role: 'Community Access', abbr: 'TFC/LF' },
      { name: 'ReKaivery', role: 'Market Innovation', abbr: 'RK' },
      { name: 'Poudre Valley Community Farms', role: 'Land & Water Access', abbr: 'PVCF' },
      { name: 'CSU Extension', role: 'Technical Assistance', abbr: 'CSU' }
    ],

    // Source: Report p.107
    events: {
      totalEvents: 15,
      totalAttendance: 200,
      returnRate: 24,
      breakdown: {
        'NoCo Food System Mixers': { count: 8, attendance: 100 },
        'Community Convos Sessions': { count: 4, attendance: 60 },
        'Farm Hops': { count: 3, attendance: 40 }
      }
    },

    // Source: Report p.115
    digital: {
      websiteEngagements: 2600,
      monthlyAvgVisits: 144,
      instagramFollowers: 371,
      partnerReach: 8903,
      timeframe: '18 months'
    },

    // Source: Report p.116-138
    workingGroups: {
      applicants: 44,
      selected: 30,
      groups: 4,
      membersPerGroup: '6-8',
      totalMeetings: 36,
      meetingDuration: 1.5, // hours
      bilingualGroups: 3, // out of 4
      startDate: 'August 2022'
    },

    // Source: Report throughout
    assessmentScope: {
      communityResponses: 313,
      producerResponses: 48,
      elMercadoAttendees: 58,
      elMercadoVendors: 18,
      focusGroupAttendees: 34,
      policymakerInterviews: 9,
      fpcInterviews: 12
    },

    // Source: Report p.111
    specialEvents: {
      regionalConvening: { participants: 100, description: 'Largest regional participation in state' },
      expeditionColorado: { students: 200, description: '4th graders across Poudre School District' }
    }
  },

  // ----------------------------------------------------------
  // SECTION 5: Pilot Programs Impact
  // ----------------------------------------------------------
  pilotPrograms: {
    // Source: Report p.249
    vegOut: {
      name: 'Veg Out Program',
      period: 'May–October 2023',
      poundsDiverted: 14514,
      paidToProducers: 84061,
      newProducersRecruited: 6,
      foodBankClients: 37000, // estimated
      description: 'Diverted local produce to Food Bank clients while paying producers retail prices',
      quote: {
        text: 'This program has been an absolute game changer for our farm. The prices set by the Veg Out program give the Food Bank of Larimer County a wholesale discount while still compensating farmers well for the true cost of growing food in Colorado.',
        author: 'Gwen Cameron',
        org: 'Rancho Durazno'
      }
    },

    // Source: Report p.256
    poudreValleyProducers: {
      name: 'Poudre Valley Producers (Farmers\' Pick)',
      totalSalesMorningFresh: 15000,
      totalSalesFarms: 11400,
      boxesPerWeek: 60,
      farmsInvolved: 3,
      pageViews: 232,
      customerBase: 7000,
      season: 'May–October 2023',
      description: 'Multi-farm CSA through Morning Fresh Dairy\'s delivery platform'
    },

    // Source: Report p.259
    sugarBeet: {
      name: 'Sugar Beet Newsletter',
      subscribers: 82,
      totalReads: 746,
      duration: '10 months',
      platform: 'Substack',
      description: 'Local food system storytelling and awareness newsletter'
    },

    // Source: Report p.544
    rekaivery: {
      totalInjected: 142452.89,
      customerTransactions: 6606,
      vendors: 40,
      operatingMonths: 14,
      description: 'ReKaivery food consignment hub community impact'
    }
  },

  // ----------------------------------------------------------
  // SECTION 6: Community Action Priorities
  // ----------------------------------------------------------
  actionPlan: {
    goals: [
      {
        number: 1,
        title: 'Elevate & Empower Marginalized Voices',
        icon: '✊',
        color: '#7C3AED',
        actions: [
          {
            title: 'Implement a Food Equity & Policy Council',
            tactics: [
              'Implement Food Equity & Policy Council for Northern Colorado',
              'Facilitate buy-in from local municipalities & stakeholders',
              'Long-term organizational support (5+ years)'
            ],
            consumerImpact: 'Elevating & engaging marginalized voices; Increased connection with food system',
            producerImpact: 'Elevating marginalized producers; Increased understanding of diverse consumer needs'
          }
        ],
        pillar: ['Food Sovereignty & Access']
      },
      {
        number: 2,
        title: 'Increase Access to Local Foods',
        icon: '🥬',
        color: '#059669',
        actions: [
          {
            title: 'Increase SNAP/WIC/Double Up Food Buck outlets',
            tactics: [
              'Expand collaboration with big box stores & local retailers',
              'Increase collaboration & funding with food access organizations',
              'Government support to subsidize prices for producers'
            ],
            consumerImpact: 'Decreasing barriers to affordable & local food',
            producerImpact: 'Increased sales outlets; More consumer feedback'
          },
          {
            title: 'Increase outlets providing local products',
            tactics: [
              'Expand cooperation with big box grocery stores',
              'Develop novel market strategies (ReKaivery, Mobile Market)'
            ],
            consumerImpact: 'More autonomous food purchasing decisions',
            producerImpact: 'Increased awareness/reach in community'
          }
        ],
        pillar: ['Food Sovereignty & Access', 'Community Outreach & Education']
      },
      {
        number: 3,
        title: 'Increase Consumer Education & Awareness',
        icon: '📚',
        color: '#D97706',
        actions: [
          {
            title: 'Food curriculum in schools & afterschool programs',
            tactics: [
              'Enhance educational curriculum to include local food varieties',
              'Develop community understanding of "healthy" food',
              'Partner with school districts & existing programs'
            ],
            consumerImpact: 'Increased awareness of healthy & local food access',
            producerImpact: 'Collaborative development with educational systems'
          },
          {
            title: 'Tell the stories of local food producers',
            tactics: [
              'Public platform for storytelling in engaging, humanizing ways',
              'Program awareness campaigns of local resources',
              'Marketing campaigns: meet farmers, food access stories',
              'Resource guide of local producers & food businesses'
            ],
            consumerImpact: 'Interactive, responsive information in preferred formats',
            producerImpact: 'Increased brand awareness & business visibility'
          }
        ],
        pillar: ['Community Outreach & Education']
      },
      {
        number: 4,
        title: 'Support Diverse Local Producers',
        icon: '🌾',
        color: '#2563EB',
        actions: [
          {
            title: 'Hands-on educational opportunities for producers',
            tactics: [
              'Local production & sales resource guide',
              'Training programs targeting producer pipeline gaps',
              'Dynamic, multi-modal training options',
              'Peer-to-peer mentoring network'
            ],
            consumerImpact: 'More consistent local product access',
            producerImpact: 'Increased profit, efficiency & resilience'
          },
          {
            title: 'Processing & distribution infrastructure',
            tactics: [
              'Feasibility analysis for shared aggregation space',
              'Shared processing & storage for local producers'
            ],
            consumerImpact: 'Community access to cooperative food models',
            producerImpact: 'Increased sales to commercial & institutional markets'
          },
          {
            title: 'Increase land & water availability',
            tactics: [
              'Expand municipal & private landowner partnerships',
              'Build pipeline of land/water access for all producer stages',
              'Create spaces in underserved areas for community cultivation'
            ],
            consumerImpact: 'Conservation goals on public lands',
            producerImpact: 'Long-term land/water access for more producers'
          }
        ],
        pillar: ['Production Growth & Land Access']
      }
    ],

    pillars: [
      {
        name: 'Food Sovereignty & Access',
        icon: '🤲',
        color: '#7C3AED',
        description: 'Equitable food system prioritizing community health'
      },
      {
        name: 'Community Outreach & Education',
        icon: '🗣️',
        color: '#D97706',
        description: 'Inclusive strategies to educate and engage'
      },
      {
        name: 'Production Growth & Land Access',
        icon: '🌱',
        color: '#059669',
        description: 'Support production growth to meet demand'
      }
    ]
  }
};
