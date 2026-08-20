import { appRootRef, toastContainerRef } from "../services/refs";

let toastContainer;

export function initToast() {
  appRootRef().insertAdjacentHTML(
    "afterbegin",
    '<div class="toast-container"> </div>',
  );

  toastContainer = toastContainerRef();
}

function generateToast({ message, bgc = "#00214d", color = "#fff", duration }) {
  const toast = document.createElement("p");
  toast.style.backgroundColor = bgc;
  toast.style.color = color;
  toast.style.animationDuration = duration;
  toast.textContent = message;
  toast.classList.add("toast");

  return toast;
}

export function successToaster({ message = "success!", duration = 3000 }) {
  const newToast = generateToast({
    message,
    bgc: "var(--success-color)",
    color: "var(--text-color)",
    duration,
  });
  toastContainer.insertAdjacentElement("beforeend", newToast);
  setTimeout(() => newToast.remove(), duration);
}

export function infoToaster({ message = "info", duration = 3000 }) {
  const newToast = generateToast({
    message,
    bgc: "var(--info-color)",
    color: "var(--text-color)",
    duration,
  });
  toastContainer.insertAdjacentElement("beforeend", newToast);
  setTimeout(() => newToast.remove(), duration);
}
export function errorToaster({ message = "warning!", duration = 3000 }) {
  const newToast = generateToast({
    message,
    bgc: "var(--error-color)",
    color: "var(--text-color)",
    duration,
  });
  toastContainer.insertAdjacentElement("beforeend", newToast);
  setTimeout(() => newToast.remove(), duration);
}
