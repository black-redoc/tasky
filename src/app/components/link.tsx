interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  content: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  className?: string;
  isSecondary?: boolean;
}
export default function Link({
  content,
  href,
  onClick,
  className,
  isSecondary = false,
  ...props
}: LinkProps) {
  return (
    <a
      {...props}
      type="button"
      className={`
        rounded text-white mx-2 my-1 cursor-pointer hover:bg-sky-950 text-center
        ${isSecondary ? "bg-cyan-700" : "bg-gray-900"}
        ${className}
      `}
      href={href}
      onClick={onClick}
    >
      {content}
    </a>
  );
}
