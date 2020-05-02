import PropTypes from 'prop-types'

export default PropTypes.shape({
  userName: PropTypes.string.isRequired,
  businessName: PropTypes.string,
  videoUrl: PropTypes.string,
  tipUrl: PropTypes.string,
  photoUrl: PropTypes.string,
  industry: PropTypes.string,
  nickname: PropTypes.string,
  userId: PropTypes.number.isRequired,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
})
