const schedule = require('node-schedule');
const Usuario = require('../models/Usuario');

// every day of the week performs this task at 00:00 (midnight)
const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(0, 6)];
rule.hour = 11;
rule.minute = 59;

    schedule.scheduleJob(rule, async () => {

        await Usuario.findAll().then(resBD => {

            const users = resBD.map(users => users.toJSON())

            users.forEach(async (userObj) => {
                const {id, vencimento, ativo } = userObj
                
                if (vencimento === 0) {
                    //change active status to false
                    await Usuario.update({
                
                       ativo: false

                    }, { where: { id: id}})
                } else {
                    //decrements the user's day at the time defined above in the schedule
                    await Usuario.update({
                       
                       vencimento: vencimento - 1,
                       
                    }, { where: { id: id}})
                }
            });
        })

    });

//console.log(job.nextInvocation())