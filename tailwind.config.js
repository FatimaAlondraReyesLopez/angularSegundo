/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}",],
  theme: {
    extend: "...\src\app\formulario\ejemplo1\{ejemplo1.component.html}"
  },
  plugins: ['flowbite/plugin'],
}

