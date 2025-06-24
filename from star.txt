document.addEventListener('DOMContentLoaded', () => {
  const присутствиеRadios = document.querySelectorAll('input[name="присутствие"]');
  const типГостяRadios = document.querySelectorAll('input[name="тип_гостя"]');
  const блокСамИлиСемья = document.getElementById('блок_сам_или_семья');
  const семьяBlock = document.getElementById('семья');
  const детиCheckbox = document.getElementById('детиЧек');
  const супругCheckbox = document.getElementById('супругЧек');
  const детиBlock = document.getElementById('дети');
  const детиTextarea = document.querySelector('textarea[name="дети_ввод"]');
  const супругBlock = document.getElementById('супруг');
  const супругInput = document.getElementById('супругИмя');

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
        updateSpouseVisibility();
        updateСКем();
      } else {
        семьяBlock.style.display = 'none';
        resetFamilyBlock();
        updateСКем();
      }
    });
  });

  // Обработка чекбоксов
  детиCheckbox.addEventListener('change', () => {
    updateChildrenVisibility();
    updateСКем();
  });

  супругCheckbox.addEventListener('change', () => {
    updateSpouseVisibility();
    updateСКем();
  });

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

/*   function updateSpouseVisibility() {
    if (супругCheckbox.checked) {
      супругBlock.style.display = 'block';
      супругInput.removeAttribute('disabled');
      супругInput.removeAttribute('required'); // можно включить при необходимости
    } else {
      супругBlock.style.display = 'none';
      супругInput.setAttribute('disabled', 'disabled');
      супругInput.value = '';
    }
  } */

  function updateSpouseVisibility() {
    if (супругCheckbox.checked) {
      супругBlock.style.display = 'block';
      супругInput.removeAttribute('readonly');
    } else {
      супругBlock.style.display = 'none';
      супругInput.value = '';
      супругInput.setAttribute('readonly', 'readonly'); // визуально отключить, но оставить в форме
    }
  }
  
  function resetFamilyBlock() {
    детиCheckbox.checked = false;
    супругCheckbox.checked = false;
    updateChildrenVisibility();
    updateSpouseVisibility();
  }

  function resetТипГостяBlock() {
    типГостяRadios.forEach(radio => radio.checked = false);
    семьяBlock.style.display = 'none';
    resetFamilyBlock();
  }
});

// Функция формирования поля "с_кем"
function updateСКем() {
  const супругЧек = document.getElementById("супругЧек");
  const детиЧек = document.getElementById("детиЧек");
  const сКемInput = document.getElementById("сКемInput");

  if (супругЧек.checked && детиЧек.checked) {
    сКемInput.value = "семья полная";
  } else if (супругЧек.checked) {
    сКемInput.value = "супруг";
  } else if (детиЧек.checked) {
    сКемInput.value = "дети";
  } else {
    сКемInput.value = "";
  }
  }