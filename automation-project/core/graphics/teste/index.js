const { writeFile } = require('../../../adapters/file');
const automation = require('../../../adapters/automation/puppeteer');
const path = '../../../data/lake';


const searchForUniversity = "42046017";
const searchForCourse = "ENGENHARIA DE SOFTWARE (42046017016P1)";



const getTest = async (searchForUniversity, searchForCourse) => {
   await automation.createAutomationInstance();

   try {
      await automation.goTo('https://sucupira.capes.gov.br/sucupira/public/consultas/coleta/envioColeta/dadosFotoEnvioColeta.jsf');
      await automation.sleep(1000);
      await automation.type('cssSelector','input[id*="inst:input"]',searchForUniversity);
      await automation.sleep(2000);
      await automation.clickByXpath('//*[@id="form:j_idt30:inst:listbox"]/option[1]');
      await automation.sleep(2000);

      await automation.clickByXpath('//*[@id="form:j_idt30:programa"]/div/div/div/div/select');
      await automation.sleep(2000);
      await automation.selectByXpath('//*[@id="form:j_idt30:programa"]/div/div/div/div/select/option[13]');
      await automation.sleep(2000);
    
      await automation.clickByXpath('//*[@id="form:consultar"]');

      await automation.clickByXpath('//*[@id="form:j_idt92:j_idt94:cabecalhoPrograma"]/button');
      await automation.sleep(1000);
      await automation.click('cssSelector','.text-center a');
      await automation.sleep(2000);


      await automation.downloadPath(path);
      await automation.sleep(1000);
      
      

   }catch (error) {
      await automation.finishAutomation();
      throw error;
   }

}

getTest(searchForUniversity,searchForCourse);