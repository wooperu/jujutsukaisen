const characters = [
  {
    name: "Yuji Itadori",
    image: "images/characters/chara-illust-itadori.png",
    description: "A high school student with immense physical strength who became the vessel of Sukuna."
  },
  {
    name: "Fushiguro Megumi",
    image: "images/characters/chara-illust-fushiguro.png",
    description: "A sorcerer who uses shadow-based techniques and summons shikigami."
  },
  {
    name: "Kugisaki Nobara",
    image: "images/characters/chara-illust-kugisaki.png",
    description: "A confident sorcerer who uses cursed tools like nails and a hammer."
  },
  {
    name: "Gojo Satoru",
    image: "images/characters/chara-illust-gojo.png",
    description: "The strongest jujutsu sorcerer with limitless cursed energy and Six Eyes."
  }
];

let currentIndex = 0;
let autoSlide;
let isAnimating = false;

const img = document.getElementById("character-img");
const characterName = document.getElementById("character-name");
const desc = document.getElementById("character-desc");
const card = document.getElementById("character-card");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const dotsContainer = document.getElementById("dots");

function updateCharacter(index, direction = "next") {
  if (isAnimating) return;
  isAnimating = true;
  currentIndex = index;

  const outClass = direction === "next" ? "slide-out-left" : "slide-out-right";
  const inClass  = direction === "next" ? "slide-in-right" : "slide-in-left";

  card.classList.add(outClass);

  setTimeout(() => {
    const character = characters[currentIndex];
    img.src = character.image;
    img.alt = character.name;
    characterName.textContent = character.name;
    desc.textContent = character.description;
    updateDots();

    card.classList.remove(outClass);
    card.classList.add(inClass);

    setTimeout(() => {
      card.classList.remove(inClass);
      isAnimating = false;
    }, 400);
  }, 400);
}

function nextCharacter() {
  updateCharacter((currentIndex + 1) % characters.length, "next");
}

function prevCharacter() {
  updateCharacter((currentIndex - 1 + characters.length) % characters.length, "prev");
}

function createDots() {
  characters.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.addEventListener("click", () => {
      if (index === currentIndex || isAnimating) return;
      const direction = index > currentIndex ? "next" : "prev";
      updateCharacter(index, direction);
      startAutoSlide();
    });
    dotsContainer.appendChild(dot);
  });
}

function updateDots() {
  const dots = dotsContainer.children;
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }
  dots[currentIndex].classList.add("active");
}

function startAutoSlide() {
  clearInterval(autoSlide);
  autoSlide = setInterval(nextCharacter, 5000);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

let touchStartX = 0;

document.querySelector(".character-section").addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

document.querySelector(".character-section").addEventListener("touchend", (e) => {
  const delta = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(delta) < 50) return;
  if (delta > 0) {
    nextCharacter();
  } else {
    prevCharacter();
  }
});

nextBtn.addEventListener("click", nextCharacter);
prevBtn.addEventListener("click", prevCharacter);

document.querySelector(".character-section")
  .addEventListener("mouseenter", stopAutoSlide);

document.querySelector(".character-section")
  .addEventListener("mouseleave", startAutoSlide);

createDots();
updateCharacter(currentIndex);
startAutoSlide();