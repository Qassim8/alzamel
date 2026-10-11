import Reveal from "./Reveal";

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
  tone = "light",
}) {
  const isCenter = align === "center";
  const titleTone = tone === "dark" ? "text-white" : "text-navy";
  const subTone = tone === "dark" ? "text-white/70" : "text-muted";

  return (
    <Reveal
      className={`mb-12 flex flex-col gap-4 ${
        isCenter ? "items-center text-center" : "items-start text-right"
      }`}
    >
      {label && <span className="eyebrow">{label}</span>}
      <h2
        className={`heading-section ${titleTone} ${isCenter ? "max-w-3xl" : ""}`}
      >
        {title}
      </h2>
      {subtitle && <p className={`max-w-2xl lead ${subTone}`}>{subtitle}</p>}
    </Reveal>
  );
}
