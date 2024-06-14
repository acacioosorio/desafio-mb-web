# Desafio Mercado Bitcoin

O formulário de cadastro é exibido em 4 passos distintos e modulares, com capacidade de ser responsivo para telas de celulares.

## Preparativos do Projeto

```sh
npm install
```

### Compilar com Hot-Reload para Desenvolvimento (client e server)

```sh
npm run dev
```

### Type-Check, Compile and Minify Client para Produção.

```sh
npm run build
```

### Executar a Aplicação.

```sh
npm run start
```

### Algumas Considerações

Foi adicionado uma navegação de passos para melhor Usabilidade e experiencia do usuario.

Os campos são validados fazendo uso da biblioteca Vuelidate 2

O campo de Senha teve algumas regras adicionadas para maior segurança do usuário.

Foi adicionado um componente de "Toast" para visualização das mensagens de retorno.

Na Revisão das Informações não tornei os campos editaveis visto a possibilidade de retorno ao passo caso queira corrigir algo.

Caso fosse possivel a edição toda em uma tela, não fazia sentido 4 Steps Wizard Form para o preenchimento de tudo.