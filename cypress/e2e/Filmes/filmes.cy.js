describe('Consulta de Filmes', () => {
    it('Deve consultar o número de filmes cadastrados no Raromdb', () => {
      //  quantos filmes o sistema Raromdb possui cadastrado
      cy.request({
        method: 'GET',
        url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/movies/search?title=',
        failOnStatusCode: false // evita que o teste falhe 
      }).then((response) => {
        // Verifica se a resposta da API foi bem sucedida
        expect(response.status).to.eq(200);
        cy.log('Filmes consultados:', response.body);
      });
    });
  });
describe('Consulta de Filmes pelo título', () => {
  it('Pesquisa por filmes pelo Título', () => {
    const tituloFilme = 'As branquelas'; // INSERIR AQUI O TÍTULO DO FILME!!!

    // Para consultar filmes com base no título
    cy.request({
      method: 'GET',
      url: `https://raromdb-3c39614e42d4.herokuapp.com/api/movies/search?title=${tituloFilme}`,
      failOnStatusCode: false 
    }).then((response) => {
      expect(response.status).to.eq(200);  
      expect(response.body).to.exist;
      if (response.body.length > 0) {
        cy.log('Filmes consultados:', response.body);
        cy.log(`O filme "${tituloFilme}" foi encontrado no sistema.`);
      } else {
        cy.log('Nenhum filme encontrado com o título:', tituloFilme);
        cy.log(`O filme "${tituloFilme}" não foi encontrado no sistema.`);
      }
    });
  });
});


