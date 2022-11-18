const form = document.querySelector('form');

const selectFrom = document.querySelector('#from_valyuta');
const selectTo = document.querySelector('#to_valyuta');

const toInput = document.querySelector('#to_input');
const fromInput = document.querySelector('#from_input');

let direction = true;

const baseUrl = 'https://api.exchangerate.host/';
const symbolsUrl = new URL('/symbols', baseUrl);
const converterUrl = new URL('/convert', baseUrl);
const symbols = fetch(symbolsUrl).then(res => res.json())
.then(data => {
    Object.keys(data.symbols).map((v, i) => {
        selectFrom.options[selectFrom.options.length] = new Option(v, v);
        selectTo.options[selectTo.options.length] = new Option(v, v);
    });
});

form.addEventListener('input', ()=> {
    const formData = new FormData(form);
    const from_valyuta = formData.get('from_valyuta');
    const to_valyuta = formData.get('to_valyuta');

    const from_input = formData.get('from_input')
    const to_input = formData.get('to_input')
    // console.log(`From Valyuta : ${from_valyuta} to valyuta: ${to_valyuta} From input: ${from_input} To input: ${to_input}`);

    if(from_valyuta != '0' && to_valyuta != '0') {

        if (direction) {
            converterUrl.searchParams.set('from', from_valyuta);
            converterUrl.searchParams.set('to', to_valyuta);
            converterUrl.searchParams.set('amount', from_input);
            fetch(converterUrl).then(res => res.json())
            .then(data => {
                toInput.value = data.result;
            });
        }
        else {
            console.log(toInput);
            converterUrl.searchParams.set('from', to_valyuta);
            converterUrl.searchParams.set('to', from_valyuta);
            converterUrl.searchParams.set('amount', to_input);
            fetch(converterUrl).then(res => res.json())
            .then(data => {
                console.log(data.result);
                fromInput.value = data.result;
            });
        }

    }
});


toInput.addEventListener('keyup', ()=> {
    direction = false;
});

fromInput.addEventListener('keyup', ()=> {
    direction = true;
});

selectFrom.addEventListener('select', ()=> {
    direction = true;
});

selectTo.addEventListener('select', ()=> {
    direction = true;
})