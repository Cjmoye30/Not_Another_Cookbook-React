import * as React from 'react';
import { useRef } from 'react';
import { IKImage, IKContext, IKUpload } from 'imagekitio-react';
import { useMutation } from '@apollo/client';
import { ADD_IMAGE } from '../utils/mutations';
import Auth from '../utils/auth'

const publicKey = 'public_HCJZE+YwKYecvofGGZ+jCfHG1yw=';
const urlEndpoint = 'https://ik.imagekit.io/ofawn8dpgq';
const authenticationEndpoint = 'http://localhost:3001/auth';

const Upload = () => {
  // get the ID of the current user who is logged in from the Auth utility
  const currentUser = Auth.getProfile().data._id;
  console.log("ID of the current user: ", currentUser)

  const [addImage] = useMutation(ADD_IMAGE)
  const uploadImage = async (userId, imageURL) => {

    try {
      console.log("HELLO from the upload image function!")
      const { data } = await addImage(
        { variables: { userId: userId, imageURL: imageURL } }
      )
      console.log("SUCCESS. Image uploaded to the current user: ", data)
    } catch (err) {
      console.log("ERROR uploading the image: ", err)
    }
  }

  const onError = err => {
    console.log("Error", err);
  };

  const onSuccess = res => {
    console.log("Success", res);
    console.log("URL to store in DB: ", res.url);
    console.log(currentUser, res.url);
    uploadImage(currentUser, res.url)
  };

  const onUploadProgress = progress => {
    console.log("Progress", progress);
  };

  const onUploadStart = evt => {
    console.log("Start", evt);
  };

  const inputRefTest = useRef(null);
  const ikUploadRefTest = useRef(null);

  return (
    <>
      <h1>Uploading Files</h1>
      <IKContext
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticationEndpoint={authenticationEndpoint}
      >
        <p>Upload an image</p>
        <IKUpload
          fileName="test-upload.png"
          onError={onError}
          onSuccess={onSuccess}
          useUniqueFileName={true}

          // update to whatever folder needed
          folder={"/sample-folder"}
          onUploadStart={onUploadStart}
          onUploadProgress={onUploadProgress}
          inputRef={inputRefTest}
          ref={ikUploadRefTest}
          style={{ display: 'none' }}
        />

        {/* <p>Custom Upload Button</p> */}
        {inputRefTest && <button onClick={() => inputRefTest.current.click()}>Upload</button>}

      </IKContext>
    </>
  )
}

export default Upload;

// similar to the login and signup page, I can disable the upload button until all fields have been entered. Meaning that I can also put in some text fields and only once they're entered will I be able to upload an image meaning I can give each image a title and description.