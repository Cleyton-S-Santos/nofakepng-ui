import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import { useTranslation } from 'react-i18next';
import { DialogTitle } from '@mui/material';
import i18n from '../i18n/i18n';

const langs = ['Potuguês', 'Ingles', "Espanhol"];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

export const  SimpleDialog = (props: SimpleDialogProps) => {
  const { onClose, selectedValue, open } = props;
  const {t} =  useTranslation();

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleChangeLang = (value: string) => {
        switch (value) {
        case langs[0]:
            i18n.changeLanguage("pt")
            break;
        case langs[1]:
            i18n.changeLanguage("en")
            break;
        case langs[2]:
            i18n.changeLanguage("es")
            break;
        };
        onClose(value);
    }

  return (
    <Dialog onClose={handleClose} open={open}>
      <List sx={{ pt: 0 }} style={{backgroundColor: '#f6b60d'}}>
      <DialogTitle>{t('select_language_msg')}</DialogTitle>
        {langs.map((lang) => (
          <ListItem disableGutters key={lang}>
            <ListItemButton onClick={() => handleChangeLang(lang)}>
              <ListItemText primary={lang}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}