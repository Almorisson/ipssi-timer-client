import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import axiosInstance from '../axios';
import Resizer from 'react-image-file-resizer';
import ImageShower from './ImageShower';

const ImageUpload = ({ profile, setProfile, setLoading, loading }) => {
	const { state } = useContext(AuthContext);

	const resizeImageAndUpload = (e) => {
		setLoading(true);
		var fileInput = false;
		if (e.target.files[0]) {
			fileInput = true;
		}
		if (fileInput) {
			Resizer.imageFileResizer(
				e.target.files[0],
				300,
				300,
				'JPEG',
				100,
				0,
				(uri) => {
					// console.log(uri);
					axiosInstance
						.post(
							'/profile/upload-image',
							{
								profileImage: uri
							},
							{
								headers: {
									authtoken: state.user.token
								}
							}
						)
						.then((response) => {
							setLoading(false);
							console.log('CLOUDINARY UPLOAD SUCCESS: ', response);
							// save image on the state
							const { images } = profile;
							setProfile({ ...profile, images: [ ...images, response.data ] });
						})
						.catch((error) => {
							setLoading(false);
							console.log('CLOUDINARY UPLOAD FAILED: ', error);
						});
				},
				'base64'
			);
		}
	};

	const removeProfileImageHandler = (id) => {
		setLoading(true);
		axiosInstance
			.post(
				'/profile/delete-image',
				{
					public_id: id
				},
				{
					headers: {
						authtoken: state.user.token
					}
				}
			)
			.then((response) => {
				setLoading(false);
				console.log('CLOUDINARY DELETE SUCCESS: ', response);

				// new images array after remove the desired one
				const { images } = profile;
				let newImages = images.filter((image) => {
					return image.public_id !== id;
				});

				// delete image on the state
				setProfile({ ...profile, images: newImages });
			})
			.catch((error) => {
				setLoading(false);
				console.log('CLOUDINARY DELETE FAILED: ', error);
			});
	};

	return (
		<div className="row">
			<div className="col-md-3">
				<div className="form-group">
					<label className="btn btn-outline-primary">
						Charger une image
						<input
							hidden
							type="file"
							accept="image/*"
							className="form-control"
							name="profileImage"
							onChange={resizeImageAndUpload}
						/>
					</label>
				</div>
			</div>
			<div className="col-md-9">
				{profile.images.map((image) => (
					<ImageShower key={image.public_id} image={image} removeProfileImage={removeProfileImageHandler} />
				))}
			</div>
		</div>
	);
};

export default ImageUpload;
