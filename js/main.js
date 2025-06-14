const heroBlocks = document.querySelectorAll(".js-hero-block");
const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {
    const cord = window.scrollY;

    if (cord > window.innerHeight * 3) {
        heroBlocks[0].classList.remove("active");
        heroBlocks[1].classList.add("active");
        hero.classList.add("active");
    } else {
        heroBlocks[1].classList.remove("active");
        heroBlocks[0].classList.add("active");
        hero.classList.remove("active");
    }
});


// Инициализируйте анимацию ЛОМАЕТ фоточки
//var anim = lottie.loadAnimation(animationData);

// work with form
const form = document.querySelector(".js-form");
const loader = document.querySelector(".js-loader");
const success = document.querySelector(".js-success");

setInterval(() => {
    loader.classList.remove("active");
}, 1100);

const toggleRequiredFields = () => {
    const isGuestBlockVisible = document.getElementById("блок_сам_или_семья").style.display !== "none";
    const isKidsBlockVisible = document.getElementById("дети").style.display !== "none";

    document.querySelectorAll('[name="тип_гостя"]').forEach(el => {
        el.required = isGuestBlockVisible;
    });

};
function resetFormState() {
    document.getElementById("блок_сам_или_семья").style.display = "none";
    document.getElementById("семья").style.display = "none";
    document.getElementById("супруг").style.display = "none";
    document.getElementById("дети").style.display = "none";

    // Сброс всех радиокнопок и чекбоксов (на всякий случай)
    document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(input => {
        input.checked = false;
    });

    // Очистка текстового поля детей
    const детиTextarea = document.querySelector('textarea[name="дети_ввод"]');
    if (детиTextarea) детиTextarea.value = "";
}


form.addEventListener("submit", (event) => {
    toggleRequiredFields(); // <--- добавили перед отправкой
    updateСКем(); //
    event.preventDefault();
    loader.classList.add("active");
    document.body.classList.add("is-loader");
    const scriptURL = "https://script.google.com/macros/s/AKfycbyfdnDNCR5ZNneCuPrNOCIYJMrMtbT3BuF1BY9-XRQff7_22dQGdnqqleTfgOWtoLU1bw/exec";

    const dataTime = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
    document.querySelector(".js-form-date").value = dataTime;

    fetch(scriptURL, { method: "POST", body: new FormData(form) })
        .then((response) => {
            console.log("Success!", response);
            loader.classList.remove("active");
            success.classList.add("active");
            document.body.classList.remove("is-loader");

            setTimeout(() => {
                success.classList.remove("active");
            }, 3500);
            form.reset();          // очищаем значения
            resetFormState();      // сбрасываем внешний вид формы
        })
        .catch((error) => {
            console.error("Error!", error.message);
        });
});


// timer
const targetDate = new Date("2025-09-14T12:30:00+02:00").getTime();
const timerElement = document.querySelector(".date__timer");

function updateTimer() {
    const now = new Date().getTime();
    const timeRemaining = targetDate - now;

    if (timeRemaining <= 0) {
        timerElement.textContent = "00:00:00:00";
        clearInterval(countdownInterval);
        return;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
        (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // Форматируем и обновляем текст таймера
    timerElement.textContent = `${days.toString().padStart(2, "0")}:${hours
        .toString()
        .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
}

const countdownInterval = setInterval(updateTimer, 1000);
updateTimer();

/* const isChrome = () => {
    return (
        /Chrome/.test(navigator.userAgent) &&
        !/Edg/.test(navigator.userAgent) &&
        !/OPR/.test(navigator.userAgent)
    );
};

const isSafari = () => {
    return (
        /Safari/.test(navigator.userAgent) &&
        !/Chrome/.test(navigator.userAgent) &&
        !/Edg/.test(navigator.userAgent) &&
        !/OPR/.test(navigator.userAgent)
    );
};

const isTelegram = () => {
    return (
        /Telegram/.test(navigator.userAgent) ||
        /TELEGRAM/.test(navigator.userAgent)
    );
}; */

// Выполняем код только в Chrome и Safari

const titles = document.querySelectorAll(".title");
const texts = document.querySelectorAll(".text");

if ("IntersectionObserver" in window) {
    const typeTextAnimation = (element) => {
        const lines = element.innerHTML.split("<br>");
        element.innerHTML = "";

        let totalDuration = 0;

        lines.forEach((line, index) => {
            const span = document.createElement("span");
            span.textContent = line.trim();
            element.appendChild(span);

            const lineDuration = 0.6;
            // Анимация с использованием GSAP
            gsap.fromTo(
                span,
                { width: 0, opacity: 1 },
                {
                    width: span.scrollWidth,
                    duration: lineDuration,
                    ease: "linear",
                    delay: totalDuration,
                    onStart: () => {
                        element.querySelectorAll("span").forEach((s) => s.classList.remove("blinking"));
                        // Добавляем мигающий курсор на текущую строку
                        span.classList.add("blinking");
                    },
                    onComplete: () => {
                        // Убираем мигающий курсор после завершения печати последней строки
                        if (index === lines.length - 1) {
                            span.classList.remove("blinking");
                        }
                    },
                }
            );

            totalDuration += lineDuration;
        });
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const element = entry.target;
                typeTextAnimation(element); // Запускаем анимацию
                observer.unobserve(element); // Убираем наблюдателя после начала анимации
            }
        });
    }, {
        root: null,     // Настройки для IntersectionObserver
        threshold: 0.1, // 10% элемента должны быть видны, чтобы начать анимацию
    });

    titles.forEach((title) => {
        observer.observe(title);
    });

    const observer2 = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add("visible");
                observer2.unobserve(element);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
    });

    texts.forEach((text) => {
        observer2.observe(text);
    });
} else {
    titles.forEach((el) => {
        el.classList.add("visible");
    });
    // Наблюдаем за всеми элементами с классом text
    texts.forEach((el) => {
        el.classList.add("visible");
    });
}


var swiper = new Swiper(".swiper", {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
