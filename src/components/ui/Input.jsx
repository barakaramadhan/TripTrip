import { twMerge } from "tailwind-merge";

function Input({
  label,
  id,
  className = "",
  containerClassName = "",
  type = "text",
  ...props
}) {
  return (
    <div
      className={twMerge(
        "flex w-full min-w-0 flex-col gap-1 rounded-xl px-3 py-2",
        "border-2 border-secondarySage/40 bg-whitebright",
        "transition-all duration-200 focus-within:border-secondarySage focus-within:ring-4 focus-within:ring-secondarySage/25",
        containerClassName
      )}
    >
      {label && (
        <label htmlFor={id} className="font-satoshi text-base font-medium text-blackdark">
          {label}
        </label>
      )}

      <input
        id={id}
        name={id}
        type={type}
        className={twMerge(
          "w-full min-w-0 bg-transparent font-satoshi text-textMoss outline-none",
          "placeholder:font-satoshi placeholder:text-base placeholder:text-textLabel",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  );
}

export default Input;
