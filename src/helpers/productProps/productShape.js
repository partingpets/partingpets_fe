import PropTypes from 'prop-types';

const productShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isOnSale: PropTypes.bool.isRequired,
  categoryId: PropTypes.number.isRequired,
  unitPrice: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
});

const productOptionalShape = PropTypes.oneOfType([
  PropTypes.shape({
    nope: PropTypes.string.isRequired,
  }),
  productShape,
]);

export default { productShape, productOptionalShape };
