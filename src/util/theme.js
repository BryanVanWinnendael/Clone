export function usetheme() {
  if (localStorage.getItem("theme") === "darkmode") {
    document.body.classList.add("dark-theme")
  } else {
    document.body.classList.remove("dark-theme")
  }
}
