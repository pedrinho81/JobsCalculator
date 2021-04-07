const Profile = require('../model/Profile')

module.exports = {      //module.exports faz tudo ser exportável
        index(req, res) {
            return res.render("profile", { profile: Profile.get() })
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
    Profile.update({
        ...Profile.get(), //(...) espalha todos os atributos do objeto tal
        ...req.body,
        "value-hour":valueHour
    })
    
      
    return res.redirect('/profile')   
    }
}