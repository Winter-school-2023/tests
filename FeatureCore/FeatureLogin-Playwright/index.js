//Importar Playwright
const playwright = require('playwright');

const url = 'http://localhost:2368/ghost/#/signin';

//Función flecha asíncrona
(async () => {
  //Definir los navegadores en los que se quiere hacer la prueba
  for (const browserType of ['firefox']) {
    //Contenido de la prueba
    console.log(browserType+'-------------------------------------------')

    //Creación del objeto browser, el contexto del mismo y el objeto page para manejar la página
    const browser = await playwright[browserType].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    
    //Abrir la URL a probar en la página y cargar el proyecto en una SPA
    await page.goto(url);
    await new Promise(r => setTimeout(r, 7000));
    await page.screenshot({path: './paginainicio.png'})                                                                     //!!!!!
    await page.click('css=button')
    await new Promise(r => setTimeout(r, 9000));
    await page.screenshot({path: './clicenelbotonforgot.png'})                                                                //!!!!!
    console.log('Project loaded')


    //Interactuar con la aplicación web
    //...

    //clic en el boton sign in y verificar la url
    await page.click('css=button#ember5.login.gh-btn.gh-btn-login.gh-btn-block.gh-btn-icon.ember-view')
    console.log(`Clicked "sign in". URL is now ${page.url()}`)

    //Hacer clic en el botón "Sign in" y verificar la existencia del texto en los campos
    await page.click('css=button#ember5.login.gh-btn.gh-btn-login.gh-btn-block.gh-btn-icon.ember-view')
    let feedback = await page.$$('css=p.main.error');

    let elems=0
    for(let i of feedback){elems++}
    await page.screenshot({path:'./form-without-complete.png'})                                                                 //!!!!!
    console.log(`Clicked "Sign in" with an empty form. Feedback is shown in ${elems} elements`)

    
    //completar el formulario con valores erroneos
    await page.type('input[id="identification"]', 'estecorreonoexiste@gmail.com');
    await page.type('input[id="password"]', 'NoExiste?');
  
    await page.click('css=button#ember5.login.gh-btn.gh-btn-login.gh-btn-block.gh-btn-icon.ember-view')

    await new Promise(r => setTimeout(r, 3000));
    await page.screenshot({path:'./failure-feedback.png'})                                                                        //!!!!!

    //borro la informacion escrita
    await page.fill('input[id="identification"]', ''); // Limpia el campo del correo
    await page.fill('input[id="password"]', ''); // Limpia el campo de la contraseña

    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path:'./clean-form.png'})                                                                                //!!!!!

    //tiempo de espera
    await new Promise(r => setTimeout(r, 7000));

   
    //completar el formulario con valores correctos
    await page.type('input[id="identification"]', 'u20211c242@upc.edu.pe');
    await page.type('input[id="password"]', 'Isa28be#lla');
  
    await page.click('css=button#ember5.login.gh-btn.gh-btn-login.gh-btn-block.gh-btn-icon.ember-view')
    
    await new Promise(r => setTimeout(r, 5000));
    await page.screenshot({path:'./after-login.png'})                                                                         //!!!!!

    //Finalizar la prueba
    await browser.close();
  }
  return;
})();//Llamado propio de la función
