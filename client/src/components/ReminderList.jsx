// client/src/components/ReminderList.jsx
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { reorderReminders, removeReminder } from '../store/remindersSlice';
import {
  List,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  ListItem,
  ListItemText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';

function ReminderList({ reminders }) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    dispatch(
      reorderReminders({
        sourceIndex: result.source.index,
        destinationIndex: result.destination.index,
      })
    );
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(removeReminder(selectedId));
    setOpen(false);
    setSelectedId(null);
  };

  const handleCancelDelete = () => {
    setOpen(false);
    setSelectedId(null);
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="reminders">
          {(provided) => (
            <List
              {...provided.droppableProps}
              ref={provided.innerRef}
              sx={{ backgroundColor: '#f5f5f5', padding: 2, borderRadius: 1 }}
            >
              {reminders.map((reminder, index) => (
                <Draggable
                  key={reminder.id}
                  draggableId={reminder.id.toString()} // 确保 draggableId 是字符串
                  index={index}
                >
                  {(provided) => (
                    <ListItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      sx={{
                        marginBottom: 1,
                        backgroundColor: 'white',
                        borderRadius: 1,
                      }}
                    >
                      <ListItemText
                        primary={reminder.title}
                        secondary={`日期: ${reminder.date}`}
                      />
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteClick(reminder.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>

      <Dialog open={open} onClose={handleCancelDelete}>
        <DialogTitle>确认删除</DialogTitle>
        <DialogContent>
          <Typography>你确定要删除这个提醒吗？</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>取消</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            删除
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// 添加 propTypes 定义
ReminderList.propTypes = {
  reminders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // 根据你的 id 类型调整
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired, // 如果 date 是其他类型，请相应调整
    })
  ).isRequired,
};

export default ReminderList;
