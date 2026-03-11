/* ========================================
   HotSpring Portable Spas - Main JavaScript
   jQuery + Vanilla JS for validation & animations
   ======================================== */

$(document).ready(function () {
  // ========== Mobile Menu Toggle ==========
  $('#hamburgerBtn').on('click', function () {
    $('#mobileMenu').addClass('open');
    $('body').css('overflow', 'hidden');
  });

  $('#mobileMenuClose').on('click', function () {
    $('#mobileMenu').removeClass('open');
    $('body').css('overflow', '');
  });

  // Close mobile menu on link click
  $('#mobileMenu a').on('click', function () {
    $('#mobileMenu').removeClass('open');
    $('body').css('overflow', '');
  });

  // ========== Scroll Animations ==========
  function animateOnScroll() {
    $('.animate-on-scroll').each(function () {
      var elementTop = $(this).offset().top;
      var viewportBottom = $(window).scrollTop() + $(window).height();
      if (elementTop < viewportBottom - 50) {
        $(this).addClass('animate-fadeIn');
      }
    });
  }
  $(window).on('scroll', animateOnScroll);
  animateOnScroll(); // Initial check

  // ========== Tabs Functionality ==========
  $('.tab-btn').on('click', function () {
    var target = $(this).data('tab');
    $(this).siblings('.tab-btn').removeClass('active');
    $(this).addClass('active');
    $(this).closest('.tabs-container').find('.tab-content').removeClass('active');
    $(this).closest('.tabs-container').find('#' + target).addClass('active');
  });

  // ========== Search Bar ==========
  $('#searchForm').on('submit', function (e) {
    e.preventDefault();
    var query = $('#searchInput').val().trim();
    if (query.length > 0) {
      alert('Search for: "' + query + '" — This is a static demo.');
    }
  });

  // ========== Cart Quantity ==========
  $('.qty-increase').on('click', function () {
    var input = $(this).siblings('.qty-input');
    var val = parseInt(input.val()) || 1;
    input.val(val + 1);
    updateCartTotal();
  });

  $('.qty-decrease').on('click', function () {
    var input = $(this).siblings('.qty-input');
    var val = parseInt(input.val()) || 1;
    if (val > 1) {
      input.val(val - 1);
      updateCartTotal();
    }
  });

  function updateCartTotal() {
    var total = 0;
    $('.cart-item').each(function () {
      var price = parseFloat($(this).find('.item-price').data('price')) || 0;
      var qty = parseInt($(this).find('.qty-input').val()) || 1;
      var lineTotal = price * qty;
      $(this).find('.line-total').text('$' + lineTotal.toFixed(2));
      total += lineTotal;
    });
    $('#cartSubtotal').text('$' + total.toFixed(2));
    $('#cartTotal').text('$' + total.toFixed(2));
  }

  // ========== Remove Cart Item ==========
  $(document).on('click', '.remove-item', function (e) {
    e.preventDefault();
    $(this).closest('.cart-item').fadeOut(300, function () {
      $(this).remove();
      updateCartTotal();
    });
  });

  // ========== Newsletter Signup ==========
  $('#newsletterForm').on('submit', function (e) {
    e.preventDefault();
    var email = $('#newsletterEmail').val().trim();
    if (validateEmail(email)) {
      alert('Thank you for subscribing!');
      $('#newsletterEmail').val('');
    } else {
      alert('Please enter a valid email address.');
    }
  });

  // ========== Form Validation ==========

  // Validation Helper Functions
  function validateEmail(email) {
    var re = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  }

  function validatePhone(phone) {
    var re = /^[\d\s\-+()]{7,15}$/;
    return re.test(phone);
  }

  function showError(field, message) {
    field.addClass('error');
    field.siblings('.error-message').text(message).addClass('show');
  }

  function clearError(field) {
    field.removeClass('error');
    field.siblings('.error-message').removeClass('show');
  }

  function clearAllErrors(form) {
    form.find('.form-input, .form-select').removeClass('error');
    form.find('.error-message').removeClass('show');
  }

  // Real-time validation on blur
  $(document).on('blur', '.form-input[required], .form-select[required]', function () {
    var field = $(this);
    var val = field.val().trim();
    var type = field.attr('type');
    var name = field.attr('name');

    clearError(field);

    if (val === '') {
      showError(field, 'This field is required.');
      return;
    }

    if (type === 'email' && !validateEmail(val)) {
      showError(field, 'Please enter a valid email address.');
      return;
    }

    if (name === 'phone' && !validatePhone(val)) {
      showError(field, 'Please enter a valid phone number.');
      return;
    }

    if (type === 'password' && val.length < 6) {
      showError(field, 'Password must be at least 6 characters.');
      return;
    }
  });

  // Clear error on focus
  $(document).on('focus', '.form-input, .form-select', function () {
    clearError($(this));
  });

  // --- Login Form ---
  $('#loginForm').on('submit', function (e) {
    e.preventDefault();
    var form = $(this);
    var valid = true;
    clearAllErrors(form);

    var email = form.find('[name="email"]');
    var password = form.find('[name="password"]');

    if (email.val().trim() === '') {
      showError(email, 'Email is required.');
      valid = false;
    } else if (!validateEmail(email.val().trim())) {
      showError(email, 'Please enter a valid email address.');
      valid = false;
    }

    if (password.val().trim() === '') {
      showError(password, 'Password is required.');
      valid = false;
    }

    if (valid) {
      alert('Login successful! (Demo)');
    }
  });

  // --- Register Form ---
  $('#registerForm').on('submit', function (e) {
    e.preventDefault();
    var form = $(this);
    var valid = true;
    clearAllErrors(form);

    var fields = {
      email: form.find('[name="email"]'),
      password: form.find('[name="password"]'),
      rePassword: form.find('[name="re_password"]'),
      firstName: form.find('[name="first_name"]'),
      lastName: form.find('[name="last_name"]')
    };

    if (fields.email.val().trim() === '') {
      showError(fields.email, 'Email is required.');
      valid = false;
    } else if (!validateEmail(fields.email.val().trim())) {
      showError(fields.email, 'Please enter a valid email.');
      valid = false;
    }

    if (fields.password.val().trim() === '') {
      showError(fields.password, 'Password is required.');
      valid = false;
    } else if (fields.password.val().length < 6) {
      showError(fields.password, 'Password must be at least 6 characters.');
      valid = false;
    }

    if (fields.rePassword.val() !== fields.password.val()) {
      showError(fields.rePassword, 'Passwords do not match.');
      valid = false;
    }

    if (fields.firstName.val().trim() === '') {
      showError(fields.firstName, 'First name is required.');
      valid = false;
    }

    if (fields.lastName.val().trim() === '') {
      showError(fields.lastName, 'Last name is required.');
      valid = false;
    }

    if (valid) {
      alert('Account created successfully! (Demo)');
    }
  });

  // --- Forgot Password Form ---
  $('#forgotPasswordForm').on('submit', function (e) {
    e.preventDefault();
    var form = $(this);
    var valid = true;
    clearAllErrors(form);

    var email = form.find('[name="email"]');

    if (email.val().trim() === '') {
      showError(email, 'Email is required.');
      valid = false;
    } else if (!validateEmail(email.val().trim())) {
      showError(email, 'Please enter a valid email address.');
      valid = false;
    }

    if (valid) {
      alert('Password reset link sent to your email! (Demo)');
    }
  });

  // --- Contact Form ---
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();
    var form = $(this);
    var valid = true;
    clearAllErrors(form);

    var name = form.find('[name="name"]');
    var email = form.find('[name="email"]');
    var subject = form.find('[name="subject"]');
    var message = form.find('[name="message"]');

    if (name.val().trim() === '') {
      showError(name, 'Name is required.');
      valid = false;
    }

    if (email.val().trim() === '') {
      showError(email, 'Email is required.');
      valid = false;
    } else if (!validateEmail(email.val().trim())) {
      showError(email, 'Please enter a valid email.');
      valid = false;
    }

    if (subject.val().trim() === '') {
      showError(subject, 'Subject is required.');
      valid = false;
    }

    if (message.val().trim() === '') {
      showError(message, 'Message is required.');
      valid = false;
    }

    if (valid) {
      alert('Message sent successfully! (Demo)');
      form[0].reset();
    }
  });

  // --- Edit Account / Profile Form ---
  $('#editAccountForm').on('submit', function (e) {
    e.preventDefault();
    var form = $(this);
    var valid = true;
    clearAllErrors(form);

    var firstName = form.find('[name="first_name"]');
    var lastName = form.find('[name="last_name"]');
    var email = form.find('[name="email"]');

    if (firstName.val().trim() === '') {
      showError(firstName, 'First name is required.');
      valid = false;
    }
    if (lastName.val().trim() === '') {
      showError(lastName, 'Last name is required.');
      valid = false;
    }
    if (email.val().trim() === '') {
      showError(email, 'Email is required.');
      valid = false;
    } else if (!validateEmail(email.val().trim())) {
      showError(email, 'Please enter a valid email.');
      valid = false;
    }

    var newPass = form.find('[name="new_password"]');
    var confirmPass = form.find('[name="confirm_password"]');
    if (newPass.val() !== '' && newPass.val().length < 6) {
      showError(newPass, 'Password must be at least 6 characters.');
      valid = false;
    }
    if (newPass.val() !== confirmPass.val()) {
      showError(confirmPass, 'Passwords do not match.');
      valid = false;
    }

    if (valid) {
      alert('Profile updated successfully! (Demo)');
    }
  });

  // --- Address Forms (Billing & Shipping) ---
  $('#editBillingForm, #editShippingForm').on('submit', function (e) {
    e.preventDefault();
    var form = $(this);
    var valid = true;
    clearAllErrors(form);

    var requiredFields = form.find('[required]');
    requiredFields.each(function () {
      var field = $(this);
      if (field.val().trim() === '') {
        showError(field, 'This field is required.');
        valid = false;
      }
    });

    var email = form.find('[name="email"]');
    if (email.length && email.val().trim() !== '' && !validateEmail(email.val().trim())) {
      showError(email, 'Please enter a valid email.');
      valid = false;
    }

    var phone = form.find('[name="phone"]');
    if (phone.length && phone.val().trim() !== '' && !validatePhone(phone.val().trim())) {
      showError(phone, 'Please enter a valid phone number.');
      valid = false;
    }

    if (valid) {
      alert('Address updated successfully! (Demo)');
    }
  });

  // --- Payment Form ---
  $('#paymentForm').on('submit', function (e) {
    e.preventDefault();
    var form = $(this);
    var valid = true;
    clearAllErrors(form);

    var requiredFields = form.find('[required]');
    requiredFields.each(function () {
      var field = $(this);
      if (field.val().trim() === '') {
        showError(field, 'This field is required.');
        valid = false;
      }
    });

    var email = form.find('[name="email"]');
    if (email.length && email.val().trim() !== '' && !validateEmail(email.val().trim())) {
      showError(email, 'Please enter a valid email.');
      valid = false;
    }

    var cardNumber = form.find('[name="card_number"]');
    if (cardNumber.length && cardNumber.val().trim() !== '') {
      var cn = cardNumber.val().replace(/\s/g, '');
      if (!/^\d{13,19}$/.test(cn)) {
        showError(cardNumber, 'Please enter a valid card number.');
        valid = false;
      }
    }

    var termsCheckbox = form.find('[name="terms"]');
    if (termsCheckbox.length && !termsCheckbox.is(':checked')) {
      alert('Please accept the Terms and Conditions.');
      valid = false;
    }

    if (valid) {
      alert('Order placed successfully! (Demo)');
    }
  });

  // ========== Smooth Scroll for Anchors ==========
  $('a[href^="#"]').on('click', function (e) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: target.offset().top - 80 }, 500);
    }
  });

  // ========== Back to Top ==========
  var backToTop = $('#backToTop');
  if (backToTop.length) {
    $(window).on('scroll', function () {
      if ($(this).scrollTop() > 300) {
        backToTop.fadeIn(300);
      } else {
        backToTop.fadeOut(300);
      }
    });
    backToTop.on('click', function () {
      $('html, body').animate({ scrollTop: 0 }, 500);
    });
  }

  // ========== Product Image Gallery ==========
  $('.thumbnail-img').on('click', function () {
    var src = $(this).attr('src');
    $(this).closest('.product-gallery').find('.main-product-img').attr('src', src);
    $(this).siblings('.thumbnail-img').removeClass('border-red-500');
    $(this).addClass('border-red-500');
  });

  // ========== Price Calculator Dropdowns ==========
  $('.calculator-select').on('change', function () {
    // Demo: update total based on selections
    var basePrice = 650;
    var total = basePrice;
    $('.calculator-select').each(function () {
      var addOn = parseFloat($(this).find(':selected').data('price')) || 0;
      total += addOn;
    });
    $('#calculatorTotal').text('$' + total.toFixed(2));
  });
});
