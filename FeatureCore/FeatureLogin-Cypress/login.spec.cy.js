describe('Prueba de Login en Ghost', () => {
  const baseUrl = 'http://localhost:2368/ghost/';
  const validEmail = 'u20211c009@upc.edu.pe';
  const validPassword = 'lachanclademitia';
  
  beforeEach(() => {
    cy.visit(baseUrl);
  });

  //información correcta en todos los campos
  it('Iniciar sesión con información correcta', () => {
    cy.get('input[id="identification"]').type(validEmail);
    cy.get('input[id="password"]').type(validPassword);
    cy.contains('button', 'Sign in').click();
  });

  //campos erroneos
  it('Intento de inicio de sesión con información incorrecta', () => {
    cy.get('input[id="identification"]').type('estecorreoNoexisteWIIII.com');
    cy.get('input[id="password"]').type('AA');
    cy.contains('button', 'Sign in').click();
    //cy.contains('span', 'Your password is incorrect').should('be.visible');
  });

  //algunos campos vacios
  it('Dejar algunos campos vacíos', () => {
    cy.get('input[id="identification"]').type(validEmail);
    cy.contains('button', 'Sign in').click();
    //cy.contains('span', 'Please fill out the form to sign in').should('be.visible');
  });

  //todo el formulario vacio
  it('Dejar todo el formulario de inicio de sesión vacío', () => {
    cy.contains('button', 'Sign in').click();
    //cy.contains('span', 'Please fill out the form to sign in').should('be.visible');
  });
});
