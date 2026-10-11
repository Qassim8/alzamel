import coreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
  { ignores: [".next/**", "out/**", "node_modules/**", ".screenshots/**"] },
  ...coreWebVitals,
];

export default config;
