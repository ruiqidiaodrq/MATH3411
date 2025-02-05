import React, { Component } from 'react';
import axios from 'axios';
import { 
    Container, Card, CardContent, Typography, TextField, Button, Box 
} from '@mui/material';

class EulerTotient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            description: this.props.description,
            input: '',
            result: '',
        };
    }

    handleSubmit = async () => {
        console.log("API URL:", import.meta.env.VITE_API_URL);
        try {
            // Send the input to FastAPI backend
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/euler_totient/`, {
                number: this.state.input
            });

            // Set the result in the state after the calculation
            this.setState({ result: response.data.result });
        
        } catch (error) {
            console.error('Error encoding message:', error);
            console.error('Error details:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
        }
    }

    // Handle input changes
    handleInputChange = (e) => {
        this.setState({ input: e.target.value });
    }


    render() {
        return (
            <Container maxWidth="sm">
                <Card sx={{ mt: 4, p: 3, boxShadow: 3 }}>
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            {this.state.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                            {this.state.description}
                        </Typography>
                        
                        <TextField
                            label="Enter an integer"
                            variant="outlined"
                            fullWidth
                            value={this.state.input}
                            onChange={this.handleInputChange}
                            sx={{ mb: 2 }}
                        />

                        <Box display="flex" justifyContent="center">
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={this.handleSubmit}
                                sx={{ px: 4 }}
                            >
                                Calculate
                            </Button>
                        </Box>

                        {this.state.result !== '' && (
                            <Typography variant="body1" sx={{ mt: 2, fontWeight: 'bold' }}>
                                The result is {this.state.result}.
                            </Typography>
                        )}
                    </CardContent>
                </Card>
            </Container>
        );
    }

}

export default EulerTotient;
