// Mobile menu toggle
function toggleMobileMenu() {
  const nav = document.querySelector(".nav")
  const isVisible = nav.style.display === "flex"
  nav.style.display = isVisible ? "none" : "flex"

  if (!isVisible) {
    nav.style.position = "absolute"
    nav.style.top = "100%"
    nav.style.left = "0"
    nav.style.right = "0"
    nav.style.background = "white"
    nav.style.flexDirection = "column"
    nav.style.padding = "1rem"
    nav.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
    nav.style.zIndex = "1000"
  }
}

// Handle login form submission
function handleLogin(event) {
  event.preventDefault()

  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  if (email && password) {
    alert("Login realizado com sucesso! (Esta é apenas uma demonstração)")
    // Aqui você adicionaria a lógica real de autenticação
  } else {
    alert("Por favor, preencha todos os campos.")
  }
}

// Smooth scrolling for anchor links
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href").substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        })
      }
    })
  })
})

// Close mobile menu when clicking outside
document.addEventListener("click", (event) => {
  const nav = document.querySelector(".nav")
  const menuBtn = document.querySelector(".mobile-menu-btn")

  if (!nav.contains(event.target) && !menuBtn.contains(event.target)) {
    if (window.innerWidth <= 768) {
      nav.style.display = "none"
    }
  }
})

// Handle window resize
window.addEventListener("resize", () => {
  const nav = document.querySelector(".nav")

  if (window.innerWidth > 768) {
    nav.style.display = "flex"
    nav.style.position = "static"
    nav.style.flexDirection = "row"
    nav.style.padding = "0"
    nav.style.boxShadow = "none"
    nav.style.background = "transparent"
  } else {
    nav.style.display = "none"
  }
})
