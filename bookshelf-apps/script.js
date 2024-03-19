const BOOKS = []
const STORAGE_KEY = 'BOOKS'
const RENDER = 'render'
const SAVED = 'saved'

function input() {
    const judul = document.querySelector('#judul').value
    const penulis = document.querySelector('#penulis').value
    const tahun = document.querySelector('#tahun').value
    const status = document.querySelector('#status').checked
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
    return null
}
function findIndex(id) {
    for(const item in BOOKS){
        if(BOOKS[item].id === id) return item
    }
    return -1
}
function undoFromComplete(id) {
    const target = findBook(id)
    if (target === null) return
    target.isComplete = false
    document.dispatchEvent(new Event(RENDER))
    save()
}
function delBook(id) {
    const target = findIndex(id)
    if(target === -1) return
    BOOKS.splice(target, 1)
    document.dispatchEvent(new Event(RENDER))
    save()
}
function completed(id) {
    const target = findBook(id)
    if (target === null)return
    target.isComplete = true
    document.dispatchEvent(new Event(RENDER))
    save()
}
function loadData() {
    let data = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (data !== null) {
        for(const item of data){
            BOOKS.push(item)
        }
    }
    document.dispatchEvent(new Event(RENDER))
}
function searchData(){
    const rakNonComplete = document.getElementById('non-complete')
    rakNonComplete.innerHTML = ''
    const rakComplete = document.getElementById('is-complete')
    rakComplete.innerHTML = ''

    const title = document.querySelector('#search-title').value.toLowerCase()
    const filterBooks = BOOKS.filter(function(item){
        return item.title.toLowerCase().includes(title)
    })

    for(const item of filterBooks){
        const element = contentContainer(item)
        if (!item.isComplete) {
            rakNonComplete.append(element)
        } else {
            rakComplete.append(element)
        }
    }
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
    article.append(title, author, year, btnAction)
    if (dataBook.isComplete) {
        const btnUnfinished = document.createElement('button')
        btnUnfinished.innerText = 'Belum Selesai'
        btnUnfinished.classList.add('end-read-btn')
        btnUnfinished.addEventListener('click', function(){
            undoFromComplete(dataBook.id)
        })
        const btnDel = document.createElement('button')
        btnDel.innerText = 'Hapus'
        btnDel.classList.add('del-btn-finished')
        btnDel.addEventListener('click', function(){
            delBook(dataBook.id)
        })

        btnAction.append(btnUnfinished, btnDel)
    } else {
        const btnFinished = document.createElement('button')
        btnFinished.innerText = 'Selesai'
        btnFinished.classList.add('end-read-btn')
        btnFinished.addEventListener('click', function(){
            completed(dataBook.id)
        })

        const btnDel = document.createElement('button')
        btnDel.innerText = 'Hapus'
        btnDel.classList.add('del-btn')
        btnDel.addEventListener('click', function(){
            delBook(dataBook.id)
        })

        btnAction.append(btnFinished, btnDel)
    }
    return article
}
window.addEventListener('load', function(){
    const btnSubmit = document.getElementById('form')
    const filtered = document.getElementById('search-form')
    btnSubmit.addEventListener('submit', function(e){
        e.preventDefault()
        input()
    })
    filtered.addEventListener('submit', function(e){
        e.preventDefault()
        searchData()
    })

    if (checkStorage()) {
        loadData()
    }
})
document.addEventListener(RENDER, function(){
    const unFinished = document.getElementById('non-complete')
    unFinished.innerHTML = ''
    const finished = document.getElementById('is-complete')
    finished.innerHTML = ''

    for(const item of BOOKS){
        const bookEl = contentContainer(item)
        if (!item.isComplete)
            unFinished.append(bookEl)
        else
            finished.append(bookEl)
    }
})