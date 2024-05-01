export default ({
  content,
  href,
  onClick,
  className,
  isSecondary = false,
}: {
  content: string;
  href?: string;
  onClick?: any;
  className?: string;
  isSecondary?: boolean;
}) => {
  return (
    <a
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
};
