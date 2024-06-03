// const sendBtn = document.querySelector('')
const sendBtn = document.querySelector('.snd-btn')
const inputList = [... document.querySelectorAll('.input')]
let state = false
let fieldState = false
let n = 0
let accountNumber = 0

function visualValidation(currentElement, state) {
    if(state) {
        currentElement.style.cssText = `border: 2px solid green;`
    }

    else {
        currentElement.style.cssText = `border: 2px solid red;`
    }
}

function emailValid(element, currentInputValue) {
    const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i

    if(emailReg.test(currentInputValue)) {
        state = true
        visualValidation(element, state)
    }

    else {
        state = false
        visualValidation(element, state)
    }
}

function dataValid(currentElement, currentInputValue) {
   const dataReg = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/i

    if(dataReg.test(currentInputValue)) {
        state = true
        visualValidation(currentElement, state)
    }

    else {
        state = false
        visualValidation(currentElement, state)
    }
}

function passValid(currentElement, currentInputValue, confirmPasswordValue) {
    const passReg = /^(?=.*[A-Z])(?=.*\d)(?=.*[$*&@#()])[A-Za-z\d$*&@#()]{8,22}$/i


    if(passReg.test(currentInputValue)) {
        state = true
        
        if(confirmPasswordValue != '' && currentInputValue != confirmPasswordValue) {
            visualValidation(document.querySelector('.confirm-password'), false)
        }

        else if(confirmPasswordValue != '' && currentInputValue == confirmPasswordValue) {
            visualValidation(document.querySelector('.confirm-password'), true)
        }
        
        visualValidation(currentElement, state)
    }

    else {
        state = false
        visualValidation(currentElement, state)
    }
}

function confirmPassValid(currentElement, currentInputValue, passwordValue) {
    const passReg = /^(?=.*[A-Z])(?=.*\d)(?=.*[$*&@#()])[A-Za-z\d$*&@#()]{8,22}$/i

    if(currentInputValue == passwordValue && passReg.test(currentInputValue)) {
        state = true

        visualValidation(currentElement, state)
    }

    else {
        state = false
        visualValidation(currentElement, state)
    }   
}

function sexValid(currentElement, currentInputValue) {
    const sexReg = /^(?:[Mm]|[Ff]|[Oo][Uu][Tt][Rr][Oo])$/i


    if(sexReg.test(currentInputValue)) {
        state = true
        visualValidation(currentElement, state)
    }

    else {
        state = false
        visualValidation(currentElement, state)
    }
}

function nameValid(currentElement, currentInputValue) {
    const nameReg = /^[A-Za-z\d]{4,}$/i

    if(nameReg.test(currentInputValue)) {
        state = true
        visualValidation(currentElement, state)
    }

    else {
        state = false
        visualValidation(currentElement, state)
    }
}

function inputValidation(event) {
    const inputElement = event.target
    const inputElementValue = event.target.value
    const passwordValue = document.querySelector('.password').value
    let confirmPasswordValue = ''

    if(!inputElement.classList.contains('login-input')) {
        confirmPasswordValue = document.querySelector('.confirm-password').value
    }

    if(inputElement.type == 'email') {
        emailValid(inputElement, inputElementValue)
    }

    else if(inputElement.type == 'text' && inputElement.classList.contains('birth-data')) {
        dataValid(inputElement, inputElementValue)
    }

    else if(inputElement.classList.contains('password')) {
        passValid(inputElement, inputElementValue, confirmPasswordValue)
    }

    else if(inputElement.classList.contains('confirm-password')) {
        confirmPassValid(inputElement, inputElementValue, passwordValue)
    }

    else if(!inputElement.classList.contains('login-input') && inputElement.classList.contains('sex')) {
        sexValid(inputElement, inputElementValue)
    }

    else if(!inputElement.classList.contains('login-input') && inputElement.classList.contains('name')) {
        nameValid(inputElement, inputElementValue)
    }
}

inputList.forEach((element) => {
    element.addEventListener('keyup', inputValidation)
})

function changeBtnStyle(color) {
    sendBtn.style.cssText = `box-shadow: inset 300px 0 0 0 ${color}; transition: 2s;`
    sendBtn.innerText = ''
    sendBtn.disabled = true
}

function addLetter(text, n) {
    let lettersList = [... text]

    let intervalo = setInterval(() => {
        if(text.length-1 >= n) {
            sendBtn.innerHTML += lettersList[n]
            n++
        }

        else {
            clearInterval(intervalo)
        }
    }, 100)
}

function addNewAccount(inputList, state) {
        if(!inputList[0].classList.contains('login-input')) {
            let emailAccount
            let passwordAccount

            inputList.forEach((element) => {
                if(element.classList.contains('email')) {
                    emailAccount = element.value
                }
                
                else if(element.classList.contains('password')) {
                    passwordAccount = element.value
                }
            })

            let account = {email: emailAccount, senha: passwordAccount}
            let jsonAccount = JSON.stringify(account)

            if(localStorage.getItem(`account:${emailAccount}`) == null) {
                localStorage.setItem(`account:${emailAccount}`, jsonAccount)

                changeBtnStyle('green')
                addLetter('Cadastro completo', n)

                setTimeout(() => {
                    window.location.href = '../login-page.html'
                }, 3000)
            }

            else {
                // mandar aviso dizendo que o login ja existe (com esse email)
                console.log('ja tem')
            }    
        }
}

function showWarning(sendBtn, state, n) {
    let text = 'Cadastro Incompleto'

    if(state) {
        addNewAccount(inputList, state)
    }

    else { // fazendo a animação do btn
        changeBtnStyle('red')

        setTimeout(() => {sendBtn.disabled = false}, 2000)
        
        addLetter(text, n)
    }
}

function verifyFields(evet) {
    for(element of inputList) {
        if(element.value.length <= 0 || state == false) {
            state = false

            break
        }

        else {
            state = true
        }
    }

    showWarning(sendBtn, state, n)
    
}

sendBtn.addEventListener('click', verifyFields)

// olho ta mt pequeno pra clicar
// fazer (linha 205) depois ver a situação do login (verificar se o login existe, e os erros que vai acontecer nele)