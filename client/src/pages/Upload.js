import * as React from 'react';
import { useRef } from 'react';
import { IKImage, IKContext, IKUpload } from 'imagekitio-react';

const publicKey = 'public_HCJZE+YwKYecvofGGZ+jCfHG1yw=';
const urlEndpoint = 'https://ik.imagekit.io/ofawn8dpgq';
const authenticationEndpoint = 'http://localhost:3001/auth';
const folderDest = '/react-starting-template/'

const onError = err => {
    console.log("Error", err);
  };
  
  const onSuccess = res => {
    console.log("Success", res);
  };
  
  const onUploadProgress = progress => {
    console.log("Progress", progress);
  };
  
  const onUploadStart = evt => {
    console.log("Start", evt);
  };

const Upload = () => {

    const inputRefTest = useRef(null);
    const ikUploadRefTest = useRef(null);

    return (
        <>
            <h1>ImageKitIo Upload Page</h1>

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
                    folder={"/sample-folder"}
                    onUploadStart={onUploadStart}
                    onUploadProgress={onUploadProgress}
                    inputRef={inputRefTest}
                    ref={ikUploadRefTest}
                    style={{display: 'none'}}
                />

                {/* <p>Custom Upload Button</p> */}
                {inputRefTest && <button onClick={() => inputRefTest.current.click()}>Upload</button>}
            </IKContext>

        </>
    )
}

export default Upload;