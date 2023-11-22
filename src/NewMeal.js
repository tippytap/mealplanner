import { Box, Button, Icon, Stack, Typography, TextField, Card, CardHeader, CardContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react';

export default function NewMeal(props) {

    return (
        <Card variant="outlined" sx={{position: "relative", paddingTop: "1em"}}>
            <CardContent>
                <Button>
                <Box sx={{display: "flex", flexDirection: "column", height: "100%"}}>
                    <Typography sx={{fontSize: "2em"}}>Add a new meal</Typography>
                    <Box>
                        <AddIcon fontSize="large" />
                    </Box>
                </Box>
                </Button>
            </CardContent>
        </Card>
    );
}