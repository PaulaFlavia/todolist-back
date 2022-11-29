
// Capturar o elementos
let inputNome = document.getElementById("regNome");
let inputEmail = document.getElementById("regEmail");
let inputSenha = document.getElementById("regSenha");
let inputConf = document.getElementById("regConf");
let formRegistrar = document.getElementById("form-registrar");

//
const urlBase = "/api";
const tratarResposta = async(response) => {
  switch (response.status) {
    case 201:
    // capturar o token respondido pelo servidor 
        let conteudo = await response.json();
    //guardar o token na sessionStorage
        sessionStorage.setItem('token', conteudo.token);
        sessionStorage.setItem('usuario', JSON.stringify(conteudo.usuario));
    //Carregar a index.html
        location = 'index.html'
    break;

    case 409:
        alert("Usuário já cadastrado")
      break;

    case 422:
        alert("Senha  preenchida incorretamente")
      break;

    default:
        alert("Erro inesperado")
      break;
  }
};

const registrarUsuario = async (dados) => {
  //1- Definir a Url completa para onde será enviada
  let url = `${urlBase}/auth/registrar`;
  //2-Preparar opções de envio
  let opcoes = {
    method: "POST",
    body: JSON.stringify(dados),
    headers: {
      "Content-Type": "application/json",
    },
  };
  //3-Enviar os dados da Req para o end de registro
  let response = await fetch(url, opcoes);
  //4- tratar a resposta, usar a propriedade status do response
  tratarResposta(response);
};

// Listeners
const onFormRegistrarSubmit = (evt) => {
  evt.preventDefault();
  let dados = {
    nome: inputNome.value,
    email: inputEmail.value,
    senha: inputSenha.value,
    confirmacao: inputConf.value,
  };

  registrarUsuario(dados);
};

// Associando listeners
formRegistrar.addEventListener("submit", onFormRegistrarSubmit);
