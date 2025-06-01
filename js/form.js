document.addEventListener('DOMContentLoaded', () => {
    const присутствиеRadios = document.querySelectorAll('input[name="присутствие"]');
    const блокСамИлиСемья = document.getElementById('блок_сам_или_семья');

    const типГостяRadios = document.querySelectorAll('input[name="тип_гостя"]');
    const семьяBlock = document.getElementById('семья');
    const детиCheckbox = document.getElementById('детиЧек');
    const детиBlock = document.getElementById('дети');
    const добавитьРебёнкаBtn = document.getElementById('добавитьРебёнка');

    // Отслеживаем выбор "Приду?"
    присутствиеRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        if (radio.value === 'да' && radio.checked) {
          блокСамИлиСемья.style.display = 'block';
        } else {
          блокСамИлиСемья.style.display = 'none';
          // Сбросить выбор и скрыть вложенные блоки
          resetТипГостяBlock();
        }
      });
    });

    // Показывать/скрывать блок семья при выборе типа гостя
    типГостяRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        if (radio.value === 'семья' && radio.checked) {
          семьяBlock.style.display = 'block';
          updateChildrenRequired();
        } else {
          семьяBlock.style.display = 'none';
          resetChildrenBlock();
        }
      });
    });

    // Показывать/скрывать блок дети
    детиCheckbox.addEventListener('change', () => {
      if (детиCheckbox.checked) {
        детиBlock.style.display = 'block';
        updateChildrenRequired(true);
      } else {
        детиBlock.style.display = 'none';
        updateChildrenRequired(false);
      }
    });

    // Добавить нового ребёнка
    добавитьРебёнкаBtn.addEventListener('click', () => {
      const ребёнокDiv = document.createElement('div');
      ребёнокDiv.className = 'ребёнок';
      ребёнокDiv.style.marginTop = '10px';
      ребёнокDiv.innerHTML = `
        <input type="text" class="order__input" name="ребёнок_имя[]" placeholder="Имя ребёнка" required>
        <input type="number" class="order__input" name="ребёнок_возраст[]" placeholder="Возраст" min="0" required>
        <button type="button" class="order__buttt" >Удалить</button>
      `;
      детиBlock.appendChild(ребёнокDiv);

      ребёнокDiv.querySelector('.order__butее').addEventListener('click', () => {
        ребёнокDiv.remove();
      });
    });

    function updateChildrenRequired(required = true) {
      const inputs = детиBlock.querySelectorAll('input');
      inputs.forEach(input => {
        if (required) {
          input.setAttribute('required', 'required');
        } else {
          input.removeAttribute('required');
        }
      });
    }

    function resetChildrenBlock() {
      семьяBlock.querySelectorAll('input[type=checkbox]').forEach(chk => chk.checked = false);
      детиBlock.style.display = 'none';
      updateChildrenRequired(false);

      const дети = детиBlock.querySelectorAll('.ребёнок');
      дети.forEach((ребёнок, index) => {
        if (index > 0) ребёнок.remove();
        else {
          ребёнок.querySelector('input[name="ребёнок_имя[]"]').value = '';
          ребёнок.querySelector('input[name="ребёнок_возраст[]"]').value = '';
        }
      });
    }

    function resetТипГостяBlock() {
      типГостяRadios.forEach(radio => radio.checked = false);
      семьяBlock.style.display = 'none';
      resetChildrenBlock();
    }
  });