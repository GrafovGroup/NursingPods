"use client";
export default function OptionLink({
  option,
  label,
}: {
  option: string;
  label: string;
}) {
  return (
    <a
      className="text-link"
      href="#contact"
      onClick={() =>
        window.dispatchEvent(
          new CustomEvent("choose-product", { detail: option }),
        )
      }
    >
      {label}
      <span aria-hidden="true">↗</span>
    </a>
  );
}
