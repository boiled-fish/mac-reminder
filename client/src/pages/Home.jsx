import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useDispatch, useSelector } from 'react-redux';
import { addReminder } from '../store/remindersSlice';
import ReminderList from '../components/ReminderList';
import { v4 as uuidv4 } from 'uuid';

function Home() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(null);
  const dispatch = useDispatch();
  const reminders = useSelector((state) => state.reminders.items);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle('');
    setDate(null);
  };

  const handleAdd = () => {
    if (title && date) {
      const newReminder = {
        id: uuidv4(),
        title,
        date: date.toISOString().split('T')[0],
      };
      dispatch(addReminder(newReminder));
      handleClose();
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ marginBottom: 2 }}
      >
        添加提醒
      </Button>
      <ReminderList reminders={reminders} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>添加提醒</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              autoFocus
              label="提醒内容"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="提醒日期"
                value={date}
                onChange={(newValue) => setDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleAdd} variant="contained" color="primary">
            添加
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Home;
