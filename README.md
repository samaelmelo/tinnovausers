# Tinnova Users - Frontend Challenge

Este projeto foi desenvolvido como parte do processo seletivo para vaga de Desenvolvedor Front-end na Tinnova.
Consiste em uma aplicação React com duas telas principais: um **formulário de cadastro de usuários** e uma **listagem de usuários com funcionalidades de edição e exclusão**.


## 🖼️ Projeto

### Tela de Cadastro

![Tela de Cadastro](./src/assets/Screenshot%202025-05-17%20at%2015.02.50.png)

### Tela de Listagem

![Tela de Listagem](./src/assets/Screenshot%202025-05-17%20at%2015.03.01.png)


---

## 📚 Tecnologias Utilizadas

- **React 19**
- **TypeScript**
- **Vite** (ambiente de build e desenvolvimento)
- **SCSS Modules** (estilização por componente)
- **React Router DOM v7** (roteamento entre as telas)
- **React Hook Form + Yup** (formulários e validação)
- **React Toastify** (notificações de sucesso/erro)
- **Vitest + Testing Library** (testes unitários)
- **uuid** (gerador de IDs para os usuários)

---

## 🛠️ Funcionalidades

Este projeto utiliza o **localStorage** como mecanismo principal de persistência de dados no navegador, garantindo que os usuários cadastrados permaneçam salvos mesmo após atualizações de página ou reinicialização do navegador.

- ✏️ Cadastro de novos usuários com validações
- 📃 Listagem de usuários com dados vindos da API e persistidos no **localStorage**
- ✂️ Edição de dados do usuário
- ❌ Exclusão de usuários com confirmação
- ✨ Interface responsiva e estilizada 
- ✅ Testes unitários para componentes-chave

---

## 📡 Chamada à API (apenas uma vez)

Ao acessar a tela de listagem de usuários pela primeira vez, o sistema faz uma **requisição GET** à API `https://private-9d65b3-tinnova.apiary-mock.com/users` para obter uma lista inicial de usuários.

Essa chamada só ocorre **uma única vez**, controlada por uma flag `users_loaded` armazenada no `localStorage`. Após o primeiro carregamento:

- Os dados da API são mesclados com o que estiver salvo localmente
- A flag impede chamadas subsequentes, mesmo com reloads
- Toda leitura posterior considera apenas o `localStorage`

Esse mecanismo garante que os dados da API sirvam apenas como **dados iniciais** e preserva o controle local do estado da aplicação.


---

## 🚀 Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/samaelmelo/tinnovausers
cd tinnova-users
```

### 2. Instale as dependências

```bash
yarn install
```

### 3. Inicie o ambiente de desenvolvimento

```bash
yarn dev
```

A aplicação estará disponível em: [http://localhost:3000](http://localhost:3000)

### 4. Execute os testes

```bash
yarn test
```

```bash

# Rode o projeto em ambiente de desenvolvimento
yarn dev

# Execute os testes
yarn test
```

---

## 🌐 Estrutura de pastas

A estrutura do projeto foi organizada para manter a separação de responsabilidades e facilitar a escalabilidade:

```
src/
├── assets/             # Arquivos estáticos e imagens
├── components/         # Componentes reutilizáveis (Input, Button, Modal, UserTable...)
├── dtos/               # Definição de tipos como UserDTO
├── pages/              # Páginas principais: Register e List
├── routes/             # Arquivo de roteamento centralizado
├── service/            # Configuração da API
├── storage/            # Funções utilitárias para localStorage
├── styles/             # Estilos globais e compartilhados
├── App.tsx             # Componente principal da aplicação
├── main.tsx            # Ponto de entrada da aplicação
└── setupTests.ts       # Configuração dos testes

```

---

## 📊 Testes

Testes foram escritos utilizando **Vitest** e **Testing Library** para garantir:

- Comportamento dos componentes visuais
- Validações e interações do formulário
- Renderização condicional de modais e mensagens

---

## 🔗 Acesse o projeto online

O projeto está disponível em produção na Vercel:
👉 [https://tinnovausers.vercel.app/](https://tinnovausers.vercel.app/)

---

## 🙌 Considerações finais

Esse projeto reflete boas práticas de arquitetura de componentes, separação de responsabilidades, responsividade, acessibilidade básica e testes. 
Foi construído com foco na clareza de código, experiência do usuário e manutenção fácil.

---

Feito por Samael Melo.
