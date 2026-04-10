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

const img = document.getElementById("character-img");
const characterName = document.getElementById("character-name");
const desc = document.getElementById("character-desc");
const card = document.getElementById("character-card");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const dotsContainer = document.getElementById("dots");

function updateCharacter(index) {
  card.classList.add("fade-out");
  
  setTimeout(() => {
    const character = characters[index];
    img.src = character.image;
    characterName.textContent = character.name;
    desc.textContent = character.description;

    updateDots();

    card.classList.remove("fade-out");
    card.classList.add("fade-in");

    setTimeout(() => {
      card.classList.remove("fade-in");
    }, 400);
    
  }, 400);
}

function nextCharacter() {
  currentIndex = (currentIndex + 1) % characters.length;
  updateCharacter(currentIndex);
}

function prevCharacter() {
  currentIndex = (currentIndex - 1 + characters.length) % characters.length;
  updateCharacter(currentIndex);
}

function createDots() {
  characters.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateCharacter(currentIndex);
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
  clearInterval(autoSlide); // to prevent stacking multiple intervals
  autoSlide = setInterval(nextCharacter, 5000);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

nextBtn.addEventListener("click", nextCharacter);
prevBtn.addEventListener("click", prevCharacter);

document.querySelector(".character-section")
  .addEventListener("mouseenter", stopAutoSlide);

document.querySelector(".character-section")
  .addEventListener("mouseleave", startAutoSlide);

createDots();
updateCharacter(currentIndex);
startAutoSlide();
