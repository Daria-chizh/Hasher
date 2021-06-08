export default class HashSelector extends EventTarget {
  static createSymbolElement() {
    const symbol = document.createElement('span');
    symbol.classList.add('symbol');
    symbol.textContent = '↓';
    return symbol;
  }

  constructor(dropdownId) {
    super();
    this.dropdownId = dropdownId;
    this.selectedHash = '';
  }

  render() {
    const symbolElement = HashSelector.createSymbolElement();
    const dropdownContainer = document.getElementById(this.dropdownId);
    const dropdownValue = dropdownContainer.querySelector('.dropdown__value');
    const dropdown = dropdownContainer.querySelector('.dropdown__list');

    dropdownContainer.querySelector('a').addEventListener('click', (event) => {
      event.preventDefault();
      dropdown.classList.toggle('hidden');
    });

    for (const dropdownItem of document.querySelectorAll('.dropdown__item')) {
      dropdownItem.addEventListener('click', (event) => {
        event.preventDefault();

        const underlineElement = document.querySelector('.underline'); // ищем элемент с данным классом

        dropdownItem.classList.add('underline');
        if (underlineElement) {
          underlineElement.classList.remove('underline'); //  удаляем у предыдущего класс
          symbolElement.parentNode.removeChild(symbolElement);
        }
        dropdownItem.appendChild(symbolElement);

        const selectedHash = dropdownItem.querySelector('a').textContent.trim();
        this.selectedHash = selectedHash;
        dropdownValue.textContent = selectedHash;
        this.dispatchEvent(new Event('hashChanged'));
      });
    }
  }
}
