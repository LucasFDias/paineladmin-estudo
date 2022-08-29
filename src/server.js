import "dotenv/config";

import "./database";

 


import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AminJSSequelize from "@adminjs/sequelize";
import express from 'express';

import UsersResource from "./resources/UsersResource";
import ProjetsResource from "./resources/ProjetsResource";
import TasksResource from "./resources/TasksResource";

import User from "./models/user";


import locale from "./locales";
import theme from "./theme";


AdminJS.registerAdapter(AminJSSequelize);

const app = express();

const adminJS = new AdminJS({
    databases: [],
    rootPath: '/admin',
    dashboard: {
        component: AdminJS.bundle('./components/dashboard/index.jsx'),
    },
    resources: [UsersResource, ProjetsResource, TasksResource],
    branding: {
        companyName: "Lucas Dias",
        logo: false,
        softwareBrothers: false,
        theme,
    },
    ...locale,
});



// const router = AdminJSExpress.buildRouter(adminJS);
const router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
    authenticate: async (email, password) => {
        const user = await User.findOne({ email });
        
        if(user) {
           const matched = await user.checkPassword(password)
            if(matched) {
                return user;
            }
        }
        return false;
    },
    cookiePassword: process.env.SECRET,
});


app.use(adminJS.options.rootPath, router);
app.listen(5000, ()=>{
    console.log("AdminJS is under http://localhost:5000/admin");
})