import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
} & React.ComponentProps<"button">;

export const Button = ({ className, children, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className={`inline-block w-full text-white rounded-lg px-5 py-3 text-center font-medium text-sm sm:w-auto hover:opacity-90 ${className}`}
    >
      {children}
    </button>
  );
};
