/**
 * OMNICORA — main.js
 * Handles the email notification form.
 */

(function () {
  'use strict';

  var btn   = document.getElementById('notifyBtn');
  var input = document.getElementById('emailInput');
  var row   = document.getElementById('notifyRow');
  var ok    = document.getElementById('notifySuccess');

  if (!btn || !input || !row || !ok) return;

  /* Basic email format check */
  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  /* Shake the input border briefly on invalid submit */
  function flashError() {
    input.style.outline = '1.5px solid #AAAAAA';
    input.focus();
    setTimeout(function () {
      input.style.outline = '';
    }, 1800);
  }

  /* Fade out the form, show the success message */
  function showSuccess() {
    row.style.transition  = 'opacity 0.3s ease';
    row.style.opacity     = '0';
    setTimeout(function () {
      row.style.display   = 'none';
      ok.style.display    = 'block';
    }, 300);
  }

  function handleSubmit() {
    if (!isValidEmail(input.value)) {
      flashError();
      return;
    }
    showSuccess();
  }

  btn.addEventListener('click', handleSubmit);

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') handleSubmit();
  });

}());
