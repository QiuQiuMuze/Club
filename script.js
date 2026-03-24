const openButtons = document.querySelectorAll('[data-modal-target]');
const closeButtons = document.querySelectorAll('[data-close]');
const serviceTimeTip = document.getElementById('service-time-tip');
const serviceNightImage = document.getElementById('service-night-image');
const serviceDayImage = document.getElementById('service-day-image');

function getChinaTimeParts() {
  const formatter = new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  });
  const parts = formatter.formatToParts(new Date());
  const hour = Number(parts.find((part) => part.type === 'hour')?.value ?? 0);
  const minute = Number(parts.find((part) => part.type === 'minute')?.value ?? 0);

  return { hour, minute };
}

function updateServiceModalContent() {
  if (!serviceTimeTip || !serviceNightImage || !serviceDayImage) {
    return;
  }

  const { hour, minute } = getChinaTimeParts();
  const currentMinutes = hour * 60 + minute;
  const dayStart = 9 * 60 + 30;
  const dayEnd = 17 * 60;
  const nightStart = 17 * 60;
  const nightEnd = 3 * 60;
  const isDayService = currentMinutes >= dayStart && currentMinutes < dayEnd;
  const isNightService = currentMinutes >= nightStart || currentMinutes < nightEnd;

  serviceNightImage.style.display = 'none';
  serviceDayImage.style.display = 'none';

  if (isNightService) {
    serviceTimeTip.textContent = '当前为中国时间夜间服务时段（17:00-次日03:00），请扫码夜间客服。';
    serviceNightImage.style.display = 'block';
    return;
  }

  if (isDayService) {
    serviceTimeTip.textContent = '当前为中国时间白天服务时段（09:30-17:00），请扫码白天客服。';
    serviceDayImage.style.display = 'block';
    return;
  }

  serviceTimeTip.textContent = '当前客服在休息，请在中国时间09:30-17:00或17:00-次日03:00联系。';
}

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

    if (modalId === 'service-modal') {
      updateServiceModalContent();
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

updateServiceModalContent();
