import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { useState } from 'react';
import { auth } from '../firebase';
import { deleteUser } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { useNavigate } from 'react-router-dom';

export default function DeleteModal() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [open, setOpen] = useState<boolean>(false);

  const handleDelete = async () => {
    if (user === null) return;
    try {
      await deleteUser(user);
      navigate('/');
    } catch (e) {
      if (e instanceof FirebaseError) {
        alert(e.message);
      }
    }
  };
  return (
    <>
      <Button variant="outlined" color="danger" onClick={() => setOpen(true)}>
        회원탈퇴
      </Button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h3"
            textColor="tomato"
            fontWeight="lg"
            mb={1}
          >
            회원탈퇴
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
            탈퇴후 복구는 불가능 합니다. 신중하게 결정해 주세요.
          </Typography>
          <Button size="md" color="danger" onClick={handleDelete}>
            탈퇴
          </Button>
        </Sheet>
      </Modal>
    </>
  );
}
