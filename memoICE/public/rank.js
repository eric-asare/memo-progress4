window.addEventListener('load', () => {
    let goBackButton = document.getElementById('go-back');

    goBackButton.addEventListener('click', () => {
        window.location = './index.html';
    })

})