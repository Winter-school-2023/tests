const playwright = require('playwright');

const {Faker, es} = require('@faker-js/faker');

const customFaker = new Faker({ locale: [es] });

const url = 'http://localhost:2368/ghost/';


//PRUEBA 

(async () => {
    //Definir los navegadores en los que se quiere hacer la prueba
    for (const browserType of ['firefox']) {
      //Contenido de la prueba
      console.log('Prueba de '+browserType+'-------------------------------------------')
  
      //Creación del objeto browser, el contexto del mismo y el objeto page para manejar la página
      const browser = await playwright[browserType].launch();
      const context = await browser.newContext();
      const page = await context.newPage();
      
      //Abrir la URL a probar en la página
      await page.goto(url);
      await new Promise(r => setTimeout(r, 7000));
      await page.screenshot({path: './1home-setup.png'})


        //Click a 'Send' sin llenar el form
      await page.click('css=button')
      await new Promise(r => setTimeout(r, 9000));
        
      let feedback = await page.$$('css=p.response');
  
      let elems=0
      for(let i of feedback){elems++}
      await page.screenshot({path:'./2form-feedback.png'})
      console.log(`Clicked "Register" with an empty form. Feedback is shown in ${elems} elements`)
  
      await page.type('input[id="blog-title"]', customFaker.company.name());
      await page.type('input[id="name"]', customFaker.person.fullName());
      await page.type('input[id="email"]', customFaker.internet.email());

      var pass1 = customFaker.internet.password({ length: 10 })
      var pass2 = customFaker.internet.password({ length: 8 })
      
      await page.type('input[id="password"]', pass2);
      await page.click('css=button')
  
      await new Promise(r => setTimeout(r, 7000));
      await page.screenshot({path:'./error-feedback.png'})

      await page.type('input[id="password"]', pass1 );
      await page.screenshot({path:'./correct-password.png'})
      await page.click('css=button')
      
      await new Promise(r => setTimeout(r, 7000));
      console.log(pass1);
      console.log(pass2);
      await page.screenshot({path:'./logged-in.png'})
      console.log(`Logged in. Your user was ${feedback?'successfully':'not'} created`)
      //...
  

      //Finalizar la prueba
      await browser.close();
    }
    return;
  })();//Llamado propio de la función
