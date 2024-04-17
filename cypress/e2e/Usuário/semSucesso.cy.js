import { faker } from '@faker-js/faker';

describe('Testes para cadastro de usuários sem sucesso', function () {
 it('Tentar realizar cadastro sem email e retornar com Error: Bad Request', function () {
      cy.request({
        method: 'POST',
        url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/users',
        body: {
          name: 'Maria Eduarda',
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        
      });
    })
  });
    it('Tentar realizar cadastro sem nome e retornar com Error: Bad Request', function () {
      cy.request({
        method: 'POST',
        url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/users',
        body: {
          email: 'mariaeduarda@qa.com',
        },
        failOnStatusCode: false,
      })
        .its('status')
        .should('to.equal', 400);
    });
    it('Tentar realizar cadastro com e-mail inválido e retornar com Error: Bad Request', function () {
      cy.request({
        method: 'POST',
        url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/users',
        body: {
          name: 'Maria Eduarda',
          email: '.br',
        },
        failOnStatusCode: false,
      })
        .its('status')
        .should('to.equal', 400);
    });   

