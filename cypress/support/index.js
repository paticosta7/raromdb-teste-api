// // para carregar comandos customizados
// // beforeEach hook para limpar o estado entre os testes
// beforeEach(() => {
//     cy.request('DELETE', '/movies'); // Limpa todos os filmes antes de cada teste
//   });
  
  // cypress/support/index.js

import './commands';
