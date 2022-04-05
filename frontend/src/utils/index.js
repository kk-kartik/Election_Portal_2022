export const DateConvert = (creation) => {
  return (
    <>
      {new Date(creation).getDate()}/{new Date(creation).getMonth() + 1}/
      {new Date(creation).getFullYear()}
    </>
  );
};
