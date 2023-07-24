const loading = document.querySelector('.loading')
const modal = document.querySelector('.modal')
const modalContent = document.querySelector('.modal-content')
const modalClose = document.querySelector('.modal-close')

modalClose.addEventListener('click', function() {
    modal.classList.add('hidden')
})


function getRandomAction() {
    const actions = [
        'Tell me what I should do today',
        'Share your most embarrassing secret',
        'Give me an inpirational quote',
    ]

   const randIndx = Math.floor(Math.random() * actions.length)

   return  actions[randIndx]

}

async function playCharacter(character) {
    loading.classList.remove('hidden')

    const action = getRandomAction()

    const response = await fetch(_CONFIG_.API_BASE_URL + '/chat/completions', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${_CONFIG_.API_KEY}`
        },
        method: 'POST',
        body: JSON.stringify({
            model:_CONFIG_.GPT_MODEL,
            messages: [
            {
                role: 'user',
                content: `You are ${character} and should ${action} in a maximum of 100 characters without breaking character`
            }
        ]
        })

    })

    const jsonData = await response.json()

    const content = jsonData.choices[0].message.content

    modalContent.innerHTML = `
    <h2>${character}</h2>  
    <p>${content}</p>
    <code>One of the Gang answered '${action}'.</code>
    `

    modal.classList.remove('hidden')
    loading.classList.add('hidden')

}
 
 
function start() {
    const characters = document.querySelectorAll('.character')
    
        characters.forEach(function (element) {
        element.addEventListener('click', function ( ) {
        playCharacter(element.dataset.character)
        })
    })
}

start()