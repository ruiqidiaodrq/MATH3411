import React, { Component } from 'react';
import axios from 'axios';
import { 
    Container, Card, CardContent, Typography, TextField, Button, Box 
} from '@mui/material';

class ShannonEntropy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            description: this.props.description,
            // input: '',
            prob: '',
            radix: '',
            result: '',
            
        };
    }

    // Method to handle form submission
    handleSubmit = async () => {
        try {
            // Send the input to FastAPI backend
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/shannon_entropy/`, {
                prob: this.state.prob,
                radix: this.state.radix
            });

            // Set the result in the state after the calculation
            this.setState({ result: response.data.result });
        
        } catch (error) {
            console.error('Error encoding message:', error);
        }
    }

    // Handle input changes
    handleProbChange = (e) => {
        this.setState({ prob: e.target.value });
    }

    handleRadixChange = (e) => {
        this.setState({ radix: e.target.value });
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
                            label="Enter Probability e.g. 0.1, 0.2, 0.4, 0.2, 0.1"
                            variant="outlined"
                            fullWidth
                            value={this.state.prob}
                            onChange={this.handleProbChange}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            label="Enter integer radix"
                            variant="outlined"
                            fullWidth
                            value={this.state.radix}
                            onChange={this.handleRadixChange}
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
                                The Shannon Entropy of this Shannon code is {this.state.result}
                            </Typography>
                        )}
                    </CardContent>
                </Card>
            </Container>
        );
    }

}

export default ShannonEntropy;
