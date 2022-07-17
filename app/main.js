const loadInitialTemplate = () => {
    const template = `
        <div class="container">
            <h1>Usuarios</h1>
            <form class="form-container" id="user-form">
                <div>
                    <label>Nombre</label>
                    <input name="name" />
                </div>
                <div>
                    <label>Apellido</label>
                    <input name="lastname" />
                </div>
                <button type="submit">Enviar</button>
            </form>
            <ul id="user-list"></ul>
        </div>
    `
    const body = document.getElementsByTagName('body')[0];
    body.innerHTML = template;
}

const getUsers = async () => {
    const response = await fetch('/users');
    const users = await response.json();
    const template = user => `
        <li>
            ${user.name} ${user.lastname} <button data-id="${user._id}">Eliminar</button>
        </li>
    `


    const userList = document.getElementById('user-list');
    userList.innerHTML = users.map(user => template(user)).join('');
    users.forEach(user => {
        const userNode = document.querySelector(`[data-id="${user._id}"]`);
        userNode.onclick = async e => {
            await fetch(`/users/${user._id}`, {
                method: 'DELETE',
            })
            userNode.parentNode.remove();
            // alert('Eliminado correctamente');
        }
    })
}

const addFormListener = () => {
    const userForm = document.getElementById('user-form');
    userForm.onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(userForm); //? ESTO ME PERMITE HACER QUE EL BOTON SEA UN OBJETO Y ASI ACCEDER A SU VALUE.
        
        const data = Object.fromEntries(formData.entries()); //! ESTO VA A TRANSFORMAR UN UN OBJETO ITERADOR (POR EJEMPLO UN BOTON) Y LO VA A TRANSFORMAR EN UN OBJETO JSON() (SUPONGO QUE EN EL JSON GUARDARA LOS VALUES).
        
        // console.log(data); //TODO: ESTO DEVUELVE: {name: 'chanchito', lastname: 'feliz'} ESTOS SON LOS DATOS OBTENIDOS DEL FORM.

        await fetch('/users', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 
                'Content-Type': 'application/json'
            }
        })
        userForm.reset();
        getUsers();
    }
}


window.onload = () => {
    loadInitialTemplate();
    addFormListener();
}
