const Storybook: React.FC = () => {
  return (
    <>
      <iframe
        src="/storybook/index.html"
        style={{
          width: '100%',
          height: '100vh',
          border: 'none',
        }}
        title="Storybook"
      />
    </>
  );
};

export default Storybook;
