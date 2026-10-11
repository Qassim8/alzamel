/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./lib/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // ── ألوان الهوية المعتمدة (AL ZAMIL CLEAN / BRAND IDENTITY) ──
        // قيم صريحة كي تعمل معدّلات الشفافية مثل bg-primary/50
        turquoise: "#02B8D2",
        azure: "#0299DF",
        blue: "#027FD3",
        navy: "#082F49",
        mist: "#F2F8FA",
        // أسماء دلالية
        primary: "#0299DF",
        "primary-dark": "#027FD3",
        body: "#13293A",
        muted: "#5F7689",
        line: "#E3EDF2",
      },
      fontFamily: {
        sans: ["var(--font-ar)", "var(--font-latin)", "Arial", "sans-serif"],
        latin: ["var(--font-latin)", "Arial", "sans-serif"],
      },
      borderRadius: {
        brand: "18px",
      },
      boxShadow: {
        // ظلال ناعمة فقط — بلا مبالغة
        card: "0 1px 2px rgba(8,47,73,.04), 0 8px 24px -12px rgba(8,47,73,.12)",
        lift: "0 2px 4px rgba(8,47,73,.05), 0 18px 40px -18px rgba(8,47,73,.22)",
        ring: "0 0 0 1px rgba(8,47,73,.06)",
      },
      maxWidth: {
        content: "1180px",
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(.22,.61,.36,1)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "none" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(.9)", opacity: ".55" },
          "70%": { transform: "scale(1.5)", opacity: "0" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up .6s cubic-bezier(.22,.61,.36,1) both",
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(.22,.61,.36,1) infinite",
      },
    },
  },
  plugins: [],
};
