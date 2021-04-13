module.exports = {
        remainingDays(job) {
            //calculos de tempo restante 
            const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed()

            const createdDate = new Date(job.created_At)
            const dueDay = createdDate.getDate() + Number(remainingDays)
            const dueDateInMs = createdDate.setDate(dueDay)

            const timeDiffInMs = dueDateInMs - Date.now()
            //transformar milli em dias
            const dayInMs = 1000 * 60 * 60 * 24
            const dayDiff = Math.floor(timeDiffInMs / dayInMs)
            //retorna x dias
            return dayDiff
        },
        calculateBudget: (job, valueHour) => valueHour * job['total-hours']
    }