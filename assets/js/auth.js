/**
 * VOLTARA - Authentication & Account Flow Controllers
 * (Login, Sign Up with Customer/Host role, Forgot Password)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Password Visibility Toggle
  document.querySelectorAll('.password-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const input = btn.closest('.input-group').querySelector('input');
      const icon = btn.querySelector('i');
      if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'bi bi-eye-slash-fill';
      } else {
        input.type = 'password';
        icon.className = 'bi bi-eye-fill';
      }
    });
  });

  // 2. Demo Account Quick Autofill
  const demoCustomerBtn = document.getElementById('btnDemoCustomer');
  const demoHostBtn = document.getElementById('btnDemoHost');
  const loginEmail = document.getElementById('loginEmail');
  const loginPassword = document.getElementById('loginPassword');

  if (demoCustomerBtn && loginEmail && loginPassword) {
    demoCustomerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      loginEmail.value = 'marcus.brody@example.com';
      loginPassword.value = 'VoltaraSecure2026!';
      VoltaraToast.show({ title: "Demo Filled", message: "Customer credentials populated.", type: "info" });
    });
  }

  if (demoHostBtn && loginEmail && loginPassword) {
    demoHostBtn.addEventListener('click', (e) => {
      e.preventDefault();
      loginEmail.value = 'specialist@apextechlabs.io';
      loginPassword.value = 'VoltaraHostBench!';
      VoltaraToast.show({ title: "Demo Filled", message: "Host Provider credentials populated.", type: "info" });
    });
  }

  // 3. Login Form Submit
  const loginForm = document.getElementById('voltaraLoginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = loginEmail.value.trim();
      const password = loginPassword.value.trim();

      if (!email || !password) {
        VoltaraToast.show({ title: "Validation Error", message: "Please fill in all credentials.", type: "warning" });
        return;
      }

      const submitBtn = loginForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Authenticating...`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        const isHost = email.includes('apex') || email.includes('host') || email.includes('specialist');
        const user = {
          email: email,
          name: isHost ? "Apex Tech Specialist" : "Marcus Brody",
          role: isHost ? "host" : "customer",
          loggedInAt: new Date().toISOString()
        };

        localStorage.setItem('voltara_current_user', JSON.stringify(user));

        VoltaraToast.show({
          title: "Welcome Back",
          message: `Signed in successfully as ${user.name}.`,
          type: "success"
        });

        setTimeout(() => {
          if (isHost) {
            window.location.href = 'host-setup.html';
          } else {
            window.location.href = 'explore.html';
          }
        }, 1000);
      }, 1200);
    });
  }

  // 4. Sign Up Role Switcher & Form Submit
  const signupForm = document.getElementById('voltaraSignupForm');
  const roleCustomerRadio = document.getElementById('roleCustomer');
  const roleHostRadio = document.getElementById('roleHost');
  const hostSpecificFields = document.getElementById('hostSignupFields');

  if (roleCustomerRadio && roleHostRadio && hostSpecificFields) {
    const toggleRole = () => {
      if (roleHostRadio.checked) {
        hostSpecificFields.classList.remove('d-none');
      } else {
        hostSpecificFields.classList.add('d-none');
      }
    };

    roleCustomerRadio.addEventListener('change', toggleRole);
    roleHostRadio.addEventListener('change', toggleRole);
  }

  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (document.getElementById('signupName') || {}).value || "";
      const email = (document.getElementById('signupEmail') || {}).value || "";
      const pass = (document.getElementById('signupPassword') || {}).value || "";
      const passConf = (document.getElementById('signupConfirmPassword') || {}).value || "";
      const terms = (document.getElementById('signupTerms') || {}).checked;

      if (!name || !email || !pass) {
        VoltaraToast.show({ title: "Incomplete Form", message: "Please fill in all required fields.", type: "warning" });
        return;
      }

      if (pass !== passConf) {
        VoltaraToast.show({ title: "Password Mismatch", message: "Your passwords do not match.", type: "danger" });
        return;
      }

      if (!terms) {
        VoltaraToast.show({ title: "Terms Agreement", message: "Please accept the Voltara Terms of Service.", type: "warning" });
        return;
      }

      const submitBtn = signupForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Creating Account...`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        const isHost = roleHostRadio && roleHostRadio.checked;
        const user = {
          name,
          email,
          role: isHost ? "host" : "customer",
          createdAt: new Date().toISOString()
        };

        localStorage.setItem('voltara_current_user', JSON.stringify(user));

        VoltaraToast.show({
          title: "Account Created!",
          message: isHost ? "Welcome Host Specialist. Directing to availability setup..." : "Welcome to Voltara! Directing to marketplace...",
          type: "success"
        });

        setTimeout(() => {
          if (isHost) {
            window.location.href = 'host-setup.html';
          } else {
            window.location.href = 'explore.html';
          }
        }, 1200);
      }, 1400);
    });
  }

  // 5. Forgot Password Flow
  const forgotForm = document.getElementById('voltaraForgotForm');
  const forgotInitialState = document.getElementById('forgotInitialState');
  const forgotSuccessState = document.getElementById('forgotSuccessState');
  const sentEmailDisplay = document.getElementById('forgotSentEmailDisplay');

  if (forgotForm && forgotInitialState && forgotSuccessState) {
    forgotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('forgotEmail');
      const emailVal = emailInput ? emailInput.value.trim() : "";

      if (!emailVal) {
        VoltaraToast.show({ title: "Email Required", message: "Please enter your registered email address.", type: "warning" });
        return;
      }

      const submitBtn = forgotForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending Link...`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        if (sentEmailDisplay) sentEmailDisplay.textContent = emailVal;
        forgotInitialState.classList.add('d-none');
        forgotSuccessState.classList.remove('d-none');

        VoltaraToast.show({
          title: "Reset Link Dispatched",
          message: `Check your inbox at ${emailVal}.`,
          type: "success"
        });
      }, 1200);
    });

    const resendBtn = document.getElementById('btnResendResetLink');
    if (resendBtn) {
      resendBtn.addEventListener('click', (e) => {
        e.preventDefault();
        VoltaraToast.show({
          title: "Link Resent",
          message: "A fresh password recovery token was sent to your email.",
          type: "info"
        });
      });
    }
  }
});
