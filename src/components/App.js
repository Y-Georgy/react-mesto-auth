import '../index.css'
import Loading from './Loading'
import { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { Header } from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { api } from '../utils/Api'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ConfirmPopup from './ConfirmPopup'
import { initialCards, initialProfile } from '../utils/constants'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)

  // Получение карточек и данных пользователя
  useEffect(() => {
    Promise.all([api.getProfile(), api.getCards()])
      .then(([profileInfo, cards]) => {
        setCurrentUser(profileInfo)
        setCards(cards)
      })
      .catch((err) => {
        setCurrentUser(initialProfile)
        setCards(initialCards)
        alert(`Данные профиля и карточек не обновились. Ошибка - ${err}`)
      })
      .finally(() => setIsLoading(false))
  }, [])

  // для попапа большого изображения
  const [selectedCard, setSelectedCard] = useState({})

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  // обработчики кнопок на странице
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false)
  const [cardToDelete, setCardToDelete] = useState({})

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardDelete(card) {
    setIsConfirmPopupOpen(true)
    setCardToDelete(card)
  }

  // закрытие всех попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsConfirmPopupOpen(false)
    setSelectedCard({})
  }

  // обработчик клика закрытия попапов
  function handlePopupClose(e) {
    if (e.target === e.currentTarget) {
      closeAllPopups()
    }
  }

  // обработчик обновления профиля
  function handleUpdateUser(profile) {
    api
      .addProfile(profile)
      .then((newProfile) => {
        setCurrentUser(newProfile)
        closeAllPopups()
      })
      .catch((rej) => console.log(rej))
  }

  // обработчик обновления аватарки
  function handleUpdateAvatar(avatar) {
    api
      .updateAvatar(avatar)
      .then((newProfile) => {
        setCurrentUser(newProfile)
        closeAllPopups()
      })
      .catch((rej) => console.log(rej))
  }

  // обработчик клика Escape
  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups()
      }
    }
    document.addEventListener('keyup', closeByEscape)
    return () => document.removeEventListener('keyup', closeByEscape) // TODO слушатель не снимается
  }, [selectedCard, isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, isConfirmPopupOpen])

  // лайки
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id)

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) => cards.map((c) => (c._id === card._id ? newCard : c)))
      })
      .catch((rej) => console.log(rej))
  }

  // удаление карточки
  function handleConfirm() {
    api
      .deleteCard(cardToDelete._id)
      .then((res) => {
        setCards((cards) => cards.filter((c) => c._id !== cardToDelete._id))
        closeAllPopups()
      })
      .catch((rej) => console.log(rej))
  }

  // ДОБАВЛЕНИЕ КАРТОЧКИ
  function handleAddPlaceSubmit(card) {
    api
      .addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((rej) => console.log(rej))
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Route path="/sign-up"></Route>
        <Route path="/sign-in"></Route>
        <Route exact path="/">
          {() => {
            if (isLoading) {
              return <Loading />
            }
            return (
              <>
                <Main
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
                <Footer footerText="© 2021 Mesto Russia" />

                <EditProfilePopup
                  isOpen={isEditProfilePopupOpen}
                  onClose={handlePopupClose}
                  onUpdateUser={handleUpdateUser}
                />
                {isAddPlacePopupOpen && (
                  <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={handlePopupClose}
                    onAddPlace={handleAddPlaceSubmit}
                  />
                )}
                <EditAvatarPopup
                  isOpen={isEditAvatarPopupOpen}
                  onClose={handlePopupClose}
                  onUpdateAvatar={handleUpdateAvatar}
                />
                <ImagePopup card={selectedCard} onClose={handlePopupClose} />
                <ConfirmPopup isOpen={isConfirmPopupOpen} onClose={handlePopupClose} onConfirm={handleConfirm} />
              </>
            )
          }}
        </Route>
      </CurrentUserContext.Provider>
    </div>
  )
}
export default App
