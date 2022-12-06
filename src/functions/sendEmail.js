import axios from "axios"
async function sendEmail(nom,message,mail) {
    // privatKey="69JxNZyO9lPKCtSdKx6Fo"
    // publicKey = BA8givnh4_xNnSQXg
    var data = {
        service_id: 'service_4x9ag3g',
        template_id: 'template_3rdq8l9',
        user_id: 'BA8givnh4_xNnSQXg',
        template_params: {
            'to_name': nom,
            'message': message,
            'email':mail
        }
    }
    await axios.post("https://api.emailjs.com/api/v1.0/email/send",data,{contentType: 'application/json'}).then(
        (res)=>console.log(res.data)
    ).catch((er)=>console.error(er))
}
export default sendEmail;