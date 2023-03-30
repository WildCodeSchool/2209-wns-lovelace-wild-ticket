export const formValidations = async (
  firstName: string,
  email: string,
  phoneNumber: string,
  setFormErrors: any
) => {
  await setFormErrors(null);
  if (firstName.trim() == "") {
    await setFormErrors("Merci de renseigner votre nom et prénom.");
    return;
  }
  if (email.trim() == "" && phoneNumber.trim() == "") {
    await setFormErrors(
      "Merci de renseigner votre email et/ou numéro de téléphone."
    );
    return;
  } else if (
    email &&
    !email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    await setFormErrors("Votre adresse email n'est pas au bon format.");
    return;
  } else if (phoneNumber && !phoneNumber.match(/^\d{10}$/)) {
    await setFormErrors(
      "Merci de rentrer votre numéro de téléphone au format : XXXXXXXXXX."
    );
    return;
  }
};
