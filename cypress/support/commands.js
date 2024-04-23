import { faker } from '@faker-js/faker';

Cypress.Commands.add("cadastrarUsuario", () => {
  const usuario = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: 'Teste123'
  };

  cy.request({
    method: 'POST',
    url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/users',
    body: usuario,
    failOnStatusCode: false
  }).then(response => {
    expect(response.status).to.eq(201);
    return usuario;
  });
});

Cypress.Commands.add("loginUsuario", () => {
  cy.cadastrarUsuario().then(usuario => {
    cy.request({
      method: 'POST',
      url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/auth/login',
      body: {
        email: usuario.email,
        password: usuario.password
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.eq(200);
      if (response.status === 200) {
        expect(response.body).to.have.property('accessToken');
        const accessToken = response.body.accessToken;
        Cypress.env('accessToken', accessToken);
        
    
      }
    });
  });
});

Cypress.Commands.add("tornarAdmin", () => {
  const accessToken = Cypress.env('accessToken');
  cy.log('accessToken', accessToken) 

  cy.request({
    method: 'PATCH',
    url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/users/admin',
    headers: {
      Authorization: `Bearer ${accessToken}`
      // Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTQ4MywiZW1haWwiOiJwYXVsYW1vcmV0aUB0Z21haWxsLmNvbSIsImlhdCI6MTcxMzgzNDI3NCwiZXhwIjoxNzEzODM3ODc0fQ.kyD6JuxkmbX5As_-aaa9LXQzB8qj-Z2Dj31vX6ghC18'
      // Authorization: `Bearer ${accessToken}`
    },
    failOnStatusCode: false
  }).then(response => {
    expect(response.status).to.eq(204);
  });
});


Cypress.Commands.add("criarFilme", () => {
  const accessToken = Cypress.env('accessToken');

  const novoFilme = {
    titulo: faker.lorem.words(3),
    diretor: faker.person.firstName(),
    ano: faker.date.past().getFullYear(),
  };

  cy.request({
    method: 'POST',
    url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/movies',
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body: novoFilme,
    failOnStatusCode: false
  }).then(response => {
    expect(response.status).to.eq(201);
    expect(response.body).to.have.property('id');
  });
});

