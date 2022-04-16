import React, { useRef, useState, DragEvent } from 'react';
import styled, { css } from 'styled-components';

import LogoInteractInfo from './LogoInteractInfo';
import SelectedImageComponent from './CropAndSave';
import SavedImage from './SavedImage';
import UploadFailed from './UploadFailed';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {Backdrop, CircularProgress} from '@mui/material';
import {addData} from 'components/dashboard/Dashboard';
interface WrapperProps {
  isErrored: boolean;
  isSaved: boolean;
  image: File | null;
}

const Wrapper = styled.div<WrapperProps>`
  margin: 50px auto;
  padding: 32px;
  background: #f2f5f8;
  width: 553px;
  height: 177px;
  ${({ isSaved, image, isErrored }) => `
    ${
      !image || isSaved
        ? css`
            border: 2px dashed #c7cdd3;
          `
        : ''
    }
    ${
      (!image && !isErrored) || isSaved
        ? css`
            cursor: pointer;
          `
        : ''
    }
  `}
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  input {
    display: none;
  }

  .content-wrapper {
    width: 100%;
    display: flex;
  }
`;

const Home = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isErrored, setError] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [zoomLevel, setZoomlevel] = useState(1);
  const storage = getStorage();
  const inputRef = useRef<HTMLInputElement>(null);
  const [backdrop, setBackdrop] = useState(false);
  const onClickContainer = () => {
    inputRef.current?.click();
  };

  const isFileValid = (file?: File) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (!file) return false;

    return validTypes.includes(file.type);
  };

  const updateStatesOnChange = (file?: File) => {
    if (file && isFileValid(file)) {
      setImageFile(file);
      setIsSaved(false);
      setZoomlevel(1);
    }

    setError(!isFileValid(file));
  };

  const fileDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    updateStatesOnChange(file);
  };

  const onChangeInput = (event: React.FormEvent<HTMLInputElement>) => {
    const selectedFile = (event.target as HTMLInputElement).files![0];
console.log(selectedFile);
const storageRef = ref(storage, selectedFile.name);
const uploadTask = uploadBytesResumable(storageRef, selectedFile);
setBackdrop(true);
uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setBackdrop(false);
      addData(downloadURL);
    });
  }
);
    updateStatesOnChange(selectedFile);
  };
  
  const handleSliderChange = (
    event: React.ChangeEvent<unknown>,
    value: number | number[]
  ) => {
    setZoomlevel(value as number);
  };

  const reset = () => {
    setImageFile(null);
    setZoomlevel(1);
    setError(false);
    setIsSaved(false);
  };

  const dragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const dragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const dragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const renderChild = () => {
    if (isErrored) return <UploadFailed reset={reset} />;

    if (!isErrored && !imageFile)
      return (
        <LogoInteractInfo inputRef={inputRef} onChangeInput={onChangeInput} />
      );
    if (!isErrored && imageFile && !isSaved)
      return (
        <SelectedImageComponent
          handleSliderChange={handleSliderChange}
          imageFile={imageFile}
          isErrored={isErrored}
          reset={reset}
          zoomLevel={zoomLevel}
          setIsSaved={setIsSaved}
        />
      );
    return (
      <SavedImage
        imageFile={imageFile}
        zoomLevel={zoomLevel}
        inputRef={inputRef}
        onChangeInput={onChangeInput}
      />
    );
  };

  return (
    <Wrapper
      image={imageFile}
      isErrored={isErrored}
      isSaved={isSaved}
      onClick={onClickContainer}
      onDrop={fileDrop}
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
    >
      {renderChild()}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1000 }}
        open={backdrop}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </Wrapper>
    
  );
};

export default Home;
