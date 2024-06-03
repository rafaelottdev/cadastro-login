const eyeIcon = [... document.querySelectorAll('.eye-icon')]
let clicked = false

function showPass(event) {
    const element = event.target
    console.log()

    if(!clicked) {
        element.classList.remove('fa-eye-slash')
        element.classList.add('fa-eye')

        element.parentNode.children[1].type = 'text'

        clicked = true
    }

    else {
        element.classList.remove('fa-eye')
        element.classList.add('fa-eye-slash')

        element.parentNode.children[1].type = 'password'

        clicked = false
    }
}

eyeIcon.forEach((element) => {
    element.addEventListener('click', showPass)
})
