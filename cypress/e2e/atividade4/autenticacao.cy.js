import { faker } from '@faker-js/faker';

describe('Testes de cadastro, login e autenticação no sistema Raromdb', function () {
  let accessToken; // Movido para fora do escopo dos testes

  it('Deve ser possível cadastrar um novo usuário, fazer login e obter o token de acesso', function () {
    const newUser = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'Teste123',
    };

    cy.request({
      method: 'POST',
      url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/users',
      body: newUser,
    }).then((response) => {
      expect(response.status).to.equal(201);

      cy.request({
        method: 'POST',
        url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/auth/login',
        body: {
          email: newUser.email,
          password: newUser.password,
        },
      }).then((loginResponse) => {
        expect(loginResponse.status).to.equal(200);
        expect(loginResponse.body).to.have.property('accessToken');
        accessToken = loginResponse.body.accessToken; // Armazena o token de acesso
        expect(accessToken).to.not.be.undefined;
      });
    });
  });

  it('Deve ser possível tornar-se admin após o login', function () {
    // Verifica se o token de acesso está definido antes de usar
    expect(accessToken).to.not.be.undefined;

    cy.request({
      method: 'PATCH',
      url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/users/admin',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((acessToken) => {
      expect(acessToken.status).to.equal(204);
    });
  });
});
