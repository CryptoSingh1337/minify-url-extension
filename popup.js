const copy = document.getElementById('copy');
copy.addEventListener('click', (e) => {
    const input = document.getElementById('url');
    input.select();
    document.execCommand('copy');
});

function checkURL(url) {
    const pattern = new RegExp('^htt(p|ps)://');
    return pattern.test(url);
}

function getInputField() {
    return document.getElementById('url');
}

document.getElementById('submitButton').addEventListener('click', async (e) => {
    const input = getInputField();
    if (input.value === '') {
        const alert = document.getElementById('alert');
        alert.innerHTML = 'Please enter a URL!';
        alert.classList.toggle('visually-hidden');
    } else {
        const value = input.value;
        const isValid = checkURL(value);
        if (isValid) {
            // http://localhost:5000/?url=${value}
            const response = await (await fetch(`http://localhost:5000/?url=${value}`, { method: 'POST' })).json();
            input.value = response.short_url;
                
        } else {
            const alert = document.getElementById('alert');
            alert.innerHTML = 'Please enter the url<br>Like: https://www.google.com';
            alert.classList.toggle('visually-hidden');
            setTimeout(() => {
                alert.classList.toggle('visually-hidden');
            }, 1500);
        }
    }
});