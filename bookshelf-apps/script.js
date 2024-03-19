const BOOKS = []
const STORAGE_KEY = 'BOOKS'
const RENDER = 'render'
const SAVED = 'saved'

function input(e) {
    e.preventDefault()
    const judul = document.querySelector('#judul').value
    const penulis = document.querySelector('#penulis').value
    const tahun = document.querySelector('#tahun').value
    const status = document.querySelector('#status').value
    const formVal = {
        id: +new Date,
        title: judul,
        author: penulis,
        year: tahun,
        isComplete: status
    }
    BOOKS.push(formVal)
    document.dispatchEvent(new Event(RENDER))
    save()
}
function checkStorage() {
    if (typeof (Storage) === undefined) {
        alert('Browser tidak mendukung local storage')
        return false
    }
    return true
}
function save() {
    if (checkStorage()) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(BOOKS))
        document.dispatchEvent(new Event(SAVED))
    }
}
function findBook(id) {
    for(const item of BOOKS){
        if(item.id === id) return item
    }
}
function undoFromComplete(id) {
    const target = findBook(id)
    if (target === null) return
    target.isComplete = false
    document.dispatchEvent(new Event(RENDER))
    save()
}
function delBook(id) {
    const target = findBook(id)
    if(target === -1) return
}
function contentContainer(dataBook) {
    const article = document.createElement('article')
    article.classList.add('book-item')
    article.setAttribute('id', `${dataBook.id}`)
    const title = document.createElement('h2')
    title.innerHTML = dataBook.title
    const author = document.createElement('p')
    author.innerHTML = 'Penulis :'+dataBook.author
    const year = document.createElement('p')
    year.innerHTML = 'Tahun :'+dataBook.year
    const btnAction = document.createElement('div')
    btnAction.classList.add('btn-action')
    if (dataBook.isComplete) {
        const btnUnfinished = document.createElement('button')
        btnUnfinished.innerText = 'Belum Selesai'
        btnUnfinished.classList.add('end-read-btn')
        btnUnfinished.addEventListener('click', function(){
            undoFromComplete(dataBook.id)
        })
        const btnDel = document.createElement('button')
        btnDel.innerText = 'Hapus'
        btnDel.classList.add('del-btn')
        btnDel.addEventListener('click', function(){

        })
    }
}