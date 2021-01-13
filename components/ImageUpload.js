import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar, Badge } from "antd";

const FileUpload = ({ images, setImages, setLoading, productData }) => {
  const fileUploadAndResize = (e) => {
    let files = e.target.files;
    let allUploadedFiles = images;
    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                `${process.env.API_DEV}/images/uploadimages`,
                {
                  image: uri,
                },
                { withCredentials: true }
              )
              .then((res) => {
                console.log("IMAGE UPLOAD RES DATA", res);
                setLoading(false);
                allUploadedFiles.push(res.data);
                setImages({ ...productData, images: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log("CLOUDINARY UPLOAD ERR", err);
              });
          },
          "base64"
        );
      }
    }
  };

  const handleRemove = (id) => {
    setLoading(true);
    axios
      .post(
        `${process.env.API_DEV}/images/removeimages`,
        {
          public_id: id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setLoading(false);
        setImages({
          ...productData,
          images: images.filter((img) => img.public_id !== id),
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <>
      <div>
        {images.length > 0 &&
          images.map((img) => (
            <Badge
              count="X"
              style={{ cursor: "pointer" }}
              key={img.public_id}
              onClick={() => handleRemove(img.public_id)}
            >
              <Avatar
                src={img.url}
                size={60}
                className="ml-2"
                shape="square"
                style={{ padding: "0 10px", marginTop: "20px" }}
              />
            </Badge>
          ))}
      </div>
      <div>
        <label
          style={{
            backgroundColor: "#ff8066",
            padding: "5px 10px",
          }}
        >
          Upload images
          <input
            type="file"
            multiple
            accept="images/*"
            hidden
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
