const openButtons = document.querySelectorAll('[data-modal-target]');
const closeButtons = document.querySelectorAll('[data-close]');

function closeAllModals() {
  document.querySelectorAll('.modal.open').forEach((modal) => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  });
}

openButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modalId = button.getAttribute('data-modal-target');
    const targetModal = document.getElementById(modalId);

    if (!targetModal) {
      return;
    }

    if (modalId !== 'order-modal') {
      closeAllModals();
    }

    targetModal.classList.add('open');
    targetModal.setAttribute('aria-hidden', 'false');
  });
});

closeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    if (modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    }
  });
});

document.querySelectorAll('.modal').forEach((modal) => {
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    }
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeAllModals();
  }
});
