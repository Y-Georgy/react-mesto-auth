function InfoTooltip({ message, isError, onClose }) {
  function handleCloseInfoToolTip() {
    onClose()
  }

  return (
    <div className={`popup popup_type_info${message !== '' ? ' popup_opened' : ''}`} onClick={handleCloseInfoToolTip}>
      <div className={`popup__container${isError ? ' popup__container_image_error' : ' popup__container_image_complete'}`}>
        <button type="button" className="popup__icon-close" aria-label="Закрыть" onClick={handleCloseInfoToolTip}></button>
        <h3 className="popup__heading popup__heading_type_message">{message}</h3>
      </div>
    </div>
  )
}

export default InfoTooltip
