const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://pepito:b5a1453zxk@cluster0.ca9bi26.mongodb.net/miapp?retryWrites=true&w=majority');


const User = mongoose.model('User', {
    username: String,
    edad: Number,
})

// CREAR    
const crear = async () => {
    const user = new User({ username: 'chanchito feliz', edad: 15 })
    const savedUser =  await user.save();
    console.log(savedUser);
}

// BUSCAR TODO
const buscarTodo = async () => {
    const users = await User.find();
    console.log(users);
}

// BUSCAR 
const buscar = async () => {
    const user = await User.find({ username: 'chanchito feliz'});
    console.log(user);
}

// BUSCAR UNO
const buscarUno = async () => {
    const user = await User.findOne({ username: 'chanchito feliz' });
    console.log(user);
}

// ACTUALIZAR
const actualizar = async () => {
    const user = await User.findOne({ username: 'chanchito feliz' });
    console.log(user)
    user.edad = 30;
    await user.save()
}

// ELIMINAR
const eliminar = async () => {
    const user = await User.findOne({ username: 'chanchito triste' });
    console.log(user);
    if (user) {
        await user.remove()
    }
}