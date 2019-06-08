import PropTypes from 'prop-types';

const productShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  notes: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
});

const productOptionalShape = PropTypes.oneOfType([
  PropTypes.shape({
    nope: PropTypes.string.isRequired,
  }),
  productShape,
]);

export default { productShape, productOptionalShape };