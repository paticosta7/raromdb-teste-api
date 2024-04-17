import { faker } from '@faker-js/faker';

describe('Testes de cadastro e login no sistema Raromdb', function () {
    var idUsuario;
  
    it('Deve ser possível cadastrar um novo usuário', function () {
      const name = faker.person.fullName();
      const email = faker.internet.email();
      const password = 'teste123'; // Lembrar de criar uma senha válida!
  
      cy.request({
        method: 'POST',
        url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/users',
        body: {
          name: name,
          email: email,
          password: password,
        },
      }).then(function (response) {
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('id');
        expect(response.body.name).to.equal(name);
        expect(response.body.email).to.equal(email);
  
        idUsuario = response.body.id;
  
        // após o cadastro é para efetuar login
        cy.request({
          method: 'POST',
          url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/auth/login',
          body: {
            email: email,
            password: password,
          },
        }).then(function (loginResponse) {
          expect(loginResponse.status).to.equal(200); //  status da resposta 200 indica sucesso no login
        });
      });
    });
  });
    
