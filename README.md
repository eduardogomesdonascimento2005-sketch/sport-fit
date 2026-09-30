# SportFit

Aplicativo de academia para gestão de alunos, treinos, agendamentos, mensalidades e acompanhamento de evolução física.

## 1. Objetivo do produto

O SportFit é uma solução digital para academias que centraliza a gestão de membros, planejamento de treinos, agenda de aulas e acompanhamento de desempenho. O objetivo é melhorar a rotina de professores, personal trainers e administradores, além de oferecer uma experiência clara e motivadora para os alunos.

## 2. Público-alvo

- Academias de pequeno e médio porte
- Personal trainers e instrutores
- Administradores e recepção
- Alunos e clientes de treinos personalizados

## 3. Personas principais

### 3.1 Administrador da academia
- Gerencia membros, planos e pagamentos
- Acompanha faturamento e presença
- Configura treinos e aulas

### 3.2 Personal trainer
- Cria e ajusta treinos
- Acompanha progresso dos clientes
- Agenda sessões e avalia desempenho

### 3.3 Aluno
- Consulta treinos e aulas
- Visualiza progresso e metas
- Agenda horários e acompanha pagamentos

## 4. Escopo funcional

### 4.1 Autenticação e usuários
- Cadastro de usuários com perfil de administrador, instrutor ou aluno
- Login com email/senha
- Recuperação de senha
- Perfil do usuário com foto, dados pessoais e permissões

### 4.2 Gestão de alunos
- Cadastro de alunos com nome, idade, objetivo, altura, peso e histórico
- Busca por aluno
- Status ativo/inativo
- Histórico de treinos e presença
- Observações do personal

### 4.3 Treinos
- Criação de treinos por objetivo (emagrecimento, hipertrofia, condicionamento, etc.)
- Definição de exercícios com:
  - nome
  - grupo muscular
  - série
  - repetição
  - carga
  - descanso
  - observações
- Atribuição de treino a um aluno
- Edição e histórico de versões
- Marcação de treino concluído

### 4.4 Agenda e agendamentos
- Agenda de aulas e treinos
- Agendamento de sessões individuais
- Confirmação/ cancelamento de agendamentos
- Visualização por dia, semana e mês
- Lembretes de treino e aula

### 4.5 Pagamentos e planos
- Cadastro de planos de assinatura
- Controle de mensalidades
- Histórico de pagamentos
- Status em dia/atrasado
- Notificações de cobrança

### 4.6 Acompanhamento de evolução
- Registro de peso, medida corporal e desempenho
- Gráficos de progresso
- Evolução por período
- Comparativo entre avaliações

### 4.7 Presença e frequências
- Registro de presença em aulas ou treinos
- Relatório de frequência por aluno
- Estatísticas de comparecimento

### 4.8 Dashboard
- Resumo geral da academia
- Número de alunos ativos
- Faturamento do mês
- Aulas e treinos do dia
- Alunos com pendências

### 4.9 Notificações
- Lembrete de treino
- Lembrete de aula
- Avisos de pagamento
- Mensagens para alunos e instrutores

## 5. Regras de negócio principais

- Cada aluno pode ter apenas um plano ativo por vez
- Cada treino pode ser atribuído a vários alunos
- A personalização do treino pode variar conforme objetivo e evolução
- O administrador pode visualizar todas as informações e permissões gerais
- Alunos podem visualizar apenas seus dados e treinos
- Instrutores podem gerenciar os alunos vinculados a eles

## 6. Funcionalidades do MVP

### MVP (versão inicial)
- Login e cadastro de usuários
- Cadastro de alunos
- Criação de treinos
- Atribuição de treino ao aluno
- Agenda de aulas e treinos
- Registro de pagamentos
- Dashboard básico
- Perfil de usuário

## 7. Funcionalidades futuras

- App mobile para Android/iOS
- Chat entre aluno e personal trainer
- Integração com WhatsApp
- Módulo de marketing e campanhas
- Integração com cartão e Pix
- IA para recomendação de treinos
- Relatórios em PDF e exportação

## 8. Arquitetura proposta

### Backend
- Node.js com NestJS ou Express
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT para autenticação
- REST API

### Frontend
- React + Vite para web
- React Native para mobile
- Expo para desenvolvimento mobile

### Infraestrutura
- PostgreSQL em produção
- Firebase para notificações
- Deploy em Vercel/Render

## 9. Estrutura de dados principal

### Entidades
- User
- Student
- Trainer
- Plan
- Payment
- Workout
- Exercise
- Schedule
- Attendance
- ProgressRecord
- Notification

## 10. Telas sugeridas

### Web/admin
- Login
- Dashboard
- Alunos
- Treinos
- Agendamento
- Pagamentos
- Relatórios
- Configurações

### Mobile/aluno
- Login
- Home
- Meus treinos
- Agenda
- Progresso
- Pagamento
- Perfil

## 11. Critérios de aceitação

- O administrador consegue cadastrar e editar alunos
- O professor consegue criar treinos personalizados
- O aluno consegue visualizar seus exercícios e agenda
- O sistema registra pagamentos e mostra status do plano
- O dashboard apresenta dados atualizados em tempo real
- A aplicação funciona em navegadores modernos e dispositivos móveis

## 12. Roadmap inicial

### Fase 1 - MVP
- Autenticação
- Gestão de alunos
- Treinos
- Agenda
- Pagamentos

### Fase 2 - Melhorias operacionais
- Dashboard detalhado
- Presença
- Gráficos de evolução
- Lembretes automáticos

### Fase 3 - Escala e diferenciação
- Mobile nativo
- App para aluno e instrutor
- Notificações inteligentes
- Relatórios avançados

## 13. Proposta de branding

Nome: SportFit

Tagline: Treine melhor. Evolua todos os dias.

Visual: moderno, energético e motivador, com paleta que combine:
- verde fitness
- preto premium
- branco limpo
- cinza elegante

## 14. Resumo Executivo

O SportFit é uma plataforma completa para gestão de academias, com foco em praticidade para os administradores, apoio para instrutores e melhor experiência para os alunos. O produto possibilita organização operacional, acompanhamento de evolução e maior retenção de clientes por meio de dados e automação.

---

Se quiser, posso seguir para a próxima etapa e criar a estrutura inicial do projeto com:
- frontend em React
- backend em Node.js/NestJS
- banco de dados PostgreSQL
- autenticação JWT
- organização de pastas e arquivos
