import PropTypes from 'prop-types';

const partnerShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  zipcode: PropTypes.number.isRequired,
});

const partnerOptionalShape = PropTypes.oneOfType([
  PropTypes.shape({
    nope: PropTypes.string.isRequired,
  }),
  partnerShape,
]);

export default { partnerShape, partnerOptionalShape };
