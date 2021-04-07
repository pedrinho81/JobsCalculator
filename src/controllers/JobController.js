const Job = require("../model/Job");
const JobUtils = require("../utils/JobUtils");
const Profile = require("../model/Profile");
module.exports = {
  create(req, res) {
    return res.render("job");
  },

  save(req, res) {
    //req.body = {name:'One two Project', dayli-hours: '21', total-hours:'3'}
    const jobs = Job.get();
    const lastId = jobs[jobs.length - 1]?.id || 0;

    jobs.push({
      id: lastId + 1,
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      createdAt: Date.now(), //atribuindo data de hoje
    });

    return res.redirect("/");
  },

  show(req, res) {
    const jobId = req.params.id;
    const jobs = Job.get();

    const job = jobs.find((job) => Number(job.id) === Number(jobId));

    if (!job) {
      return res.send("Job not found");
    }

    const profile = Profile.get();

    job.budget = JobUtils.calculateBudget(job, profile["value-hour"]);

    return res.render("job-edit", { job });
  },

  update(req, res) {
    const jobId = req.params.id; //pega o numero do projeto nos parametros
    const jobs = Job.get();
    const job = jobs.find((job) => Number(job.id) === Number(jobId)); //procurando o job dentro dos jobs

    if (!job) {
      return res.send("Job not found");
    }

    const updatedJob = {
      //atualiza os dados do job
      ...job,
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"],
    };

    const newJobs = jobs.map((job) => {
      if (Number(job.id) === Number(jobId)) {
        //se for o id que alterei, job vai ser os dados inseridos no UpdatedJob
        job = updatedJob;
      }

      return job;
    });

    Job.update(newJobs);

    res.redirect("/job/" + jobId);
  },

  delete(req, res) {
    const jobId = req.params.id;

    Job.delete(jobId);

    return res.redirect("/");
  },
};
