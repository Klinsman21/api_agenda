const mail = require('@sendgrid/mail')

const SendEmail = async (email, token) => {
    console.log(process.env.SENDGRID_API_KEY)
    mail.setApiKey(process.env.SENDGRID_API_KEY)
    let authenticationURL = 'https://pw2-2023-api-agenda.onrender.com/users/validate/' + token;
    const msg = {
        to: email, // Change to your recipient
        from: 'jose.klinsman@academico.ifpb.edu.br', // Change to your verified sender
        subject: 'Confirmar Email',
        html: '<a target=_blank href=\"' + authenticationURL + '\">Confirme o seu email</a>'
    }

    try {
        const result = await mail.send(msg);
        console.log('Email sent', result);
    }
    catch (error) {
        console.error(error)
    }
}

module.exports = { SendEmail };
