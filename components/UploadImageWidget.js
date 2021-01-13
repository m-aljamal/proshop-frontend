const UploadImageWidget = ({ images, setImages }) => {
  const openWidget = () => {
    window.cloudinary
      .createUploadWidget(
        {
          cloudName: "dqoung1wz",
          uploadPreset: "pp222ruc",
        },
        (error, result) => {
          const uploadedImages =
            result.info.files &&
            result.info.files.map((file) => {
              return {
                url: file.uploadInfo.url,
                public_id: file.uploadInfo.public_id,
              };
            });

          setImages({
            ...images,
            ...uploadedImages,
          });
        }
      )
      .open();
  };

  return (
    <button type="button" className="btn widget-btn" onClick={openWidget}>
      Upload Via Widget
    </button>
  );
};

export default UploadImageWidget;
