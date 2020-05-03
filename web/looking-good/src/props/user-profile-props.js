import PropTypes from 'prop-types'

export default PropTypes.shape({
  id: PropTypes.number.isRequired,
  user_id: PropTypes.number,
  user_name: PropTypes.string,
  specialty: PropTypes.string,
  business_name: PropTypes.string,
  video_url: PropTypes.string,
  tip_url: PropTypes.string,
})
