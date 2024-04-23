import { faker } from "@faker-js/faker";
describe("Filmes e atualizações no sistema Raromdb", function () {
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

  it("Deve ser possível criar um novo filme no sistema", function () {
    // Carregar os dados da fixture:
    cy.fixture("filmes.json").then((filmes) => {
      const novoFilme = filmes.movie1;

      cy.request({
        method: "POST",
        url: "https://raromdb-3c39614e42d4.herokuapp.com/api/movies",
        headers: {
          Authorization: `Bearer ${acessToken}`,
        },
        body: novoFilme,
      }).then((response) => {
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property("id");
      });
    });
  });

  it("Não deve ser possivel criar filme sem autenticação", function () {
    // Carregar os dados da fixture:
    cy.fixture("filmes.json").then((filmes) => {
      const novoFilme = filmes.movie1;
      const errorBody = {
        message: "Access denied.",
        error: "Unauthorized",
        statusCode: 401,
      };
      cy.request({
        method: "POST",
        url: "https://raromdb-3c39614e42d4.herokuapp.com/api/movies",

        body: novoFilme,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(401);
        expect(response.body).to.have.property("error");
        expect(response.body).to.deep.equal(errorBody);
      });
    });
  });

  it("Deve retornar Bad Request na criação incorreta do filme", function () {
    // Carregar os dados da fixture:
    cy.fixture("filmes.json").then((filmes) => {
      cy.request({
        method: "POST",
        url: "https://raromdb-3c39614e42d4.herokuapp.com/api/movies",
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

  it("Deve ser possível atualizar as informações de um filme existente", function () {
    cy.fixture("filmes.json").then((filmes) => {
      const alteradoFilme = filmes.movie2;
      cy.request({
        method: "PUT",
        url: "https://raromdb-3c39614e42d4.herokuapp.com/api/movies/13",
        headers: {
          Authorization: `Bearer ${acessToken}`,
        },
        body: alteradoFilme,
      }).then((response) => {
        expect(response.status).to.equal(204);
      });
    });
  });

  //////////////////////////NO SWAGGER ESTÁ RETORNANDO UM 404 AO INVES DE 400/////////////////////////////////////////////////////////
  it("Deve retornar Bad Request na atualização do filme ", function () {
    cy.fixture("filmes.json").then((filmes) => {
      cy.request({
        method: "PUT",
        url: "https://raromdb-3c39614e42d4.herokuapp.com/api/movies/13",
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
  it("Deve retornar Not Found na atualização do filme", function () {
    cy.fixture("filmes.json").then((filmes) => {
      const alteradoFilme = filmes.movie2;
      const errorBody = {
        message: "Movie not found",
        error: "Not Found",
        statusCode: 404,
      };
      cy.request({
        method: "PUT",
        url: "https://raromdb-3c39614e42d4.herokuapp.com/api/movies/1233112222922211111111111112121212121212122121",
        headers: {
          Authorization: `Bearer ${acessToken}`,
        },
        body: alteradoFilme,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(404);
        expect(response.body).to.have.property("error");
        expect(response.body).to.deep.equal(errorBody);
      });
    });
  });
  it("Deve retornar filme com review", function () {
    const id = 13;

    cy.request({
      method: "GET",
      url: `https://raromdb-3c39614e42d4.herokuapp.com/api/movies/${id}`,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.id).to.equal(id);
      expect(response.body).to.have.property("reviews");
    });
  });
});
it("Deve retornar filme com review", function () {
  const id = 13;

  cy.request({
    method: "GET",
    url: `https://raromdb-3c39614e42d4.herokuapp.com/api/movies/${id}`,
  }).then((response) => {
    expect(response.status).to.equal(200);
    expect(response.body.id).to.equal(id);
    expect(response.body).to.have.property("reviews");
  });
});

