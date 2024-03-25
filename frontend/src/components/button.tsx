export default ({ children }: { children: any }) => {
  return (
    <button className="text-cyan-600 font-bold text-xl hover:text-white hover:bg-cyan-700 rounded-xl size-12 flex justify-center items-center">
      {children}
    </button>
  );
};
