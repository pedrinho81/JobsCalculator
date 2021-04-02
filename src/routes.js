const express = require('express') //biblioteca pra criar servidor
const routes = express.Router() //parte do express que cria as rotas/caminhos

const views = __dirname + "/views/" //caminho base//Usamos a const view pq o ejs le apenas o ../maratonas


const Job = {
    data: [

        {   
            id: 1,
            name: "Pizzaria Guloso",
            id: 1,
            "daily-hours": 2,
            "total-hours": 1,
            createdAt: Date.now(),
        },
        {
            id:2,
            name: "OneTwo Project",
            id: 2,
            "daily-hours": 10,
            "total-hours": 200,
            createdAt: Date.now(),
        }

    ],

    controllers: {
        index(req, res) {
            //vai criar um novo array, retornando todo o objeto do return
            const updatedJobs = Job.data.map((job) => {
                //ajustes no jobb

                const remaining = Job.services.remainingDays(job)
                const status = remaining <= 0 ? 'done' : 'progress'


                return { //tudo do job somado a outros atributos
                    ...job,  //pega tudo que já tem no job(linha6) e espalha neste objeto
                    remaining, /*dias restamtes*/
                    status,
                    budget: Job.services.calculateBudget(job, Profile.data["value-hour"])  /*custo do projeto*/
                }
            })

            return res.render(views + "index", { jobs: updatedJobs })  //JOBS AGORA É UPDATE JOBS

        },

        create(req, res) {
             return res.render(views + "job")
        },

        save(req, res) {
            //req.body = {name:'One two Project', dayli-hours: '21', total-hours:'3'}
            const lastId = Job.data[Job.data.length - 1]?.id || 0;

            Job.data.push({
                id: lastId + 1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                createdAt: Date.now() //atribuindo data de hoje

            })

            return res.redirect('/')
        },

        show(req, res) {
            
           const jobId = req.params.id     

           const job = Job.data.find(job => Number(job.id) === Number(jobId))
            
           if(!job) {
               return res.send("Job not found")
           }
           job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"])
            
            return res.render(views + "job-edit", {job})
        },

        update(req, res) {
           const jobId = req.params.id      //pega o numero do projeto nos parametros

           const job = Job.data.find(job => Number(job.id) === Number(jobId)) //procurando o job dentro dos jobs
            
           if(!job) {   
               return res.send("Job not found")
           } 

           const updatedJob = {    //atualiza os dados do job
               ...job,
               name: req.body.name,
               "total-hours": req.body["total-hours"],
               "daily-hours": req.body["daily-hours"],
           }

           Job.data = Job.data.map(job => {

            if(Number(job.id) === Number(jobId)) { //se for o id que alterei, job vai ser os dados inseridos no UpdatedJob
                job = updatedJob       
            }
            
            return job
           })

           res.redirect('/job/' + jobId)
        },

        delete(req, res) {
            const jobId = req.params.id
                                         //se for verdadeiro ele ira tirar o id do job
            Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))

            return res.redirect('/')
        }
    },

    services: {
        remainingDays(job) {
            //calculos de tempo restante 
            const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed()

            const createdDate = new Date(job.createdAt)
            const dueDay = createdDate.getDate() + Number(remainingDays)
            const dueDate = createdDate.setDate(dueDay)

            const timeDiffInMs = dueDate - Date.now()
            //transformar milli em dias
            const dayInMs = 1000 * 60 * 60 * 24
            const dayDiff = Math.floor(timeDiffInMs / dayInMs)
            //retorna x dias
            return dayDiff
        },
        calculateBudget: (job, valueHour) => valueHour * job['total-hours']
    }
    

}


const Profile = {
    data: {
        name: "Pedrinho",
        avatar: "https://github.com/pedrinho81.png",
        "monthly-budget": 3000,
        "days-per-week": 5,
        "hours-per-day": 5,
        "vacation-per-year": 4,
        "value-hour": 75
    },

    controllers: {
        index(req, res) {
            return res.render(views + "profile", { profile: Profile.data })
        },

        update(req, res) {
    //req.body para pegar os dados        
    const data = req.body
    //definir quantas semanas tem no ano
    const weeksPerYear = 52
    //remover as semanas de férias do ano, para ter qnts semanas tem em 1 mês
    const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12
    //total de horas trabalhadas na semana 
    const weeksTotalHours = data["hours-per-day"] * data["days-per-week"]
    //total de horas trabalhadas no mes
    const monthlyTotalHours = weeksTotalHours * weeksPerMonth
    //valor da hora
    const valueHour = data["value-hour"] = data["monthly-budget"] / monthlyTotalHours
    Profile.data = {
        ...Profile.data, //(...) espalha todos os atributos do objeto tal
        ...req.body,
        "value-hour":valueHour
    }   
    return res.redirect('/profile')   
    }
}

}
//req., res //dirname vai atras dos diretorios
routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)
routes.get('/job/:id', Job.controllers.show)
routes.post('/job/:id', Job.controllers.update)
routes.post('/job/delete/:id', Job.controllers.delete)
routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)

module.exports = routes