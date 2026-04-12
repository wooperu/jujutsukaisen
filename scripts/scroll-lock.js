const characterSection = document.querySelector('.character-section');
let wheelCooldown = false;

function isSectionInView() {
  const rect = characterSection.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  return rect.top <= windowHeight * 0.35 && rect.bottom >= windowHeight * 0.65;
}

window.addEventListener('wheel', (e) => {
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