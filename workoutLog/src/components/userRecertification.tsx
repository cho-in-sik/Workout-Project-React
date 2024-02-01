import {
  User,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';
import { auth } from '../firebase';

export async function userRecertification(email: string, password: string) {
  const user = auth.currentUser as User;
  const authCredential = EmailAuthProvider.credential(email, password);

  let bool;
  await reauthenticateWithCredential(user, authCredential)
    .then(() => {
      bool = true;
    })
    .catch((error) => {
      console.log(error);
      bool = false;
    });
  return bool;
}
