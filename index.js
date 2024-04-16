let addButton = document.querySelector('.add-button');

addButton.addEventListener('click', addNewDrink);

let clicksCounter = 1;
function addNewDrink() {
    let allBeverages = document.querySelectorAll('.beverage');
    let toCloneElement = allBeverages[0];
    let newElement = toCloneElement.cloneNode(true);

    newElement.querySelectorAll('input[type="text"]').forEach(input => {
        input.value = '';
    });
    newElement.querySelectorAll('input[type="radio"]').forEach((radio, index) => {
        radio.checked = index === 0;
    });
    newElement.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });

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
    });
}


document.querySelector('.submit-button').addEventListener('click',function(e){
    let modal = document.getElementById('modal');
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

    let modalTitle = document.querySelector('.modalTitle');
    modalTitle.parentNode.insertBefore(textNode, modalTitle.nextSibling);
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
document.querySelector('.submit-modal-button').addEventListener('click', function() {
    let orderTimeInput = document.getElementById('order-time');
    let orderTime = orderTimeInput.value;
    let currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    if (orderTime < currentTime) {
        orderTimeInput.style.borderColor = 'red';
        alert("Мы не умеем перемещаться во времени. Выберите время позже, чем текущее.");
    } else {
        let modal = document.getElementById('modal');
        modal.classList.remove('modal_active');
    }
    location.reload()
});
