import PropTypes from 'prop-types';
import '../../css/components/ErrorMessage.css';

/**
 * Composant pour afficher les messages d'erreur de validation
 */
export default function ErrorMessage({ message, type = 'error' }) {
  if (!message) return null;

  return (
    <div className={`error-message ${type}`} role="alert" aria-live="polite">
      <span className="error-icon">⚠️</span>
      <span className="error-text">{message}</span>
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['error', 'warning', 'info'])
};