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
        "w-full flex flex-col gap-1 px-3 py-2 rounded-xl",
        "bg-whitebright border-2 border-secondarySage/40",
        "transition-all duration-200 focus-within:border-secondarySage",
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
        type={type}
        className={twMerge(
          "w-full bg-transparent font-satoshi text-textMoss outline-none",
          "placeholder:text-textLabel placeholder:font-satoshi placeholder:text-base",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      />
    </div>
  );
}

export default Input