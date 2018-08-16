  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDFSxH5EIB5y87q9EElxpKte6pkK7-J5Lg",
    authDomain: "draganddrop-be29f.firebaseapp.com",
    databaseURL: "https://draganddrop-be29f.firebaseio.com",
    projectId: "draganddrop-be29f",
    storageBucket: "draganddrop-be29f.appspot.com",
    messagingSenderId: "478345660279"
  };
  firebase.initializeApp(config);
  // Login con registro
  let loginGoogle = document.getElementById('loginGoogle');
  let emailRegister = document.getElementById('emailLogin');
  let passwordRegister = document.getElementById('passwordLogin');
  let buttonLogin = document.getElementById('login');
  let register = document.getElementById('registra');

  //Login sin registro
let caja = document.getElementById('formRegister');
let name = document.getElementById('name');
let apellido = document.getElementById('last_name');
let emailRegistro = document.getElementById('email_register');
let passwordRegistro = document.getElementById('password_register');
let forRegister = document.getElementById('register');

// Observador 
let observador = () => {
  firebase.auth().onAuthStateChanged(whatcher = (user) => {
    if (user) {
      console.log('existe usuario activo');
      nextView();
    } else {
      console.log('no existe usuario activo');
    }
  });
};
// funcion para iniciar sesioon con Google
let providerg = new firebase.auth.GoogleAuthProvider();
loginGoogle.addEventListener('click', providerGoogle = () => {
  firebase.auth()
    .signInWithPopup(providerg)
    .then(function(result) {
      console.log(result.user);
      datosUsuario(result.user);
    });
  observador();
});
// funcion para aparecer la caja de registro
register.addEventListener('click', event => {
  caja.style.display = 'block';
  document.getElementById('main').style.display = 'none';
  forRegister.addEventListener('click', registerFunction)
})

// funcion para registrar nuevos usuarios
  const registerFunction = () => {
  const fullName = `${name.value} ${apellido.value}`;
  console.log(fullName);
  const correo = emailRegistro.value;
  const password = passwordRegistro.value;
  console.log(correo);
  console.log(password);
  const auth = firebase.auth();
  const registro = auth.createUserWithEmailAndPassword(correo, password);
  registro.then((user) => {
    console.log(auth.currentUser);
    const newUser = auth.currentUser;
    newUser.updateProfile({
      displayName: fullName,
      email: correo
    }).then(() => {
      console.log(newUser);
      datosUsuarioForRegister(newUser);
      nextView();
    })
      .catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  });
}; 

const datosUsuarioForRegister = (user) =>{
  let newUser = user;
  console.log(newUser.displayName);
  let database = firebase.database();
  let usuario = {
    uid: user.uid,
    nombre: user.displayName,
    correo: user.email,
    foto: user.photoURL || 'https://sss.ukzn.ac.za/wp-content/uploads/2017/12/profile-placeholder.png',
  };
  console.log(usuario);
  database.ref('Usuarios/' + user.uid)
    .set(usuario);
};

// f
// Funcion para guardar los datos del usuaio en Firebase
const datosUsuario = (user) =>{
  let database = firebase.database();
  let usuario = {
    uid: user.uid,
    nombre: user.displayName,
    correo: user.email,
    foto: user.photoURL
  };
  database.ref('Usuarios/' + user.uid)
    .set(usuario);
};

const nextView = () => {
  location.href = 'views/firstView';
}
