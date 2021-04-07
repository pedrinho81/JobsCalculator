let data = [
  {
    id: 1,
    name: "Pizzaria Guloso",
    id: 1,
    "daily-hours": 2,
    "total-hours": 1,
    createdAt: Date.now(),
  },
  {
    id: 2,
    name: "OneTwo Project",
    id: 2,
    "daily-hours": 10,
    "total-hours": 200,
    createdAt: Date.now(),
  },
];

//para atualizar os Dados
module.exports = {
  get() {
    //module pega
    return data;
  },
  update(newJob) {
    data = newJob;
  },
  delete(id) {
    data = data.filter((job) => Number(job.id) !== Number(id));
  }
};