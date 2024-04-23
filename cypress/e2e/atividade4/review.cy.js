import { faker } from "@faker-js/faker";
describe("Criacao de Review no sistema Raromdb", function () {
  let acessToken;
  before(function () {
    cy.cadastrarUsuario().then(() => {
      cy.loginUsuario().then(() => {
        cy.tornarAdmin().then(() => {
          acessToken = Cypress.env("accessToken");
        });
      });
    });
  });

  it("Deve ser possível criar um novo review no sistema", function () {
    cy.fixture("reviews.json").then((reviews) => {
      const novoReview = reviews.review1;

      cy.request({
        method: "POST",
        url: "https://raromdb-3c39614e42d4.herokuapp.com/api/users/review",
        headers: {
          Authorization: `Bearer ${acessToken}`,
        },
        body: novoReview,
      }).then((response) => {
        expect(response.status).to.equal(201);
      });
    });
  });

  it("Deve retornar Bad Request na criação incorreta da review", function () {
    cy.fixture("reviews.json").then((reviews) => {
      cy.request({
        method: "POST",
        url: "https://raromdb-3c39614e42d4.herokuapp.com/api/users/review",
        headers: {
          Authorization: `Bearer ${acessToken}`,
        },

        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body).to.have.property("error");
      });
    });
  });
  it("Deve retornar Not Found na atualização da review", function () {
    cy.fixture("reviews.json").then((reviews) => {
      const novoReview = reviews.review1;

      cy.request({
        method: "POST",
        url: "https://raromdb-3c39614e42d4.herokuapp.com/api/users/reviews",
        headers: {
          Authorization: `Bearer ${acessToken}`,
        },
        body: novoReview,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(404);
      });
    });
  });

  it("Deve ser possível consultar reviews do usuário", function () {
    cy.fixture("reviews.json").then((reviews) => {
      cy.request({
        method: "GET",
        url: "https://raromdb-3c39614e42d4.herokuapp.com/api/users/review/all",
        headers: {
          Authorization: `Bearer ${acessToken}`,
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
      });
    });
  });
  it("Não deve ser possivel consultar review sem autenticação", function () {
    cy.fixture("reviews.json").then((reviews) => {
      cy.request({
        method: "GET",
        url: "https://raromdb-3c39614e42d4.herokuapp.com/api/users/review/all",
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(401);
        expect(response.body).to.have.property("error");
      });
    });
  });
});
