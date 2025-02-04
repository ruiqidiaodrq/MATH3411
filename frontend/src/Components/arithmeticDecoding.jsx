import React, { Component } from 'react';
import axios from 'axios';
import { 
    Container, Card, CardContent, Typography, TextField, Button, Box 
} from '@mui/material';

class ArithmeticDecoding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            description: this.props.description,
            src: '', 
            prob: '',
            scale: '',
            result: '',
        };
    }

    // Method to handle form submission
    handleSubmit = async () => {
        try {
            // Send the input to FastAPI backend
            const response = await axios.post('http://localhost:8000/arithmetic_decoding/', {
                src: this.state.src, 
                prob: this.state.prob,
                scale: this.state.scale,
            });

            // Set the result in the state after the calculation
            this.setState({
                result: response.data.result,
            });
        
        } catch (error) {
            console.error('Error encoding message:', error);
        }
    }

    // Handle input changes
    handleSrcChange = (e) => {
        this.setState({ src: e.target.value });
    }

    handleProbChange = (e) => {
        this.setState({ prob: e.target.value });
    }

    handleScaleChange = (e) => {
        this.setState({ scale: e.target.value });
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
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            For example, for a code system a, b, c, d, e with and corresponding code probability 0.1, 0.2, 0.3, 0.2, 0.2 and position 1, 2, 3, 4, 5.
                            If we want to decode the message 0.114, enter a, b, c, d, e in source symbol (in order), 0.1, 0.2, 0.3, 0.2, 0.2 in code probability and 0.114 in encode message.
                            The decoded message is 'bad'.
                        </Typography>
                        
                        <TextField
                            label="Enter source symbol e.g. a, b, c, d, e"
                            variant="outlined"
                            fullWidth
                            value={this.state.src}
                            onChange={this.handleSrcChange}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            label="Enter code probability e.g. 0.1, 0.2, 0.3, 0.2, 0.2"
                            variant="outlined"
                            fullWidth
                            value={this.state.prob}
                            onChange={this.handleProbChange}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            label="Enter encoded message e.g. 0.114"
                            variant="outlined"
                            fullWidth
                            value={this.state.scale}
                            onChange={this.handleScaleChange}
                            sx={{ mb: 2 }}
                        />

                        <Box display="flex" justifyContent="center">
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={this.handleSubmit}
                                sx={{ px: 4 }}
                            >
                                Decode
                            </Button>
                        </Box>

                        {this.state.result !== '' && (
                            <Typography variant="body1" sx={{ mt: 2, fontWeight: 'bold' }}>
                                The decoded message is '{this.state.result}''.
                            </Typography>
                        )}

                    </CardContent>
                </Card>
            </Container>
        );
    }

}

export default ArithmeticDecoding;
