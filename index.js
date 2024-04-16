let addButton = document.querySelector('.add-button');

addButton.addEventListener('click', addNewDrink);

let clicksCounter = 1;
function addNewDrink() {
    let allBeverages = document.querySelectorAll('.beverage');
    let toCloneElement = allBeverages[0];
    let newElement = toCloneElement.cloneNode(true);
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
    modal.classList.add('modal_active');
});

document.querySelector('.modalCloseButton').addEventListener('click', function(e){
    let modal = document.getElementById('modal');
    modal.classList.remove('modal_active');
    location.reload();
})