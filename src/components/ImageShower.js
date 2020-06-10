import React from 'react';

const ImageShower = ({ image, removeProfileImage = (f) => f }) => {
	return <img
		src={image.url}
		alt={image.public_id}
		style={{ height: '100px', width: '100px' }}
		className="float-right"
		onClick={(e) => removeProfileImage(image.public_id)}
	/>;
	/* <img src={trashOutlined} alt="Supprimer l'image" style={{  height: '1rem', width: '2rem', color: "#ff0000"}} /> */
};

export default ImageShower;
