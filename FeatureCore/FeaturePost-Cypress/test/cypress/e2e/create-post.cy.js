// Page Object para la página de inicio de sesión
class LoginPage {
    visit() {
      cy.visit('http://localhost:2368/ghost/#/editor/post');
      cy.wait(2000);
    }
  
    fillLoginForm(email, password) {
      cy.get('#identification').type(email);
      cy.get('#password').type(password);
      cy.get('[data-test-button="sign-in"]').click();
    }
  }
  
  // Page Object para la página de creación de post
  class EditorPage {
    fillPostTitle(title) {
      const placeholderValue = 'Post title';
      cy.get(`textarea[placeholder="${placeholderValue}"]`)
        .type(title)
        .should('have.value', title);
    }
  
    fillPostContent(content) {
      const placeholderValueContent = 'Begin writing your post...';
      cy.get(`div[data-placeholder="${placeholderValueContent}"]`)
        .type(content)
        .should('contain.text', content);
    }
  
    publishPost() {
      cy.get('button.gh-publish-trigger').click();
      cy.get('button[data-test-button="continue"]').click();
      cy.get('button[data-test-button="confirm-publish"]').click();
    }
  
    isPostCreated(postTitle) {
      cy.get('.gh-post-bookmark-title').should('have.text', postTitle);
    }
  }
  
  describe('Create post', () => {
    const postTitle = '¡Titulo del post!';
    const postContent = '¡Hola, este es el texto que quiero escribir en el div!';
    const email = 'brigittemmendezpastor@gmail.com';
    const password = 'Soft@@2022';
  
    beforeEach(() => {
      const loginPage = new LoginPage();
      loginPage.visit();
      loginPage.fillLoginForm(email, password);
    });
  
    it('Debe crear un post', () => {
      const editorPage = new EditorPage();
      editorPage.fillPostTitle(postTitle);
      editorPage.fillPostContent(postContent);
      editorPage.publishPost();
      editorPage.isPostCreated(postTitle);
    });
  });
  