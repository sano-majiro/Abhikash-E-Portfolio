document.addEventListener('DOMContentLoaded', () => {
  // --- Theme Toggle ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
  } else {
    body.classList.add('light-mode');
    body.classList.remove('dark-mode');
  }

  themeToggleBtn.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    } else {
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    }
  });

  // --- Sticky Header on Scroll ---
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- Mobile Menu Toggle ---
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const line1 = document.getElementById('line1');
  const line2 = document.getElementById('line2');
  const line3 = document.getElementById('line3');

  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    
    // Burger animation
    if (navMenu.classList.contains('open')) {
      line1.setAttribute('x1', '5');
      line1.setAttribute('y1', '5');
      line1.setAttribute('x2', '19');
      line1.setAttribute('y2', '19');
      
      line2.style.opacity = '0';
      
      line3.setAttribute('x1', '5');
      line3.setAttribute('y1', '19');
      line3.setAttribute('x2', '19');
      line3.setAttribute('y2', '5');
    } else {
      line1.setAttribute('x1', '3');
      line1.setAttribute('y1', '12');
      line1.setAttribute('x2', '21');
      line1.setAttribute('y2', '12');
      
      line2.style.opacity = '1';
      
      line3.setAttribute('x1', '3');
      line3.setAttribute('y1', '18');
      line3.setAttribute('x2', '21');
      line3.setAttribute('y2', '18');
    }
  });

  // Close mobile menu when a nav link is clicked
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      // Reset burger lines
      line1.setAttribute('x1', '3');
      line1.setAttribute('y1', '12');
      line1.setAttribute('x2', '21');
      line1.setAttribute('y2', '12');
      line2.style.opacity = '1';
      line3.setAttribute('x1', '3');
      line3.setAttribute('y1', '18');
      line3.setAttribute('x2', '21');
      line3.setAttribute('y2', '18');
    });
  });

  // --- Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll('.reveal');
  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Trigger only once
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });

  // Trigger reveal on page load for visible items
  setTimeout(() => {
    const heroLeft = document.querySelector('.hero-left');
    const heroRight = document.querySelector('.hero-right');
    if (heroLeft) heroLeft.classList.add('active');
    if (heroRight) heroRight.classList.add('active');
  }, 100);

  // --- Active Navigation Link on Scroll ---
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120; // Offset for navbar height

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // --- Contact Form Submission ---
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;

      // Basic client-side validation check
      if (!name || !email || !subject || !message) {
        formFeedback.textContent = 'Please fill in all fields.';
        formFeedback.className = 'form-feedback error';
        return;
      }

      // Simulate sending
      submitBtn.disabled = true;
      const btnSpan = submitBtn.querySelector('span');
      const originalText = btnSpan.textContent;
      btnSpan.textContent = 'Sending...';

      setTimeout(() => {
        // Success response
        formFeedback.textContent = 'Thank you! Your message has been sent successfully.';
        formFeedback.className = 'form-feedback success';
        contactForm.reset();
        
        submitBtn.disabled = false;
        btnSpan.textContent = originalText;

        // Clear feedback after 5 seconds
        setTimeout(() => {
          formFeedback.style.display = 'none';
        }, 5000);
      }, 1500);
    });
  }
});
