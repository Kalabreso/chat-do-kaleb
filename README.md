# Flamengo Chat

Este é um chat em tempo real desenvolvido com **Express** e **Socket.io**. O aplicativo foi projetado para ser executado localmente. A seguir, você encontrará os passos para rodar o código no seu computador.

---

## 🚀 Requisitos

Antes de iniciar, verifique se o **Node.js** e o **Yarn** estão instalados em sua máquina. Se não tiver, siga os passos abaixo para instalá-los:

1. **Instalar o Node.js**:
   - Acesse o [site oficial do Node.js](https://nodejs.org/) e siga as instruções de instalação.

2. **Instalar o Yarn**:
   - Acesse o [site oficial do Yarn](https://yarnpkg.com/) e siga as instruções para instalação.

---

## 📋 Passos para rodar o projeto

### 1. Inicializando o Projeto

Primeiro, no terminal, execute o seguinte comando para iniciar um novo projeto Node.js:

```bash
npm init -y

Isso criará automaticamente um arquivo package.json básico para o seu projeto.

2. Instalando o Yarn
Caso não tenha o Yarn instalado, execute o comando abaixo para instalá-lo globalmente:

npm install -g yarn

npm install --global yarn

3. Configurando o PowerShell (Para Windows)
Se você estiver utilizando Windows e estiver no PowerShell, pode ser necessário alterar a política de execução de scripts. Para isso, execute este comando:

Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

4. Verificando a versão do Yarn
Após instalar o Yarn, verifique se a instalação foi bem-sucedida executando o comando:

yarn --version

5. Instalando as Dependências
Agora, você precisa instalar as dependências do projeto. Primeiro, adicione o TypeScript:

yarn add typescript -D

yarn add express socket.io

yarn add @types/express -D

yarn add tsx -D

yarn dev

npm run dev


Comandos Resumidos
Aqui estão os comandos principais em um formato resumido:

npm init -y
npm install -g yarn
npm install --global yarn
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
yarn --version
yarn add typescript -D
yarn add express socket.io
yarn add @types/express -D
yarn add tsx -D
yarn dev
npm run dev

Agora você está pronto para testar o chat em tempo real localmente! 😄
