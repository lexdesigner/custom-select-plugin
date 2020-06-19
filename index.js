class Select {
  constructor(params) {
    this.params = params;
    this.selector = document.querySelector(params.selector);
    this.label = params.label;
    this.options = params.options;

    let selectHtml = '<div id="custom-select">';
    selectHtml += '<div id="label" class="select-open-js"><span class="title select-open-js">' + this.params.label + '</span><span id="selected-opt"></span></div>';
    selectHtml += '<div id="options">';
    for (let opt of this.options) {
      selectHtml += '<span class="opt" data-val="' + opt + '">' + opt + '</span>'
    }
    selectHtml += '</div>';
    selectHtml += '</div>';
    this.selector.innerHTML = selectHtml;

    this.btnsOpen = document.querySelectorAll('[data-type="open"]'); //Кнопка открытия селекта
    this.btnsClose = document.querySelectorAll('[data-type="close"]'); //Кнопка закрытия селекта
    this.btnsDestroy = document.querySelectorAll('[data-type="destroy"]'); //Кнопка удаления селекта
    this.btnsSet = document.querySelectorAll('[data-type="set"]'); //Кнопка получения данных
    this.btnsGet = document.querySelectorAll('[data-type="get"]'); //Кнопка выбора данных
    this.btnsClear = document.querySelectorAll('[data-type="clear"]'); //Кнопка очистки селекта
    this.optionsSpan = document.querySelectorAll('.opt'); //выбор всех опций
    this.selectedOpt = document.getElementById('selected-opt'); //Выбранная опция
    this.labelBlock = document.getElementById('label'); //Блок label
    this.log = document.getElementById('log'); //Блок вывода объекта


    let self = this;
    //Открыть\Закрыть селект
    const toogleSelect = function() {
      self.selector.childNodes[0].classList.toggle('open')
    }
    //Открытие селекта
    const openSelect = function() {
      if (!self.selector.childNodes[0].classList.contains('open')) {
        self.selector.childNodes[0].classList.add('open')
      }
    }
    //Закрытие селекта
    const closeSelect = function() {
      if (self.selector.childNodes[0].classList.contains('open')) {
        self.selector.childNodes[0].classList.remove('open')
      }
    }
    //Удаление объекта
    const destroySelect = function() {
      self.selector.innerHTML = '';
    }
    //Закрытие селекта при клике вне области
    document.body.addEventListener('click', event => {
      if (!event.target.classList.contains('select-open-js') && !event.target.getAttribute("data-type")) {
        closeSelect();
      }
    });
    //Получить выбранную опцию
    const selectGetData = () => {
      self.optionsSpan.forEach((item, i) => {
        if (item.classList.contains('active')) {
          self.log.innerText = this.options[i]
        }
      });
    }
    // Очистка селекта
    const selectClear = function() {
      for (let opt of self.optionsSpan) {
        if (opt.classList.contains('active')) {
          opt.classList.remove('active')
        }
      }
      self.selectedOpt.innerText = ''
      if (self.labelBlock.classList.contains('active')) {
        self.labelBlock.classList.remove('active');
      }
      if (self.selector.hasAttribute('data-value')) {
        self.selector.removeAttribute('data-value')
      }
      self.log.innerText = '';
    }
    //Выбор опции
    const selectOption = function(i) {
      self.selectedOpt.innerText = self.options[i]
      self.labelBlock.classList.add('active');
      self.selector.setAttribute('data-value', self.options[i])
      self.optionsSpan[i].classList.add('active');

    }
    this.selector.onclick = function() {
      toogleSelect();
    }
    this.btnsOpen.forEach((item, i) => {
      item.onclick = function() {
        openSelect();
      }
    });
    this.btnsClose.forEach((item, i) => {
      item.onclick = function() {
        closeSelect();
      }
    });
    this.btnsDestroy.forEach((item, i) => {
      item.onclick = function() {
        destroySelect();
      }
    });
    this.optionsSpan.forEach((item, i) => {
      item.onclick = function() {
        selectClear()
        selectOption(i)
        params.onSelect(self.options[i])
      }
    });

    this.btnsSet.forEach((item, i) => {
      item.onclick = function() {
        selectClear();
        selectOption(1);
        params.onSelect(self.options[1])
      }
    });

    this.btnsGet.forEach((item, i) => {
      item.onclick = function() {
        selectGetData()
      }
    });
    this.btnsClear.forEach((item, i) => {
      item.onclick = function() {
        selectClear()
      }
    });

  }
}

const select = new Select({
  selector: '#select',
  label: 'Выберите технологию',
  options: ['vueJs', 'React', 'Angular', 'NodeJs', 'ExpressJs', 'JavaScript', 'PHP', 'C++', 'Phyton'],
  onSelect(selectedItem) {
    console.log(selectedItem)
  }
})
