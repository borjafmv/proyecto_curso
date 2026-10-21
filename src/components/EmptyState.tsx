import AddIcon from '@mui/icons-material/Add';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { Box, Button, Stack, Typography } from '@mui/material';

interface EmptyStateProps {
  onCreateTask: () => void;
}

// EmptyState invita a crear la primera tarea cuando la lista está vacía.
function EmptyState({ onCreateTask }: EmptyStateProps) {
  return (
    <Stack alignItems="center" spacing={3} textAlign="center">
      <AssignmentOutlinedIcon color="primary" sx={{ fontSize: 72 }} />
      <Box>
        <Typography component="h2" variant="h5" gutterBottom>
          Aún no tienes tareas
        </Typography>
        <Typography color="text.secondary">
          Crea tu primera tarea y priorízala con el modelo ICE.
        </Typography>
      </Box>
      <Button onClick={onCreateTask} startIcon={<AddIcon />} variant="outlined">
        Crear tarea
      </Button>
    </Stack>
  );
}

export default EmptyState;
