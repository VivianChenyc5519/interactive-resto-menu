const img = document.getElementById("lang-toggle");

if (img) {
  img.addEventListener("click", () => {
    const redirect = encodeURIComponent(window.location.pathname + window.location.search);
    window.location.href = `/language?redirect=${redirect}`;
  });
}