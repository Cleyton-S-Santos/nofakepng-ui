import React, { useState, ChangeEvent, useEffect } from 'react';
import { api } from './api/api';
import LoadingIcons from 'react-loading-icons'
import { Container, Header, Logo, Button, ButtonGroup, ExampleImage, ExampleImages, UploadBox, UploadButton, UploadSection, PresentationText, LoadingHolder, UserActionButtonHolder, ExampleImagesHolder } from './styles/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaDownload } from "react-icons/fa6";
import { FaUpload } from "react-icons/fa";
import { IMAGES } from './images/images.export';
import i18n from './i18n/i18n';
import { useTranslation } from 'react-i18next';
import { GrLanguage } from 'react-icons/gr';
import { SimpleDialog } from './components/SimpleDialog';
import { trackEvent, trackPageView, RybbitEvents } from './monitoring/rybbit';

export const App: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('');
  const [imageLoading, setImageLoading] = useState(true);

  const {t} = useTranslation();

  const handleClickOpen = () => {
    setOpen(true);
    trackEvent(RybbitEvents.DIALOG_OPEN, {
      dialogType: 'language_selector'
    });
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
    trackEvent(RybbitEvents.DIALOG_CLOSE, {
      dialogType: 'language_selector',
      selectedLanguage: value
    });
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    const file = event.target.files?.[0];

    if (file && file.type.startsWith('image/')) {
      trackEvent(RybbitEvents.IMAGE_UPLOAD_STARTED, {
        fileSize: file.size,
        fileType: file.type,
        fileName: file.name
      });
      await uploadImage(file);
    } else {
      trackEvent(RybbitEvents.ERROR_OCCURRED, {
        errorType: 'invalid_file_type',
        attemptedFileType: file?.type || 'unknown'
      });
      toast(t('error_not_image'), {type: "error"});
    }
  };
  const uploadImage = async (file: File) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    const startTime = performance.now();

    try {
      const response = await api.post('/remove-background', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'arraybuffer',
      });

      const blob = new Blob([response.data], { type: 'image/jpeg' });
      const url = URL.createObjectURL(blob); 
      setDownloadUrl(url);
      
      const processingTime = performance.now() - startTime;
      trackEvent(RybbitEvents.IMAGE_UPLOAD_SUCCESS, {
        fileSize: file.size,
        fileType: file.type,
        processingTime: Math.round(processingTime),
        responseSize: response.data.byteLength
      });
      
      toast(t('image_success_flow'), {type: "success"});
    } catch (error) {
      const processingTime = performance.now() - startTime;
      trackEvent(RybbitEvents.IMAGE_UPLOAD_ERROR, {
        fileSize: file.size,
        fileType: file.type,
        processingTime: Math.round(processingTime),
        errorMessage: error instanceof Error ? error.message : 'Unknown error'
      });
      toast(t('mysterious_error'), {type: "error"})
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = "nofakepng.com-"+new Date().getMilliseconds()+".png";
      link.click();
      
      trackEvent(RybbitEvents.IMAGE_DOWNLOAD, {
        downloadType: 'processed_image',
        timestamp: new Date().toISOString()
      });
    }
  };

  const handleDowloadExampleImg = (downloadUrl: string) => {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = "nofakepng.com-"+new Date().getMilliseconds()+".png";
    link.click();
    
    trackEvent(RybbitEvents.IMAGE_DOWNLOAD, {
      downloadType: 'example_image',
      imageUrl: downloadUrl,
      timestamp: new Date().toISOString()
    });
  }

  useEffect(() => {
    i18n.changeLanguage(navigator.language.split('-')[0]);
    // Registra a visualização da página principal
    trackPageView();
  }, [])

  return (
    <Container>
      <Header>
        <Logo>nofakepng!</Logo>
        <ButtonGroup>
          <Button onClick={handleClickOpen}><GrLanguage /></Button>
          <Button>Log in </Button>
          <Button>Sign up</Button>
        </ButtonGroup>
      </Header>
      <SimpleDialog
       selectedValue={selectedValue}
       open={open}
       onClose={handleClose}
      />
      <UploadSection>
        <PresentationText>
          <h1>{t('upload_image')}</h1>
          <p>{t('upload_image2')}</p>
        </PresentationText>
        <UploadBox>
            <p style={{
              fontWeight: "bold",
              fontSize: "32px"
            }}>{t('upload_image_title')}</p>
          <UserActionButtonHolder>
          {!isUploading ? (<UploadButton htmlFor="file-upload"><FaUpload /></UploadButton>) : <LoadingHolder><LoadingIcons.Oval stroke="#372800" color='black' strokeOpacity={.75} speed={1} /></LoadingHolder>}
            {downloadUrl && !isUploading && (
              <UploadButton onClick={handleDownload}><FaDownload/></UploadButton>
            )}
          </UserActionButtonHolder>
          <input
            type="file"
            id="file-upload"
            style={{ display: 'none' }} 
            accept="image/*"
            onChange={handleFileChange}
          />
          <ExampleImagesHolder>
            <p>{t('download_example')}</p>
            <ExampleImages>
              <ExampleImage onLoad={handleImageLoad} src={IMAGES.example1} onClick={() => handleDowloadExampleImg(IMAGES.example1)} style={{ opacity: imageLoading ? 0.5 : 1, transition: 'opacity 0.3s ease' }} alt="Example 1"/>
              <ExampleImage onLoad={handleImageLoad} src={IMAGES.example2} onClick={() => handleDowloadExampleImg(IMAGES.example2)} style={{ opacity: imageLoading ? 0.5 : 1, transition: 'opacity 0.3s ease' }} alt="Example 2" />
              <ExampleImage onLoad={handleImageLoad} src={IMAGES.example3} onClick={() => handleDowloadExampleImg(IMAGES.example3)} style={{ opacity: imageLoading ? 0.5 : 1, transition: 'opacity 0.3s ease' }} alt="Example 3" />
            </ExampleImages>
          </ExampleImagesHolder>
        </UploadBox>
      </UploadSection>
      <ToastContainer position='bottom-right' />
    </Container>
  );
};
