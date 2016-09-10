module.exports = [
  {
    name: '首頁',
    link: '/',
    icon: 'fa-home'
  },
  {
    name: '系統設置',
    icon: 'fa-sliders',
    child: [
      {
        name: '角色設定',
        link: '/',
        icon: 'fa-circle-o'
      },
      {
        name: '權限設定',
        link: '/',
        icon: 'fa-circle-o'
      },
      {
        name: '站別設定',
        link: '/',
        icon: 'fa-circle-o'
      },
      {
        name: '黑名單設定',
        link: '/',
        icon: 'fa-circle-o'
      }
    ]
  },
  {
    name: '帳號管理',
    icon: 'fa-users',
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
        link: '/',
        icon: 'fa-circle-o'
      }
    ]
  },
  {
    name: '遊戲管理',
    icon: 'fa-gamepad',
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
    name: '帳務管理',
    icon: 'fa-server',
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
    icon: 'fa-comments',
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
    name: '報表查詢',
    icon: 'fa-bar-chart',
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
    name: '網站設定',
    icon: 'fa-cogs',
    child: [
      {
        name: '版面設定',
        link: '/',
        icon: 'fa-circle-o'
      },
      {
        name: '系統公告',
        link: '/',
        icon: 'fa-circle-o'
      },
      {
        name: '活動訊息',
        link: '/',
        icon: 'fa-circle-o'
      }
    ]
  },
  {
    name: '歷程紀錄',
    icon: 'fa-history',
    child: [
      {
        name: '登入紀錄',
        link: '/',
        icon: 'fa-circle-o'
      },
      {
        name: '帳務歷程',
        link: '/',
        icon: 'fa-circle-o'
      }
    ]
  },
  {
    name: 'UI Elements',
    icon: 'fa-circle-o',
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
