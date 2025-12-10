import emailjs from "@emailjs/browser";
import { EMAILJS_CONFIG } from "./emailjs-config.js";

emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  function sanitizeInput(input) {
    const div = document.createElement("div");
    div.textContent = input;
    return div.innerHTML;
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateField(value, minLen, maxLen, isEmail = false) {
    const sanitized = sanitizeInput(value.trim());
    if (isEmail && !isValidEmail(sanitized)) {
      return {
        valid: false,
        message: "Veuillez entrer une adresse email valide.",
      };
    }
    if (sanitized.length < minLen) {
      return { valid: false, message: `Minimum ${minLen} caractères requis.` };
    }
    if (sanitized.length > maxLen) {
      return {
        valid: false,
        message: `Maximum ${maxLen} caractères autorisés.`,
      };
    }
    return { valid: true, value: sanitized };
  }

  function showError(fieldId, message) {
    const errorEl = document.getElementById(`${fieldId}-error`);
    const inputEl = document.getElementById(fieldId);
    if (errorEl && inputEl) {
      errorEl.textContent = message;
      inputEl.classList.add("error");
    }
  }

  function clearError(fieldId) {
    const errorEl = document.getElementById(`${fieldId}-error`);
    const inputEl = document.getElementById(fieldId);
    if (errorEl && inputEl) {
      errorEl.textContent = "";
      inputEl.classList.remove("error");
    }
  }

  function showStatus(message, type) {
    const statusEl = document.getElementById("form-status");
    if (statusEl) {
      statusEl.textContent = message;
      statusEl.className = `form-status ${type}`;
    }
  }

  const fields = [
    { id: "name", min: 2, max: 100 },
    { id: "email", min: 1, max: 100, isEmail: true },
    { id: "subject", min: 3, max: 150 },
    { id: "message", min: 10, max: 1000 },
  ];

  fields.forEach((field) => {
    const el = document.getElementById(field.id);
    if (el) {
      el.addEventListener("blur", function () {
        const result = validateField(
          this.value,
          field.min,
          field.max,
          field.isEmail,
        );
        result.valid
          ? clearError(field.id)
          : showError(field.id, result.message);
      });
    }
  });

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    fields.forEach((f) => clearError(f.id));
    showStatus("", "");

    const validations = fields.map((field) => ({
      id: field.id,
      result: validateField(
        document.getElementById(field.id).value,
        field.min,
        field.max,
        field.isEmail,
      ),
    }));

    let isValid = true;
    validations.forEach((v) => {
      if (!v.result.valid) {
        showError(v.id, v.result.message);
        isValid = false;
      }
    });

    if (!isValid) {
      showStatus("Veuillez corriger les erreurs dans le formulaire.", "error");
      return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Envoi en cours...";

    try {
      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          from_name: validations[0].result.value,
          from_email: validations[1].result.value,
          subject: validations[2].result.value,
          message: validations[3].result.value,
          to_email: "dylan.eray@hes-so.ch",
        },
      );

      if (response.status === 200) {
        showStatus("Votre message a été envoyé avec succès !", "success");
        contactForm.reset();
      } else {
        showStatus("Une erreur est survenue lors de l'envoi.", "error");
      }
    } catch (error) {
      showStatus("Erreur lors de l'envoi. Veuillez réessayer.", "error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
});
