import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export function BasicAlerts() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="success">This is a success Alert.</Alert>
      <Alert severity="info">This is an info Alert.</Alert>
      <Alert severity="warning">This is a warning Alert.</Alert>
    </Stack>
  );
}

export function ErrorAlert({ errors }: any) {
  console.log(errors);
  return errors === undefined ? null : (
    <Alert style={{}} severity="error">
      {errors}
    </Alert>
  );
}
