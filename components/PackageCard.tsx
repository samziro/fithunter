import React from "react";

type Variant = "dark" | "highlight" | "muted";

interface PackageCardProps {
  title: string;
  price: React.ReactNode;
  features: string[];
  badge?: string;
  variant?: Variant;
  ctaLabel?: string;
  onClick?: () => void;
}

const PackageCard: React.FC<PackageCardProps> = ({
  title,
  price,
  features,
  badge,
  variant = "dark",
  ctaLabel = "Choose Plan",
  onClick,
}) => {
  const base = "p-6 text-center rounded-lg shadow-md";

  const variantClass =
    variant === "highlight"
      ? "bg-gradient-to-b from-yellow-600 to-yellow-700 text-white shadow-xl"
      : variant === "muted"
      ? "bg-slate-700 text-slate-100"
      : "bg-[#292929] text-slate-100";

  const ctaClass =
    variant === "highlight"
      ? "bg-white text-yellow-600 hover:bg-gray-100"
      : "bg-yellow-600 text-white hover:bg-yellow-700";

  return (
    <div className={`${base} ${variantClass}`}>
      {badge && (
        <div className="inline-block mb-4 px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-600">
          {badge}
        </div>
      )}

      <h3 className="text-xl md:text-2xl font-bold mb-2 text-white font-poppins">{title}</h3>
      <div className="text-3xl md:text-4xl font-bold mb-6 font-poppins">{price}</div>

      <ul className="space-y-3 mb-8 text-base font-inter">
        {features.map((f, i) => (
          <li key={i} className="flex items-center justify-center gap-2 text-slate-100 leading-relaxed">
            <i className="ri-checkbox-circle-fill text-yellow-400 text-lg"></i>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <button onClick={onClick} className={`${ctaClass} px-6 py-3 font-semibold block w-full rounded-md transition-colors font-poppins`}>{ctaLabel}</button>
    </div>
  );
};

export default PackageCard;