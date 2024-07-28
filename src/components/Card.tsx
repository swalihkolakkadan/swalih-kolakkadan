import React from "react";

interface ContactCard {
  title: string;
  subtitle: string;
}

const Card = ({ title, subtitle }: ContactCard) => {
  return (
    <div className="bg-neutral-300 dark:bg-neutral-800 p-4 rounded-2xl shadow-sm dark:shadow-neutral-700/50">
      <div className="text-sm text-neutral-400">{title}</div>
      <div className="text-lg">{subtitle}</div>
    </div>
  );
};

export default Card;
