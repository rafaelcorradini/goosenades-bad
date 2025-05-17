## Descrição

Dado um cliente que deseja fazer um empréstimo, precisamos criar uma aplicação que seja capaz de avaliar seu score de crédito e informar se o empréstimo foi aprovado ou não.

Desenvolva uma tela inicial para que o cliente possa escolher entre pessoa física ou jurídica.
Essa primeira tela deve redirecionar para a tela do formulário, de acordo com a escolha do usuário.
Na tela de pessoa física os seguintes campos devem ser preenchidos: nome, idade, renda mensal e cidade.
Na tela de pessoa jurídica os seguintes campos devem ser preenchidos: razão social, faturamento mensal e cidade.

### Valide os campos:

nome - mínimo de 8 caracteres

CPF - mínimo de 11 caracteres (não precisa verificar se é CPF válido)

renda mensal - maior que 0

idade - mínimo de 18 anos

cidade - não pode ser vazio

razão social - mínimo de 8 caracteres

CNPJ - mínimo de 14 caracteres (não precisa verificar se é um CNPJ válido)

faturamento mensal - maior ou igual a 500

### A partir dos dados fornecidos, mostre se o usuário foi aprovado:

Faça uma requisição para a API REST mockada que enviamos juntamente ao teste. A API retorna se o cliente foi aprovado ou não, e qual o valor máximo que ele pode pegar emprestado.
A API tem duas rotas, uma para pessoa física e outra para pessoa jurídica, ambas do tipo POST: `/credit-score/person` para pessoa física e `/credit-score/company` para pessoa jurídica.

O payload tem o seguinte formato na rota de pessoa física:

```json
{
  "income": 1000,
  "city": "Winterfell",
  "name": "John Snow",
  "age": 30,
  "document": "00000000000" 
}
```

O payload tem o seguinte formato na rota de pessoa jurídica:

```json
 {
  "revenue": 10000,
  "city": "Ibitinga",
  "name": "Borracharia dois irmãos",
  "document": "00000000000000" 
}
```


Nas duas rotas é retornado a seguinte estrutura, caso o cliente seja aprovado:

```json
{
  "status": "APPROVED",
  "max_amount": 10000
}
```

Ou a seguinte estrutura, caso seja reprovado:

```json
{
  "status": "DENIED"
}
```


A partir da resposta, redirecione para uma tela que mostre se o usuário foi aprovado ou reprovado, e o valor máximo que ele pode pegar emprestado.

### Armazenar a resposta localmente

Armazene a resposta localmente, para que usuário vá direto para a tela de aprovado/reprovado, caso o mesmo acesse o app novamente.
Na tela em que o resultado é exibido, mostre um botão que permita que o usuário refaça o processo, ou seja, um botão que limpe os dados armazenados.


### Desenvolva uma tela para exibir as últimas análises realizadas

Acrescente um segundo botão à tela do resultado, que permita que o usuário seja redirecionado para uma última tela, onde uma lista das últimas análises devem ser exibidas. A lista de análises pode ser recuperada utilizando a mesma API, através da rota `/credit-score/list` (método GET), duas listas serão retornadas nesse endpoint, no seguinte formato:

```json
{
  "persons": [
    {
      "person": {
        "income": 1000,
        "city": "Winterfell",
        "name": "John Snow",
        "age": 30,
        "document": "00000000000"
      },
      "credit_result": {
        "max_amount": 2000,
        "status": "APPROVED"
      }
    },
    {
      "person": {
        "income": 1000,
        "city": "Middle-Earth",
        "name": "Gandalf o Cinzento",
        "age": 30,
        "document": "00000000001"
      },
      "credit_result": {
        "status": "DENIED"
      }
    }
  ],
  "companies": [
    {
      "company": {
        "revenue": 10000,
        "city": "Ibitinga",
        "name": "Borracharia dois irmãos",
        "document": "00000000000000"
      },
      "credit_result": {
        "max_amount": 2000,
        "status": "APPROVED"
      }
    }
  ]
}
```


# Requisitos
- A aplicação deve ser web ou mobile.
- A aplicação deve rodar de maneira local em Linux ou Windows.
- Valide os campos do formulário.
- Utilize a API mockada da forma que desejar: REST, JSON, etc.
- Crie testes para a aplicação (unitários, e2e, de integração, etc.).
- A linguagem de programação é de escolha livre do candidato, porém recomendamos o uso de frameworks/libs populares, como: React, React Native, Angular, Vuejs, etc..
- Crie um README explicando como rodar a aplicação, testes unitários e qualquer outra informação que achar relevante.


# Diferenciais
- Utilização de design patterns que influenciem na escalabilidade e manutenção do código.
- O código da aplicação e dos teste unitários ser simples (bem organizado e fácil de entender) e funcional (no sentido de funcionar).
- Utilização do React/React Native.
- Utilização de alguma ferramenta para controle de estado e persistência: Redux, Mobx, Recoil, Context API, etc.

# Recomendações
O objetivo deste teste é que o candidato possa demonstrar habilidades que serão o dia a dia de trabalho na empresa, recomendamos que o teste seja desenvolvido pensando na escalabilidade e manutenção do código. Também, o teste servirá de insumos para uma conversa técnica, onde o candidato poderá demonstrar habilidades mais avançadas e outros conhecimentos baseados na perceção e na evolução do sistema hipotético. Ou seja, a completude do sistema hipotético não é o objetivo, mas anote suas ideias para termos uma entrevista mais rica.
