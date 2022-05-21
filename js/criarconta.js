const qSelect = (select) => document.querySelector(select);

const criarACC = () => {
  const form = qSelect("#form");

  const user = JSON.parse(localStorage.getItem(form.username.value));

  function verifyPassword(passwd, re_passwd) {
    return passwd === re_passwd;
  }

  if (user) {
    alert("Usuário ja cadastrado! Por favor escolha outro");
    return;
  }
  if (
    !(
      form.username.value === "" ||
      form.password.value === "" ||
      form["password-repeat"].value === ""
    )
  ) {
    if (verifyPassword(form.password.value, form["password-repeat"].value)) {
      localStorage.setItem(
        form.username.value,
        JSON.stringify({
          username: form.username.value,
          password: form.password.value,
          recados: [],
        })
      );
      window.location.href = "home.html";
      return;
    } else {
      alert("As senhas não correspondem");
    }
  } else {
    alert("Não são aceitos campos em branco no formulário!");
  }
};
