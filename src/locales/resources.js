const commonProps = {
    status: "Situação",
    createdAt: "Criação",
    updatedAt: "Atualização",
};

export default {
    users: { 
        actions:{
            resetPassword: 'Redefinir Senha',
        },
        properties:{
            id: 'ID',
            initials: 'Iniciais',
            name: 'Nome',
            email: 'Email',
            password: 'Senha',
            passwordHash: 'Senha criptografada',
            role: 'Perfil',
            ...commonProps,
        },
    },
    projects:{ 
        properties:{
            id: 'ID',
            name: 'Nome',
            description: 'Descrição',
            userId: 'Responsável',
            ...commonProps,
        }
    },
    tasks: {
        properties: {
            id: "ID",
            due_date: "Data de Entrega",
            effort: "Esforço",
            title: "Título",
            description: "Descrição",
            order: "Prioridade",
            attachment: "Anexo",
            projectId: "Projeto",
            userId: "Responsável",
            ...commonProps,
        },
    },
};