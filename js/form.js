document.addEventListener('DOMContentLoaded', () => {
  const присутствиеRadios = document.querySelectorAll('input[name="присутствие"]');
  const типГостяRadios = document.querySelectorAll('input[name="тип_гостя"]');
  const блокСамИлиСемья = document.getElementById('блок_сам_или_семья');
  const семьяBlock = document.getElementById('семья');
  const детиCheckbox = document.getElementById('детиЧек');
  const супругCheckbox = document.getElementById('супругЧек');
  const детиBlock = document.getElementById('дети');
  const детиTextarea = document.querySelector('input[name="дети_ввод"]');

  // Обработка выбора "Приду?"
  присутствиеRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === 'да' && radio.checked) {
        блокСамИлиСемья.style.display = 'block';
      } else {
        блокСамИлиСемья.style.display = 'none';
        resetТипГостяBlock();
      }
    });
  });

  // Обработка выбора "тип гостя"
  типГостяRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === 'семья' && radio.checked) {
        семьяBlock.style.display = 'block';
        updateChildrenVisibility();
        updateСКем();
      } else {
        семьяBlock.style.display = 'none';
        resetChildrenBlock();
        updateСКем();
      }
    });
  });

  // Обработка чекбоксов супруг / дети
  детиCheckbox.addEventListener('change', () => {
    updateChildrenVisibility();
    updateСКем();
  });

  супругCheckbox.addEventListener('change', () => {
    updateСКем();
  });

  // Показать или скрыть блок ввода детей
  function updateChildrenVisibility() {
    if (детиCheckbox.checked) {
      детиBlock.style.display = 'block';
      детиTextarea.removeAttribute('disabled');
      детиTextarea.setAttribute('required', 'required');
    } else {
      детиBlock.style.display = 'none';
      детиTextarea.setAttribute('disabled', 'disabled');
      детиTextarea.removeAttribute('required');
      детиTextarea.value = '';
    }
  }

  function resetChildrenBlock() {
    детиCheckbox.checked = false;
    супругCheckbox.checked = false;
    updateChildrenVisibility();
    updateСКем();
  }

  function resetТипГостяBlock() {
    типГостяRadios.forEach(radio => radio.checked = false);
    семьяBlock.style.display = 'none';
    resetChildrenBlock();
  }
});

// Функция формирования поля "с_кем"
function updateСКем() {
  const супругЧек = document.getElementById("супругЧек");
  const детиЧек = document.getElementById("детиЧек");
  const сКемInput = document.getElementById("сКемInput");

  const части = [];

  if (супругЧек && супругЧек.checked) {
    части.push("супруг");
  }
  if (детиЧек && детиЧек.checked) {
    части.push("дети");
  }

  сКемInput.value = части.join("+"); // например: супруг+дети
}
