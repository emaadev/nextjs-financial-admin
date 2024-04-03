interface PageHeaderProps {
  title: string;
  subtitle: string;
}

const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  return (
    <>
      <header className="page-header">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </header>

      <hr className="w-full border-1 border-gray-300" />
    </>
  );
};

export default PageHeader;
