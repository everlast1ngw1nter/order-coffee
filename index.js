let addButton = document.querySelector('.add-button');

addButton.addEventListener('click', addNewDrink);

let clicksCounter = 1;
function addNewDrink() {
    let allBeverages = document.querySelectorAll('.beverage');
    let toCloneElement = allBeverages[0];
    let newElement = toCloneElement.cloneNode(true);
    for (let radio of newElement.querySelectorAll("input[type=radio]")) {
        radio.name = "milk" + clicksCounter;
    }
    allBeverages[allBeverages.length - 1].after(newElement);
    clicksCounter++;
    newElement.querySelector('.beverage-count').textContent = `Напиток №${clicksCounter}`;

    let closeButton = document.createElement('input');
    closeButton.type = 'button';
    closeButton.style.float = 'right';
    closeButton.style.backgroundColor = 'red';
    closeButton.value = 'X';
    newElement.firstChild.after(closeButton);
    closeButton.addEventListener('click', (ev) => {
        newElement.remove();
        clicksCounter--;
    })
}

document.querySelector('.submit-button').addEventListener('click',function(e){
    let modal = document.getElementById('modal');
    // modal.querySelector('p')
    //     .textContent = `${getDrinksCountString()}`
    e.preventDefault();
    modal.classList.add('modal_active');
});

document.querySelector('.submit-button').addEventListener('click',function(e){
    let modal = document.getElementById('modal');
    let textNode = document.createTextNode(`Вы заказали ${clicksCounter} напитков`);
    if (clicksCounter % 10 === 1 && clicksCounter !== 11){
        textNode = document.createTextNode(`Вы заказали ${clicksCounter} напиток`);
    }
    else if ((clicksCounter % 10 === 2 || clicksCounter % 10 === 3 ||clicksCounter % 10 === 4) && clicksCounter !== 12 && clicksCounter !== 13 && clicksCounter !== 14 ){
        textNode = document.createTextNode(`Вы заказали ${clicksCounter} напитка`);
    }
    else{
        textNode = document.createTextNode(`Вы заказали ${clicksCounter} напитков`);
    }

    document.querySelector('.modalContent').appendChild(textNode);
    e.preventDefault();
    updateModalTable();
    modal.classList.add('modal_active');
});

document.querySelector('.modalCloseButton').addEventListener('click', function(e){
    let modal = document.getElementById('modal');
    modal.classList.remove('modal_active');
    location.reload();
})

const dict = {
    'espresso': 'Эспрессо',
    'capuccino': 'Капучино',
    'cacao': 'Какао',
    'usual' : 'Обычное',
    'no-fat' : 'Обезжиренное',
    'soy' : 'Соевое',
    'coconut' : 'Кокосовое',
}

function updateModalTable() {
    const beverages = [];
    const fields = document.querySelectorAll('.beverage');
    console.log(fields);
    fields.forEach((field, index) => {
        const beverageName = field.querySelector('select').value;
        const milkType = field.querySelector('input[type="radio"]:checked').value;
        const extras = [];
        field.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
            extras.push(checkbox.nextElementSibling.textContent);
        });
        beverages.push({
            beverage: dict[beverageName],
            milk: dict[milkType],
            extras: extras.join(', ')
        });
    });

    const modalTableBody = document.querySelector('.modal-table tbody');
    modalTableBody.innerHTML = '';
    console.log(beverages);
    beverages.forEach(beverage => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${beverage.beverage}</td>
            <td>${beverage.milk}</td>
            <td>${beverage.extras}</td>
        `;
        modalTableBody.appendChild(row);
    });
}