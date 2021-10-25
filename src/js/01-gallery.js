import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { galleryItems } from './gallery-items';

const galleryContainer = document.querySelector('.gallery');
const galleryCardsMarkup = createGalleryCardsMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', galleryCardsMarkup);

function createGalleryCardsMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<a class="gallery__link" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}"/></a>`;
    })
    .join('');
}

const settingsForModal = {
  captionsData: 'alt',
  captionDelay: 250,
};

const modal = new SimpleLightbox('.gallery__link', settingsForModal);
