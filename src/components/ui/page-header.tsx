const PageHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="header-container w-full flex flex-col gap-1 border-b border-neutral-800 mb-6">
      <h2 className="text-2xl font-medium text-neutral-100">{title}</h2>
      <p className="text-sm text-neutral-400">{subtitle}</p>
    </div>
  );
};

export default PageHeader;
