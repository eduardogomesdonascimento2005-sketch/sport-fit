# SportFit

Aplicativo completo de academia para gestão de alunos, treinos, agenda, pagamentos e evolução física.

## Visão geral

O SportFit é uma solução de gestão para academias com foco em:
- cadastro e acompanhamento de alunos
- criação e atribuição de treinos
- agenda de aulas e sessões
- controle de pagamentos e planos
- acompanhamento de evolução e dashboard operacional

## Stack utilizada

- Backend: Node.js + Express + TypeScript
- Frontend: React + Vite + TypeScript
- Estilo: CSS puro
- API: REST

## Estrutura do projeto

```text
sport-fit/
├── backend/
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── index.html
├── .gitignore
├── README.md
├── package.json
└── .env.example
```

## Requisitos

- Node.js 18+
- npm

## Instalação

Na raiz do projeto:

```bash
npm install --prefix backend
npm install --prefix frontend
```

## Executando localmente

Terminal 1 - backend:

```bash
npm --prefix backend run dev
```

Terminal 2 - frontend:

```bash
npm --prefix frontend run dev
```

O frontend será disponibilizado em:

```text
http://localhost:5173
```

A API estará em:

```text
http://localhost:3001
```

## Credenciais demo

```json
{
  "email": "admin@sportfit.com",
  "password": "123456"
}
```

## Endpoints principais

- `GET /api/health`
- `POST /api/auth/login`
- `GET /api/dashboard`
- `GET /api/students`
- `GET /api/workouts`
- `GET /api/schedule`
- `GET /api/payments`
- `GET /api/progress`

## Funcionalidades do MVP

- dashboard de desempenho
- gerenciamento de alunos
- criação de treinos
- agenda de aulas e sessões
- controle de pagamentos
- histórico de evolução
- autenticação mockada

## Próximos passos recomendados

- integração com banco PostgreSQL
- autenticação real com JWT
- upload de fotos e documentos
- painel para admin e personal trainer
- notificação por WhatsApp/Firebase
- versionamento de treinos

## Observação

Este projeto é uma base funcional e pronta para evolução, ideal para apresentar a ideia do aplicativo e partir para desenvolvimento completo.
