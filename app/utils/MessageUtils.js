import PropTypes from 'prop-types';

export const MessageShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['text']),
  text: PropTypes.string,
});

let messageId = 0;
function getNextId() {
  messageId += 1;
  return messageId;
}

export function createTextMessage(text) {
  return {
    type: 'text',
    id: getNextId(),
    text,
  };
}
