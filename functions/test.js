// const url = `https://www.googleapis.com/language/translate/v2?key=AIzaSyAZySOKJ-gH5wMhSyNaSVcDf5HgxTOco8w&source=en&target=fr&q=${payload}`;

const request = require('request')

function translate(payload) {
    const url = `https://www.googleapis.com/language/translate/v2?key=AIzaSyAZySOKJ-gH5wMhSyNaSVcDf5HgxTOco8w&source=en&target=fr&q=${payload}`;
    request(url, function(err, response) {
    // console.log('response', response)
        const newTask = {
            // assignedUser: q.assignedUser,
            // task: q.task,
            // createdBy: q.createdBy,
            // status: q.status,
            translated: JSON.parse(response.body).data.translations[0].translatedText
            // translated: JSON.stringify(JSON.parse(response.body).data.translations[0])
            // translated: 'batshit'
        };

        console.log(newTask)

    })

}


translate('good morning')
