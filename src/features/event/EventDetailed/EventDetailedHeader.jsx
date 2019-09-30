import React from 'react';
import { Gallery, GalleryImage } from 'react-gesture-gallery';

const EventDetailedHeader = ({ event }) => {
  const { eventImages } = event;

  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    const timer = setInterval(() => {
      if (eventImages && index === eventImages.length) {
        setIndex(0);
      } else {
        setIndex(prev => prev + 1);
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [index, eventImages]);

  return eventImages ? (
    <Gallery
      style={{
        background: 'rgb(234, 234, 234)',
        height: '100%',
        width: '100%'
      }}
      index={index}
      onRequestChange={i => {
        setIndex(i);
      }}
    >
      {eventImages.map(image => (
        <GalleryImage objectFit='contain' key={image} src={image} />
      ))}
    </Gallery>
  ) : (
    <h2>No images to show</h2>
  );
};

export default EventDetailedHeader;
