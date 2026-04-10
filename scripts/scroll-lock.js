const mainSection = document.querySelector('.character-section');
const cardContainer = document.querySelector('.character-card');
const scrollDelay = 600;

let isScrolling = false;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const sectionTop = mainSection.offsetTop;
  const sectionHeight = mainSection.offsetHeight;

  if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
    mainSection.style.top = '0';
    mainSection.style.left = '0';
    mainSection.style.width = '100%';
  } else {
    mainSection.style.position = 'relative';
    mainSection.style.top = '';
  }
});

const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
let currentIndex = 0;
const characters = [];

function showCharacter(index) {
  if (isScrolling) return;
  isScrolling = true;

  const card = document.getElementById('character-card');
  card.style.opacity = '0';
  card.style.transform = 'translateX(-50px)';

  setTimeout(() => {
    const character = characters[index];
    document.getElementById('character-img').src = character.image;
    document.getElementById('character-name').textContent = character.name;
    document.getElementById('character-desc').textContent = character.description;

    card.style.opacity = '1';
    card.style.transform = 'translateX(0)';
    
    setTimeout(() => {
      isScrolling = false;
    }, scrollDelay);

  }, scrollDelay);
}

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % characters.length;
  showCharacter(currentIndex);
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + characters.length) % characters.length;
  showCharacter(currentIndex);
});