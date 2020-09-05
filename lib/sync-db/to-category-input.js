export const toCategoryInput = ({
  slug = null,
  title = null,
  group = null,
  resources = [],
} = {}) => ({
  slug,
  title,
  group,
  resources: map(({ _id }) => _id)(resources),
});
