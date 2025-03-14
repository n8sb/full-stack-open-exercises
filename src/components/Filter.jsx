export const Filter = ({ setFilter, filter }) => {
  return (
    <>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value.toLowerCase())}
        type='text'
        placeholder='filter by name...'
      />
    </>
  );
};
