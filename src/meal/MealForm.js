import React, {useState} from 'react';
import Modal from '@mui/material/Modal';
import { Box, Typography } from '@mui/material';
import { styles } from '../Styles';
import MealFormControl from './MealFormControl';

export default function MealForm(props) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styles.modal}>
                    <Typography variant={"h5"} mb={2}>Create a new meal</Typography>
                    <form>
                      <MealFormControl cancel={handleClose} />
                    </form>
                </Box>
            </Modal>
        </Box>
    )
}