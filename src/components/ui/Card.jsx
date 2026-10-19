import { twMerge } from "tailwind-merge";

function Card({ children, className, ...props }) {
  return (
    <div
      className={twMerge("relative overflow-hidden rounded-4xl", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;