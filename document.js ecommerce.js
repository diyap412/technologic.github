document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Contact Form Submission Handler

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    console.log('Form Submission:', { name, email, message });

    alert('Thank you for reaching out, ' + name + '! We will get back to you shortly.');

    // Clear form after submission
    this.reset();
});

// Animate Hero Button on Hover

document.querySelector('.cta-button').addEventListener('mouseover', function() {
    this.style.transform = 'scale(1.05)';
    this.style.transition = 'transform 0.3s';
});

document.querySelector('.cta-button').addEventListener('mouseout', function() {
    this.style.transform = 'scale(1)';
});