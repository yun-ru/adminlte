module.exports = [
  {
    name: '首頁',
    link: '/',
    icon: 'fa-home'
  },
  {
    name: '系統設定',
    icon: 'fa-bars',
    child: [
      {
        name: '角色設定',
        link: '/base/role',
        icon: 'fa-circle-o'
      },
      {
        name: '權限設定',
        link: '/base/permission',
        icon: 'fa-circle-o'
      },
      {
        name: '金流設定',
        link: '/base/currency',
        icon: 'fa-circle-o'
      },
      {
        name: '指定收款',
        link: '/base/payment',
        icon: 'fa-circle-o'
      }
    ]
  },
  {
    name: '人員管理',
    icon: 'fa-bars',
    child: [
      {
        name: '站長',
        link: '/member/0',
        icon: 'fa-circle-o'
      },
      {
        name: '大總監',
        link: '/member/1',
        icon: 'fa-circle-o'
      },
      {
        name: '總監',
        link: '/member/2',
        icon: 'fa-circle-o'
      },
      {
        name: '大股東',
        link: '/member/3',
        icon: 'fa-circle-o'
      },
      {
        name: '股東',
        link: '/member/4',
        icon: 'fa-circle-o'
      },
      {
        name: '總代理',
        link: '/member/5',
        icon: 'fa-circle-o'
      }
      ,
      {
        name: '代理商',
        link: '/member/6',
        icon: 'fa-circle-o'
      }
      ,
      {
        name: '會員',
        link: '/member/7',
        icon: 'fa-circle-o'
      }
      ,
      {
        name: '客服',
        link: '/member/service',
        icon: 'fa-circle-o'
      }
      ,
      {
        name: '登入歷程',
        link: '/member/login-log',
        icon: 'fa-circle-o'
      }
    ]
  },
  {
    name: '遊戲管理',
    icon: 'fa-bars',
    child: [
      {
        name: '平台設定',
        link: '/',
        icon: 'fa-circle-o'
      },
      {
        name: '遊戲管理',
        link: '/',
        icon: 'fa-circle-o'
      }
    ]
  },
  {
    name: '訂單操作',
    icon: 'fa-bars',
    child: [
      {
        name: '儲值',
        link: '/',
        icon: 'fa-circle-o'
      },
      {
        name: '轉移',
        link: '/',
        icon: 'fa-circle-o'
      },
      {
        name: '提領',
        link: '/',
        icon: 'fa-circle-o'
      },
      {
        name: '紅利贈點',
        link: '/',
        icon: 'fa-circle-o'
      }
    ]
  },
  {
    name: '訊息管理',
    icon: 'fa-bars',
    child: [
      {
        name: '站內訊息',
        link: '/',
        icon: 'fa-circle-o'
      },
      {
        name: '簡訊發送',
        link: '/',
        icon: 'fa-circle-o'
      }
    ]
  },
  {
    name: '黑名單',
    icon: 'fa-bars',
    child: [
      {
        name: '銀行',
        link: '/',
        icon: 'fa-circle-o'
      },
      {
        name: '電話',
        link: '/',
        icon: 'fa-circle-o'
      },
      {
        name: 'IP',
        link: '/',
        icon: 'fa-circle-o'
      }
    ]
  },
  {
    name: '交易查詢',
    icon: 'fa-bars',
    child: [
      {
        name: '營運報表',
        link: '/',
        icon: 'fa-circle-o'
      },
      {
        name: '遊戲報表',
        link: '/',
        icon: 'fa-circle-o'
      }
    ]
  },
  {
    name: '前台設定',
    icon: 'fa-bars',
    child: [
      {
        name: '公用版面',
        link: '/',
        icon: 'fa-circle-o'
      },
      {
        name: '代理商版面',
        link: '/',
        icon: 'fa-circle-o'
      },
      {
        name: '系統公告',
        link: '/',
        icon: 'fa-circle-o'
      }
    ]
  },
  {
    name: 'UI Elements',
    icon: 'fa-bars',
    child: [
      {
        name: 'General',
        link: '/ui/general',
        icon: 'fa-circle-o'
      },
      {
        name: 'Icons',
        link: '/ui/icons',
        icon: 'fa-circle-o'
      },
      {
        name: 'Buttons',
        link: '/ui/buttons',
        icon: 'fa-circle-o'
      }
    ]
  }
]
