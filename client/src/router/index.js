import Vue from "vue";
import VueRouter from "vue-router";

// 路由实例化
Vue.use(VueRouter);

const routes = [{
    // 咨询页面路由
    path: "/consult",
    name: "Consult",
    component: () =>
      import("../views/consultViews/Consult.vue")
  },
  {
    // 文件相关路由
    path: "/file",
    name: "File",
    component: () =>
      import("../views/fileViews/FileView.vue"),
    children: [{
        path: "",
        name: "File",
        component: () =>
          import("../views/fileViews/File.vue")
      },
      {
        path: "download",
        name: "FileDownload",
        component: () =>
          import("../views/fileViews/FileDownload.vue")
      },
      {
        path: "upload",
        name: "FileUpload",
        component: () =>
          import("../views/fileViews/FileUpload.vue")
      }
    ]
  },
  {
    // 主页路由
    path: "/",
    name: "Home",
    component: () =>
      import("../views/homeViews/Home.vue")
  },
  {
    // 专利知识相关路由
    path: "/knowledge",
    name: "Knowledge",
    component: () =>
      import("../views/knowledgeViews/KnowledgeView.vue"),
    children: [{
        path: "",
        name: "Knowledge",
        component: () =>
          import("../views/knowledgeViews/Knowledge.vue")
      },
      {
        path: "details",
        name: "KnowledgeDetails",
        component: () =>
          import("../views/knowledgeViews/KnowledgeDetails.vue")
      }
    ]
  },
  {
    // 法律法规相关路由
    path: "/law",
    name: "Law",
    component: () =>
      import("../views/lawViews/LawView.vue"),
    children: [{
      path: "",
      name: "Law",
      component: () =>
        import("../views/lawViews/Law.vue")
    }]
  },
  {
    // 管理相关路由
    path: "/manage",
    name: "Manage",
    component: () =>
      import("../views/manageViews/ManageView.vue"),
    children: [{
        path: "",
        name: "Manage",
        component: () =>
          import("../views/manageViews/Manage.vue")
      },
      {
        path: "knowledgeAdd",
        name: "knowledgeAdd",
        component: () =>
          import("../views/manageViews/addViews/KnowledgeAdd.vue")
      },
      {
        path: "lawAdd",
        name: "lawAdd",
        component: () =>
          import("../views/manageViews/addViews/LawAdd.vue")
      },
      {
        path: "newsAdd",
        name: "newsAdd",
        component: () =>
          import("../views/manageViews/addViews/NewsAdd.vue")
      },
      {
        path: "fileChange",
        name: "FileChange",
        component: () =>
          import("../views/manageViews/changeViews/FileChange.vue")
      },
      {
        path: "knowledgeChange",
        name: "KnowledgeChange",
        component: () =>
          import("../views/manageViews/changeViews/KnowledgeChange.vue")
      },
      {
        path: "lawChange",
        name: "LawChange",
        component: () =>
          import("../views/manageViews/changeViews/LawChange.vue")
      },
      {
        path: "newsChange",
        name: "NewsChange",
        component: () =>
          import("../views/manageViews/changeViews/NewsChange.vue")
      },
      {
        path: "patentChange",
        name: "PatentChange",
        component: () =>
          import("../views/manageViews/changeViews/PatentChange.vue")
      },
      {
        path: "userChange",
        name: "UserChange",
        component: () =>
          import("../views/manageViews/changeViews/UserChange.vue")
      },
      {
        path: "file",
        name: "ManageFile",
        component: () =>
          import("../views/manageViews/ManageFile.vue")
      },
      {
        path: "knowledge",
        name: "ManageKnowledge",
        component: () =>
          import("../views/manageViews/ManageKnowledge.vue")
      },
      {
        path: "law",
        name: "ManageLaw",
        component: () =>
          import("../views/manageViews/ManageLaw.vue")
      },
      {
        path: "news",
        name: "ManageNews",
        component: () =>
          import("../views/manageViews/ManageNews.vue")
      },
      {
        path: "patent",
        name: "ManagePatent",
        component: () =>
          import("../views/manageViews/ManagePatent.vue")
      },
      {
        path: "user",
        name: "ManageUser",
        component: () =>
          import("../views/manageViews/ManageUser.vue")
      }
    ]
  },
  {
    // 新闻相关路由
    path: "/news",
    name: "News",
    component: () =>
      import("../views/newsViews/NewsView.vue"),
    children: [{
      path: "",
      name: "News",
      component: () =>
        import("../views/newsViews/News.vue")
    }, {
      path: "details",
      name: "NewsDetails",
      component: () =>
        import("../views/newsViews/NewsDetails.vue")
    }]
  },
  {
    // 专利相关路由 
    path: "/patent",
    name: "Patent",
    component: () =>
      import("../views/patentViews/PatentView.vue"),
    children: [{
        path: "",
        name: "Patent",
        component: () =>
          import("../views/patentViews/Patent.vue")
      }, {
        path: "apply",
        name: "PatentApply",
        component: () =>
          import("../views/patentViews/PatentApply.vue")
      },
      {
        path: "details",
        name: "PatentDetails",
        component: () =>
          import("../views/patentViews/PatentDetails.vue")
      }
    ]
  },
  {
    // 登录路由
    path: "/login",
    name: "Login",
    component: () =>
      import("../views/userViews/Login.vue")
  },
  {
    // 注册路由
    path: "/register",
    name: "Register",
    component: () =>
      import("../views/userViews/Register.vue")
  },
  {
    // 空间路由
    path: "/space",
    name: "Space",
    component: () =>
      import("../views/userViews/space/Space.vue"),
    children: [{
        path: "",
        name: "MyInfo",
        component: () =>
          import("../views/userViews/space/MyInfo.vue")
      },
      {
        path: "infoChange",
        name: "InfoChange",
        component: () =>
          import("../views/userViews/space/InfoChange.vue")
      },
      {
        path: "myFile",
        name: "MyFile",
        component: () =>
          import("../views/userViews/space/MyFile.vue")
      },
      {
        path: "myInfo",
        name: "MyInfo",
        component: () =>
          import("../views/userViews/space/MyInfo.vue")
      },
      {
        path: "myPatent",
        name: "MyPatent",
        component: () =>
          import("../views/userViews/space/MyPatent.vue")
      }
    ]
  }
];

const router = new VueRouter({
  //更改为history模式，消除哈希模式的#号
  mode: 'history',
  routes
});

export default router;
