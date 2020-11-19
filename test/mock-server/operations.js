export const All = (collection) => ({ 
  data: collection,
});

export const Create = (collection) => (record) => ({
  _id: `x${collection.length + 1}`,
  ...record
});

export const Delete = (collection) => (id) => (
  collection.find(({ _id }) => _id === id)
);

export const Update = (collection) => (id, record) => {
  const current = collection.find(({ _id }) => _id === id);
  
  return { ...current, ...record };
};
