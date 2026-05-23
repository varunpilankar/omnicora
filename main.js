/**
 * OMNICORA — main.js
 * Handles the email notification form.
 */
(function () {
  var btn   = document.getElementById('notifyBtn');
  var input = document.getElementById('emailInput');
  var row   = document.getElementById('notifyRow');
  var ok    = document.getElementById('notifySuccess');

  function isEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  }

  function submit(e) {
    e.preventDefault();

    if (!isEmail(input.value)) {
      input.style.outline = '1.5px solid red';
      input.focus();
      setTimeout(function () { input.style.outline = ''; }, 1800);
      return;
    }

    // Success animation
    row.style.transition = 'opacity 0.3s';
    row.style.opacity = '0';
    setTimeout(function () {
      row.style.display = 'none';
      ok.style.display = 'block';
    }, 300);

    // Send to Google Sheet (same URL everywhere)
    fetch("https://script.google.com/macros/s/AKfycbwaqSyQW8fC_9fcxrcNvkhnCAt1O8lfuFBl1MU7EYe4EVeOxsNEeE6nRClkvBSTXoaz/exec", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `email=${encodeURIComponent(input.value)}&source=OPC&honeypot=`
    }).catch(function (err) {
      console.warn("Could not save email", err);
    });
  }

  btn.addEventListener('click', submit);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') submit(e);
  });
})();
