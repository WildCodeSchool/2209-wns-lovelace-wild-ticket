const formValidations = async (
  firstName: string,
  email: string,
  phoneNumber: string
) => {
  if (firstName.trim() == "") {
    return "Merci de renseigner votre nom et/ou prénom.";
  }
  if (email.trim() == "" && phoneNumber.trim() == "") {
    return "Merci de renseigner votre email et/ou numéro de téléphone.";
  } else if (
    email &&
    !email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    return "Votre adresse email n'est pas au bon format.";
  } else if (
    phoneNumber &&
    !phoneNumber.match(
      /^(?:(?:\+|00)33[\s.-]?|0)(?:(?:6|7)[\s.-]?)(?:\d{2}[\s.-]?){3}\d{2}$/
    )
  ) {
    return "Votre numéro de téléphone n'est pas au bon format.";
  }
};

export default formValidations;
