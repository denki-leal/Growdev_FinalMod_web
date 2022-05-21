let logged = sessionStorage.getItem("logged");

let user = undefined;
let isEdit = false;
let IdEdit = undefined;

function checkLogged() {
  if (!logged) {
    window.location.href = "./index.html";
    return;
  }

  const dataUser = localStorage.getItem(logged);
  if (dataUser) {
    user = JSON.parse(dataUser);
  }
}

function MostrarMensagem() {
  let HTMLmessages = "";
  const messages = user.recados;
  if (messages.length) {
    messages.forEach((message, index) => {
      HTMLmessages += `
        <tr class="line">
          <td class="table-id">${index}</td>
          <td class="table-description">${message.description}</td>
          <td class="table-details">${message.details}</td>
          <td class="table-buttons">
            <button class="btn btn-edit" onClick="editMessage(${index})">Editar</button>
            
            <button class="btn btn-delete" onClick="deleteMessage(${index})">Apagar</button>
          </td>
        </tr>
      `;
    });
  }
  document.getElementById("table-body").innerHTML = HTMLmessages;
}

function salvarRecado() {
  const formMessage = document.getElementById("form-message");
  const description = formMessage.message.value;
  const details = formMessage.details.value;

  if (!details || !description) {
    alert("Preencha todos os campos");
    return;
  }

  const message = {
    description,
    details,
  };

  if (isEdit) {
    user.recados[IdEdit] = message;
    isEdit = false;
    IdEdit = null;
  } else {
    user.recados.push(message);
  }

  localStorage.setItem(user.username, JSON.stringify(user));
  MostrarMensagem();
  formMessage.reset();
}

function deleteMessage(index) {
  user.recados.splice(index, 1);
  localStorage.setItem(user.username, JSON.stringify(user));
  MostrarMensagem();
}

function editMessage(index) {
  const formMessage = document.getElementById("form-message");
  formMessage.message.value = user.recados[index].description;
  formMessage.details.value = user.recados[index].details;
  isEdit = true;
  IdEdit = index;
}

function logout() {
  sessionStorage.clear();
  window.location.href = "./index.html";
}

checkLogged();
MostrarMensagem();
