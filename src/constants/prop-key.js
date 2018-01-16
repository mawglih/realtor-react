export const BY_PROP_KEY = (propertyName, value) => () => ({
    [propertyName]: value,
});