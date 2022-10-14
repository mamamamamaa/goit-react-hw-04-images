import PropTypes from 'prop-types';
import { Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ path, tag }) => {
  return <Image src={path} alt={tag} />;
};

ImageGalleryItem.propTypes = {
  path: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
};
