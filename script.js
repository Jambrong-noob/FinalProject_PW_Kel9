 let bookings = JSON.parse(localStorage.getItem('klinking_bookings') || '[]');

function saveBooking(data) {
  const newBooking = {
    id: Date.now(),
    ...data,
    tanggalPesan: new Date().toISOString(),
    status: 'pending'
  };
  bookings.push(newBooking);
  localStorage.setItem('klinking_bookings', JSON.stringify(bookings));
  return newBooking;
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerHTML = `
    <div style="position: fixed; bottom: 20px; right: 20px; background: #14b898; color: white; padding: 16px 24px; border-radius: 12px; z-index: 2000; box-shadow: 0 4px 12px rgba(0,0,0,0.2); animation: slideIn 0.3s ease;">
      ✓ ${message}
    </div>
  `;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);

  if (!document.querySelector('#notification-style')) {
    const style = document.createElement('style');
    style.id = 'notification-style';
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }
}

const modal = document.getElementById('bookingModal');
let currentService = null;

function openModal(service = null) {
  currentService = service;
  if (modal) {
    modal.classList.add('active');
    if (service && document.getElementById('layanan')) {
      const selectLayanan = document.getElementById('layanan');
      if (selectLayanan) {
        for (let i = 0; i < selectLayanan.options.length; i++) {
          if (selectLayanan.options[i].value === service) {
            selectLayanan.selectedIndex = i;
            break;
          }
        }
      }
    }
  }
}

function closeModal() {
  if (modal) modal.classList.remove('active');
}

function setupPesanButtons() {
  const buttons = document.querySelectorAll('.btn-pesan');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const layanan = btn.getAttribute('data-layanan');
      openModal(layanan);
    });
  });
}

function setupForm() {
  const form = document.getElementById('bookingForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nama = document.getElementById('nama')?.value.trim();
    const telp = document.getElementById('telp')?.value.trim();
    const alamat = document.getElementById('alamat')?.value.trim();
    const layanan = document.getElementById('layanan')?.value;
    const tanggal = document.getElementById('tanggal')?.value;
    const jam = document.getElementById('jam')?.value;
    const catatan = document.getElementById('catatan')?.value || '';

    if (!nama || !telp || !alamat || !tanggal) {
      alert('Mohon isi semua field yang diperlukan!');
      return;
    }

    if (!/^\d{10,13}$/.test(telp.replace(/\D/g, ''))) {
      alert('Nomor telepon tidak valid! Gunakan 10-13 digit angka.');
      return;
    }

    const bookingData = { nama, telp, alamat, layanan, tanggal, jam, catatan };

    saveBooking(bookingData);
    showNotification('Pesanan berhasil dikirim! Admin akan segera menghubungi Anda.');
    form.reset();
    closeModal();
    setMinDate();
  });
}

function setMinDate() {
  const dateInput = document.getElementById('tanggal');
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
  }
}

function setupMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }
}

function setupFaq() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isActive = answer.classList.contains('active');

      document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('active'));
      document.querySelectorAll('.faq-question svg').forEach(icon => {
        icon.style.transform = 'rotate(0deg)';
      });

      if (!isActive) {
        answer.classList.add('active');
        const icon = btn.querySelector('svg');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

function setupScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.service-card, .testimoni-card, .faq-item, .service-detail, .team-grid div, .benefits-grid div'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

function createBubbles() {
  const container = document.getElementById('bubble-container');
  if (!container) return;

  const colors = [
    'rgba(30,120,180,0.15)',
    'rgba(20,184,152,0.12)',
    'rgba(168,217,239,0.2)'
  ];

  for (let i = 0; i < 20; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    const size = 10 + Math.random() * 60;
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.left = Math.random() * 100 + '%';
    bubble.style.bottom = '-60px';
    bubble.style.background = `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6), ${colors[Math.floor(Math.random() * colors.length)]})`;
    bubble.style.animationDuration = (6 + Math.random() * 15) + 's';
    bubble.style.animationDelay = (Math.random() * 12) + 's';
    container.appendChild(bubble);
  }
}

function setupNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

function setupMachineParallax() {
  const machineWrapper = document.querySelector('.machine-wrapper'); 
  if (!machineWrapper) return;

  document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 30;
    const y = (window.innerHeight / 2 - e.pageY) / 30;
    machineWrapper.style.transform = `translate(${x}px, ${y}px)`;
  });
}

function initIcons() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu && mobileMenu.classList.contains('open')) {
          mobileMenu.classList.remove('open');
        }
      }
    });
  });
}

const loading = document.getElementById('loading');
const apiData = document.getElementById('api-data');


document.addEventListener('DOMContentLoaded', () => {
  initIcons();
  setupPesanButtons();
  setupForm();
  setupMobileMenu();
  setupFaq();
  setupScrollReveal();
  createBubbles();
  setMinDate();
  setupSmoothScroll();
  setupNavbarScroll();  
  setupMachineParallax(); 

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
  }
});


    document.addEventListener('DOMContentLoaded', function () {

    const apiData = document.getElementById('api-data');
    const loading = document.getElementById('loading');

    const articles = [


    {
        title: "Promo Laundry 20%",
        desc: "Nikmati diskon 20% untuk semua layanan laundry selama bulan ini.",
        image: "image/diskon20%.jpg"
    },

    {
        title: "Cuci Express 24 Jam",
        desc: "Layanan express membuat pakaian selesai hanya dalam 24 jam.",
        image: "image/24jam.jpg"
    },

    {
        title: "Gratis Antar Jemput",
        desc: "Khusus area Pringgolayan tersedia layanan antar jemput gratis.",
        image: "image/freedeliv.jpg"
    },

    {
        title: "Tips Merawat Pakaian Putih",
        desc: "Pisahkan pakaian putih dan gunakan deterjen khusus agar warna tetap cerah.",
        image: "image/peduli.jpg"
    },

    {
        title: "Laundry Hotel & Kos",
        desc: "Kami menerima laundry dalam jumlah besar untuk hotel dan anak kos.",
        image: "image/hotel.jpg"
    },

    {
        title: "Paket Hemat Bulanan",
        desc: "Tersedia paket langganan laundry bulanan dengan harga lebih murah.",
        image: "image/promo.png"
    },

    {
        title: "Setrika Premium",
        desc: "Pakaian disetrika dengan rapi menggunakan pewangi premium.",
        image: "image/setrika.png"
    },

    {
        title: "Laundry Sepatu",
        desc: "Kami melayani pencucian sepatu agar kembali bersih dan wangi.",
        image: "image/sepatu.jpg"
    },

    {
        title: "Laundry Selimut",
        desc: "Selimut dan bed cover dicuci menggunakan mesin khusus berkapasitas besar.",
        image: "image/selimut.jpg"
    },

    {
        title: "Jam Operasional",
        desc: "Buka setiap hari mulai pukul 08.00 hingga 21.00 WIB.",
        image: "image/jam.jpg"
    }

     ];

    
    loading.style.display = 'block';

    
    setTimeout(() => {

        loading.style.display = 'none';

        articles.forEach(item => {

            const card = document.createElement('div');

            card.classList.add('api-card');

            card.style.backgroundImage = `url(${item.image})`;

            card.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
            `;

            apiData.appendChild(card);

        });

    }, 2000);

});