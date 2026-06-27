# TaskFlow

Plataforma SaaS de gerenciamento de tarefas com board Kanban, construída com Next.js, TypeScript, Prisma e Neon PostgreSQL.

![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-7.0-2D3748?style=flat-square&logo=prisma)

## Sobre o projeto

O TaskFlow é uma aplicação de gerenciamento de tarefas inspirada em ferramentas como Linear e Jira. Permite criar, editar, remover e organizar tarefas em um board Kanban com drag and drop, além de oferecer um dashboard com métricas e gráficos.

## Funcionalidades

- Autenticação com JWT (registro, login e logout)
- Dashboard com métricas, gráfico de status e tarefas urgentes
- Board Kanban com drag and drop entre colunas
- Lista de tarefas com filtros por status
- Criar, editar e remover tarefas
- Página de detalhe da tarefa
- Feedback visual com toasts
- Layout responsivo para mobile
- Proteção de rotas via middleware

## Tecnologias

### Frontend
- [Next.js 15](https://nextjs.org/) — framework React com App Router
- [TypeScript](https://www.typescriptlang.org/) — tipagem estática
- [Tailwind CSS 4](https://tailwindcss.com/) — estilização
- [Zustand](https://zustand-demo.pmnd.rs/) — estado global
- [TanStack Query](https://tanstack.com/query) — cache e sincronização de dados
- [Axios](https://axios-http.com/) — cliente HTTP
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) — formulários e validação
- [@dnd-kit](https://dndkit.com/) — drag and drop
- [Recharts](https://recharts.org/) — gráficos
- [Sonner](https://sonner.emilkowal.ski/) — toasts
- [React Icons](https://react-icons.github.io/react-icons/) — ícones

### Backend
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) — endpoints REST
- [Prisma 7](https://www.prisma.io/) — ORM
- [Neon](https://neon.tech/) — PostgreSQL serverless
- [bcrypt](https://github.com/dcodeIO/bcrypt) — hash de senhas
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) — autenticação JWT

## Arquitetura

```
src/
├── app/
│   ├── (auth)/         # Páginas públicas (login, register)
│   ├── (private)/      # Páginas protegidas (dashboard, board, tasks)
│   └── api/            # API Routes (auth, tasks)
├── components/         # Componentes reutilizáveis
├── features/           # Módulos por funcionalidade
├── hooks/              # Custom hooks
├── services/           # Chamadas HTTP com Axios
├── stores/             # Estado global com Zustand
├── schemas/            # Schemas de validação com Zod
├── types/              # Interfaces e tipos TypeScript
├── constants/          # Valores fixos da aplicação
├── data/               # Dados mockados
└── utils/              # Funções utilitárias
```

## Como rodar localmente

### Pré-requisitos

- Node.js 20+
- Conta no [Neon](https://neon.tech/) para o banco de dados

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/taskflow-interface.git

# Acesse a pasta
cd taskflow-interface

# Instale as dependências
npm install
```

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="sua-connection-string-do-neon"
JWT_SECRET="sua-chave-secreta"
```

### Banco de dados

```bash
# Gere o Prisma Client
npx prisma generate

# Rode as migrations
npx prisma migrate dev
```

### Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Testes

O projeto possui testes unitários cobrindo a lógica principal da aplicação.

### Tecnologias

- [Jest](https://jestjs.io/) — test runner
- [ts-jest](https://kulshekhar.github.io/ts-jest/) — suporte a TypeScript
- [Testing Library](https://testing-library.com/) — testes de hooks React

### Cobertura

| Arquivo | O que testa |
|---|---|
| `useTaskStore` | Todas as actions da store (add, remove, update, updateStatus) |
| `useTaskFilter` | Lógica de filtro por status |
| `useTaskMetrics` | Cálculo de métricas e tarefas urgentes |
| `authSchema` | Validações de login e registro |
| `taskSchema` | Validações do formulário de tarefas |
| `taskService` | Chamadas HTTP (fetchTasks, createTask, updateTask, deleteTask) |

### Rodar os testes

```bash
# Rodar todos os testes
npm test

# Rodar em modo watch
npm run test:watch
```

## Deploy

O projeto está configurado para deploy na [Vercel](https://vercel.com) com banco de dados no [Neon](https://neon.tech/).

Adicione as variáveis de ambiente `DATABASE_URL` e `JWT_SECRET` nas configurações do projeto na Vercel.
