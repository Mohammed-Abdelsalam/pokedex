export const Container: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="w-full mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-5">
    {children}
  </div>
);
