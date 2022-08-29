import * as path from 'path'; 
import path from 'path';

import AdminJS from 'adminjs';

import uploadFeature from "@adminjs/upload";
import Task from '../models/task'; 
  
 
 
const { BaseProvider } = require( '@adminjs/upload');
class MyProvider extends BaseProvider{
    constructor(){
        super('uploads');
    }
}

export default {
    resource: Task,
    options:{ 
        parent: {
            icon: "Task",
        },
        properties: {
            id: {
                position: 1,
            }, 
            title: {
                position: 2,
                isRequired: true,
            },
            description:{
                position: 3, 
                isVisible: { list: false, filter: false, show: true, edit: true},
                type: "richtext",
                props: {
                    quill: {
                        modules: {
                            toolbar: [
                                ["bold", "italic"],
                                ["link", "image"],
                            ],
                        },
                    },
                },
            },
            due_date:{
                position: 4,
            },
            effort: {
                position: 5, 
            },
            order: {
                position: 6,
            },
            status: {
                position: 7,
                isRequired: true,
                availableValues: [

                    { value: "backlog", label: "Na fila"},
                    { value: "doing", label:"Em Execução"},
                    { value: "done", label: "Pronto"},
                    { value: "approved", label: "Aprovado"},
                    { value:"rejected", label: "Rejeitado"},
                ],
            },
            projectId:{
                position: 8,
                isRequired: true,
                isVisible: { list: false, filter: true, show: true, edit: true},
            },
            userId:{
                position: 9,
                isRequired: true,
            },
            createdAt:{
                position: 10,
                isVisible: { list: true, filter: true, show: true, edit: false },
            },
            updatedAt:{
                position: 11,
                isVisible: { list: true, filter: true, show: true, edit: false },
            }, 
            attachment: {
                position: 12,
            },
            user_id:{
                isVisible: false,
            },
            project_id:{
                isVisible: false,
            },
            path:{
                isVisible: false,
            },
            folder: {
                isVisible: false,
            },
            type: {
                isVisible: false,
            },
            filename: {
                isVisible: false,
            },
            size: {
                isVisible: false,
            }
        },
    },
    features: [
        uploadFeature({
            provider:{
                local: {
                    bucket: path.join(__dirname, "../../uploads")
                }
            },
            properties: { 
                key: 'path',
                bucket: 'folder',
                mimeType: 'type', 
                size: 'size',
                filename: 'filename',
                file: 'attachment',
            },
            validation:{
                mimeTypes: [ "image/png", "image/jpeg", "application/pdf"],
                maxSize: 15 * 1024 * 1024,
            } ,
        }),
    ] ,
};

