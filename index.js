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