export const toResourceInput = (categoryMap, {
  slug = null,
  url = null,
  title = null,
  author = null,
  description = null,
  category = null,
  tags = [],
} = {}) => ({
  slug,
  url,
  title,
  author,
  description,
  category: { connect: categoryMap.get(category)._id },
  tags,
});