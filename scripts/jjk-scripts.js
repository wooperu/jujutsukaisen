const characters = [
  {
    name: "Yuji Itadori",
    image: "images/characters/chara-illust-itadori.png",
    description: "A high school student with immense physical strength who became the vessel of Sukuna.",
    theme: null
  },
  {
    name: "Fushiguro Megumi",
    image: "images/characters/chara-illust-fushiguro.png",
    description: "A sorcerer who uses shadow-based techniques and summons shikigami.",
    theme: null
  },
  {
    name: "Kugisaki Nobara",
    image: "images/characters/chara-illust-kugisaki.png",
    description: "A confident sorcerer who uses cursed tools like nails and a hammer.",
    theme: null
  },
  {
    name: "Gojo Satoru",
    image: "images/characters/chara-illust-gojo.png",
    description: "The strongest jujutsu sorcerer with Limitless Cursed Technique and Six Eyes.",
    theme: "audio/gojo-theme.mp3"
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
const characterSection = document.querySelector(".character-section");
const characterTheme = document.getElementById("character-theme");
const muteBtn = document.getElementById("mute-btn");
let fadeIn;

let userHasInteracted = false;

document.addEventListener("click", () => { userHasInteracted = true; }, { once: true });
document.addEventListener("keydown", () => { userHasInteracted = true; }, { once: true });
document.addEventListener("scroll", () => { userHasInteracted = true; }, { once: true });

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

    if (character.theme && userHasInteracted) {
      characterTheme.src = character.theme;
      characterTheme.currentTime = 0;
      characterTheme.volume = 0.5;
      characterTheme.play().catch(() => {
        console.warn("Theme blocked by browser.");
      });
      fadeIn = setInterval(() => {
        if (characterTheme.volume < 1.0) {
          characterTheme.volume = Math.min(1.0, characterTheme.volume + 0.02);
        } else {
          clearInterval(fadeIn);
        }
      }, 60);
      muteBtn.disabled = false;
      muteBtn.style.opacity = "1";
    } else {
      clearInterval(fadeIn);
      characterTheme.pause();
      characterTheme.currentTime = 0;
      muteBtn.disabled = true;
      muteBtn.style.opacity = "0.3";
    }

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

muteBtn.addEventListener("click", () => {
  characterTheme.muted = !characterTheme.muted;
  muteBtn.textContent = characterTheme.muted ? "🔇" : "🔊";
});

function startAutoSlide() {
  clearInterval(autoSlide);
  autoSlide = setInterval(nextCharacter, 5000);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

let wheelCooldown = false;

function isSectionInView() {
  const rect = characterSection.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  return rect.top <= windowHeight * 0.35 && rect.bottom >= windowHeight * 0.65;
}

window.addEventListener("wheel", (e) => {
  if (!isSectionInView() || wheelCooldown) return;

  e.preventDefault();
  wheelCooldown = true;

  if (e.deltaY > 0) {
    nextCharacter();
  } else {
    prevCharacter();
  }

  setTimeout(() => {
    wheelCooldown = false;
  }, 900);

}, { passive: false });

let touchStartX = 0;

characterSection.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

characterSection.addEventListener("touchend", (e) => {
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

characterSection.addEventListener("mouseenter", stopAutoSlide);
characterSection.addEventListener("mouseleave", startAutoSlide);

createDots();
updateCharacter(currentIndex);
startAutoSlide();