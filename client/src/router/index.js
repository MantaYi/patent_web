import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
    path: "/consult",
    name: "Consult",
    component: () =>
      import("../views/consultViews/Consult.vue")
  },
  {
    path: "/file",
    name: "File",
    component: () =>
      import("../views/fileViews/File.vue"),
    children: [{
        path: "details",
        name: "FileDetails",
        component: () =>
          import("../views/fileViews/FileDetails.vue")
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
    path: "/",
    name: "Home",
    component: () =>
      import("../views/homeViews/Home.vue")
  },
  {
    path: "/knowledge",
    name: "Knowledge",
    component: () =>
      import("../views/knowledgeViews/Knowledge.vue"),
    children: [{
      path: "details",
      name: "KnowledgeDetails",
      component: () =>
        import("../views/knowledgeViews/KnowledgeDetails.vue")
    }]
  },
  {
    path: "/law",
    name: "Law",
    component: () =>
      import("../views/lawViews/Law.vue"),
    children: [{
      path: "details",
      name: "LawDetails",
      component: () =>
        import("../views/lawViews/LawDetails.vue")
    }]
  },
  {
    path: "/manage",
    name: "Manage",
    component: () =>
      import("../views/manageViews/Manage.vue"),
    children: [{
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
    path: "/news",
    name: "News",
    component: () =>
      import("../views/newsViews/News.vue"),
    children: [{
      path: "details",
      name: "NewsDetails",
      component: () =>
        import("../views/newsViews/NewsDetails.vue")
    }]
  },
  {
    path: "/patent",
    name: "Patent",
    component: () =>
      import("../views/patentViews/Patent.vue"),
    children: [{
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
    path: "/login",
    name: "Login",
    component: () =>
      import("../views/userViews/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import("../views/userViews/Register.vue")
  },
  {
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
  mode: 'history',
  routes
});

export default router;
