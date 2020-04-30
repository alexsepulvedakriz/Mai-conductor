import languageJSON from "../common/language";

// movil number validation
export const validateText = (arg) => {
    const valid = (arg.length >0);
    return valid
}
// rut number validation
export const validateRut = (arg) => {
    const regularRut1 = /^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/;
    const regularRut2 = /^\d{7,8}[-][0-9kK]{1}$/;
    const regularRut3 = /^\d{7,8}[0-9kK]{1}$/;
    const rutValid = regularRut1.test(arg) || regularRut2.test(arg) || regularRut3.test(arg);
    return rutValid
}
// email validation
export const validateEmail= (arg) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const emailValid = re.test(arg);
    return emailValid;
}
// password validation
export const validatePassword= (arg) => {
    const { password } = this.state;
    const regx1 = /^([a-zA-Z0-9@*#]{8,15})$/
    const regx2 = /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/
    const passwordValid1 = password.length >=1;
    const passwordValid2 = regx1.test(password);
    const passwordValid3 = regx2.test(password);
    return (passwordValid1 && passwordValid2 && passwordValid3 );
/*    if(passwordValid1) {
        return  languageJSON.password_blank_messege;
    }
    else if(passwordValid2) {
        return languageJSON.password_alphaNumeric_check;
    }
    else if (passwordValid3) {
        return languageJSON.password_complexity_check
    }*/
};
// confirm password validation
export const validateConfPassword= (password, confPassword) => {
    const cnfPwdValid = (password == confPassword);
    return cnfPwdValid
};
// confirmar photo
export const validatePhoto= (photo) =>{
    const photoValid = (photo != null);
    return photoValid
};
