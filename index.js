// VARIABLES GLOBALES
const addNote = document.querySelector(".conteiner__image")
const modal = document.querySelector(".modalNote")
const conteiner__notes = document.querySelector(".conteiner__notes")
let notas = []
let sumadorId = 1

// CREANDO CLASE GLOBAL NOTA
class Nota{
    constructor(id,titulo,contenido){
        this.id = id
        this.titulo = titulo
        this.contenido = contenido
        this.date = new Date()
        this.mes = this.date.getMonth() + 1
        this.dia = this.date.getDate()
        this.hora = this.date.getHours()
        this.min = this.date.getUTCMinutes()
    }
}

// FUNCION PUSHEAR NOTA
const saveNote = (titulo, contenido) => {
    if(notas.length === 0){
        sumadorId = 1
    }
    notas.push(new Nota(sumadorId,titulo,contenido))
    sumadorId ++
}

// FUNCION PARA ELIMINAR NOTA
const eliminarNota = notaId => {
    let find = notas.find(nota => nota.id === notaId)
    let ind = notas.indexOf(find)
    notas.splice(ind,1)
    uploadNotes()
}

// FUNCION PARA MODIFICAR NOTA
const modificarNota = notaId => {
    modal.innerHTML = ""
    let find = notas.find(nota => nota.id === notaId)
    let {titulo,contenido} = find
    const nuevaNota = document.createElement('div')
    nuevaNota.classList = 'newNote'
    nuevaNota.innerHTML = `<input id="title__note" type="text" value="${titulo}">
                           <textarea name="" id="content__note" cols="50" rows="10"></textarea>
                           <div class="conteiner__botones">
                           <button class="botonCancelar">Cancelar</button>
                           <button class="botonGuardar">Guardar cambios</button>
                           </div>`    
    modal.appendChild(nuevaNota)
    modal.classList.add('modalNote--see')
    let text = document.querySelector('#content__note')
    text.innerText = contenido
    let botonCancelar = document.querySelector('.botonCancelar')
    botonCancelar.onclick = () => {
        modal.classList.remove('modalNote--see')
        modal.innerHTML = ""
    }
    let botonGuardar = document.querySelector('.botonGuardar')
    botonGuardar.onclick = () => {
        saveNote(document.querySelector('#title__note').value ,document.querySelector('#content__note').value)
        eliminarNota(notaId)
        modal.classList.remove('modalNote--see')
        modal.innerHTML = ""
    }
    uploadNotes()
}


// FUNCION PARA RECORRER LISTA DE NOTAS Y CREARLAS CON DOM
const uploadNotes = () => {
    conteiner__notes.innerHTML = ""
    notas.forEach(nota => {
        const {id,titulo,contenido,dia,mes,hora,min} = nota
        let note = document.createElement('article')
        note.classList = 'note'
        note.innerHTML = `<h2>${titulo}</h2>
                          <p>${contenido}</p>
                          <div class="botonesCambios">
                          <button id="eliminar${id}" class="botonDelete"><img src="img/goma-de-borrar.png" class="icon"></button>
                          <button id="modificar${id}" class="botonModificar"><img src="img/nota-adhesiva.png" class="icon"></button>
                          </div>
                          <span>${dia}/${mes} - ${hora}:${min}</span>`
        conteiner__notes.appendChild(note)
        const botonEliminar = document.querySelector(`#eliminar${id}`)
        botonEliminar.onclick = () => {
            eliminarNota(id)    
        }
        const botonModificar = document.querySelector(`#modificar${id}`)
        botonModificar.onclick = () => {
            modificarNota(id)
        }
        }
    )
    localStorage.setItem('notes',JSON.stringify(notas))
    localStorage.setItem('sumador',JSON.stringify(sumadorId))
}


// TRAER LOCAL STORAGE(EN CASO DE EXISTIR)
if(JSON.parse(localStorage.getItem('notes'))){
    notas = JSON.parse(localStorage.getItem('notes'))
    sumadorId = JSON.parse(localStorage.getItem('sumador'))
    uploadNotes()
}

const crearNota = () => {
    const nuevaNota = document.createElement('div')
    nuevaNota.classList = 'newNote'
    nuevaNota.innerHTML = `<input id="title__note" type="text" value="Sin titulo">
                           <textarea name="" id="content__note" cols="50" rows="10"></textarea>
                           <div class="conteiner__botones">
                           <button class="botonCancelar">Cancelar</button>
                           <button class="botonGuardar">Guardar</button>
                           </div>`   
    modal.appendChild(nuevaNota)
    modal.classList.add('modalNote--see')
    const botonCancelar = document.querySelector('.botonCancelar')
    botonCancelar.onclick = () => {
        modal.classList.remove('modalNote--see')
        modal.innerHTML = ""   
    }
    const botonGuardar = document.querySelector('.botonGuardar')
    botonGuardar.onclick = () => {
        if(document.querySelector('#content__note').value != ""){
            saveNote(document.querySelector('#title__note').value,document.querySelector('#content__note').value)
        }
        modal.classList.remove('modalNote--see')
        modal.innerHTML = ""
        uploadNotes()
    }
}


// CREANDO NOTA A PARTIR DE EL EVENTO
addNote.addEventListener('click', () => {
    crearNota()    
}
)


