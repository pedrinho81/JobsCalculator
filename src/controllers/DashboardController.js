const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
 async index(req, res) {
    const jobs = await Job.get(); //pega todos os dados do job model
    const profile = await Profile.get();
    //vai criar um novo array, retornando todo o objeto do return
    
    let statusCount = {
        progress: 0,
        done: 0,
        total: jobs.length
    }
    
    //total de horas/dia de cada job em progress
    let jobTotalHours = 0;
                            //map olha item a item
    const updatedJobs = jobs.map((job) => {
      //ajustes no jobb

      const remaining = JobUtils.remainingDays(job);
      const status = remaining <= 0 ? "done" : "progress";

        //somando a quantidade de status
      statusCount[status] +=1;
       
      
      //total de horas/dia de cada job em progress
     jobTotalHours = status === 'progress' ? jobTotalHours += Number(job['daily-hours']) : jobTotalHours


      return {
        //tudo do job somado a outros atributos
        ...job, //pega tudo que já tem no job(linha6) e espalha neste objeto
        remaining, /*dias restamtes*/
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"])
         /*custo do projeto*/
      };
    });
        //qtd de horas que quero trabalhar/dia(profile)
        //MENOS 
        //qtd de horas/dia de cada job em progress
    const freeHours = profile["hours-per-day"] - jobTotalHours;
    
    return res.render("index", { jobs: updatedJobs, profile:profile, statusCount:statusCount, freeHours:freeHours }); //aqui passa as variáves dentro do objeto para o index
  }
};


